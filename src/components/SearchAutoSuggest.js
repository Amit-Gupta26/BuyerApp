import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    SectionList,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
    Keyboard
} from "react-native";
import { searchNearByData } from '../data/SearchSuggestData';
import { observer, inject } from "mobx-react";

class SearchAutoSuggest extends Component {
    constructor(props) {
        var firstItem = false;
        super(props);
        this.keyboardHeight = 0;
        this.state = {
            searchText: null,
            suggestionsArr: [],
            addKeyboardHeight: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    keyboardWillShow = (event) => {
        console.log(event.endCoordinates.height);
        this.keyboardHeight = event.endCoordinates.height;
        this.setState({ addKeyboardHeight: true })
    };

    keyboardWillHide = (event) => {
        this.setState({ addKeyboardHeight: false })
    };

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        this.props.searchStore.showList = false;
    }

    componentWillUnmount() {
        const { searchStore } = this.props;
        searchStore.suggestions = [];
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    renderKeyBoardView() {
        if (this.state.addKeyboardHeight) {
            return (
                <View style={{ height: this.keyboardHeight }}>
                </View>
            );
        }
    }

    _fecthSuggestions(exnteredText) {
        const { searchStore } = this.props;
        firstItem = false;
        searchStore.sectionFirstItem = null;
        if (exnteredText.length > 2) {
            this._suggestionsWebCall(exnteredText)
            searchStore.isClearData = false;
            searchStore.showList = true;
        } else {
            searchStore.showList = false;
            searchStore.suggestions = null
            searchStore.isSuggestionsEmpty = false;
            searchStore.isClearData = true
            this.setState({
                suggestionsArr: null
            });
        }
    }

    suggestionClicked(suggestionItem) {
        const { navigation } = this.props;
        const { searchStore } = this.props;
        if (suggestionItem.type === "MLS_ID") {
            const { params } = this.props.navigation.state.params;
            searchStore.fetchSearchURLForMls({ navigation, params }, suggestionItem, "MLS_ID", this._onMlsUrlUpdate, suggestionItem)
        } else if (suggestionItem.type == "ADDRESS") {
            const { params } = this.props.navigation.state.params;
            searchStore.fetchSearchURLForAddress({ navigation, params }, suggestionItem, this._onAddresSearchUpdate)
        } else {
            this.props.navigation.pop();
            this.props.navigation.state.params.onGoBack(suggestionItem, null, false);
        }
    }

    _onAddresSearchUpdate(pdpUrl, navigation, callPdp) {
        navigation.replace("PropertyDetails", {
            pdpUrl: pdpUrl
        });
    }

    _onMlsUrlUpdate(pdpUrl, navigation, callPdp, params, suggestionItem) {
        var type = navigation.getParam('type')
        if (callPdp) {
            if (type === 'onboarding') {
                navigation.pop();
                navigation.navigate("PropertyDetails", {
                    pdpUrl: pdpUrl
                });
            } else {
                navigation.replace("PropertyDetails", {
                    pdpUrl: pdpUrl
                });
            }
        } else {
            if (type === 'onboarding' || type === 'search') {
                navigation.pop();
            }
            navigation.state.params.onGoBack(suggestionItem, null, true);
        }
    }

    _suggestionsWebCall = (suggestionText) => {
        this.setState({
            searchText: suggestionText
        })
        this.props.searchStore.fetchSuggestions(
            suggestionText
        );
    }

    _onListItemPress(item) {
        this.props.navigation.pop();
        this.props.navigation.state.params.onGoBack(null, item.type, false, item.name);
    }

    renderItem(data) {
        let { item, index } = data;

        return (
            <TouchableOpacity onPress={this._onListItemPress.bind(this, item)}
                testID={"searchDefaultListItem"}
                nativeID={"searchDefaultListItem"}
                accessibilityLabel={"searchDefaultListItem"}>
                <View style={styles.listItemRootContainer}>
                    <View style={styles.listItemContainer}>
                        <View>
                            {
                                item.sub_name != null ?
                                    <View style={styles.listItemNameContainer}>
                                        <Text style={styles.itemName}
                                            testID={"searchDefaultListTitleText"}
                                            nativeID={"searchDefaultListTitleText"}
                                            accessibilityLabel={"searchDefaultListTitleText"}>{item.name}</Text>
                                        <Text style={styles.itemSubName}
                                            testID={"searchDefaultListSubTitleText"}
                                            nativeID={"searchDefaultListSubTitleText"}
                                            accessibilityLabel={"searchDefaultListSubTitleText"}>{item.sub_name}</Text>
                                    </View> :
                                    <View style={styles.listItemNearByContainer}>
                                        <Text style={styles.itemName}
                                              testID={"searchDefaultListNearByText"}
                                              nativeID={"searchDefaultListNearByText"}
                                              accessibilityLabel={"searchDefaultListNearByText"}>{item.name}</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.listItemRightImageContainer}>
                            {this.renderListItemLeftImage(item.type)}
                        </View>
                        {
                            item.type == "saved_search" ?
                                <View style={styles.listItemRightContainer}>
                                    <Image source={require('../assets/image/ic_search_selection.png')} style={styles.rightImage} />
                                </View> : null
                        }
                    </View>
                    {
                        (item.type != "saved_search" && item.type != "home_near") ?
                            <View style={styles.separator} /> : null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    _keyExtractor(item, index) {
        return index.toString();
    }

    _getInitialData() {
        const { searchStore } = this.props;
        var mostRecentSearchData;
        if (searchStore.searchUrl !== "") {
            mostRecentSearchData = [{ "type": "recent_search", "name": "Most Recent Search", "sub_name": searchStore.searchText }];
        }
        var intialData = searchNearByData;
        if (mostRecentSearchData != null) {
            intialData = intialData.concat(mostRecentSearchData)
        }
        return intialData;
    }

    _clearPress() {
        const { searchStore } = this.props;
        searchStore.isSuggestionsEmpty = false;
        this.textInput.clear()
        searchStore.isClearData = true;
        searchStore.suggestions = null
        this.setState({
            suggestionsArr: null,
        });
    }

    _backPress() {
        this.props.navigation.pop();
    }

    _onDonePress() {
        if (this.props.searchStore.sectionFirstItem != null) {
            this.suggestionClicked(this.props.searchStore.sectionFirstItem);
            this.props.searchStore.sectionFirstItem = null
        } else {
            this._backPress()
        }
    }

    render() {
        var type = this.props.navigation.getParam('type')
        return (
            <SafeAreaView style={styles.rootContainer}>
                <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
                <View style={styles.rootMainContainer}>
                    {this.renderInputComponent(type)}
                    {this.renderMainComponent()}
                    {this.renderKeyBoardView()}
                </View>
            </SafeAreaView >
        );
    }

    renderListItemLeftImage(type) {
        var imagePath;
        switch (type) {
            case "search_nearby":
                imagePath = require('../assets/image/locationIconGrey.png');
                break;
            case "recent_search":
                imagePath = require('../assets/image/ic_search_most_recent.png')
                break;
            case "saved_search":
                imagePath = require('../assets/image/ic_search_star.png')
                break;
        }
        return (
            <Image source={imagePath} style={styles.leftImage}  
                   testID={"searchDefaultListLeftImage"}
                   nativeID={"searchDefaultListLeftImage"}
                   accessibilityLabel={"searchDefaultListLeftImage"}/>
        )
    }

    renderEmptyDataComponent() {
        return (
            <View style={styles.emptyContainer}>
                <Image source={require('../assets/image/ic_empty_search.png')} style={styles.emptySearchImage} />
                <Text style={styles.emptySearchTitleStyle}>Sorry, no results.</Text>
                <Text style={styles.emptySearchSubTitleStyle}>Please check your spelling{"\n"} or try a zipcode.</Text>
            </View>
        )
    }

    renderMainComponent() {
        const { searchStore } = this.props;
        if (searchStore.isSuggestionsEmpty) {
            return this.renderEmptyDataComponent()
        } else {
            return this.renderSearchComponent()
        }
    }

    renderInputComponent(type) {
        if (type === 'search' || type === 'discover') {
            return this.renderSearchInputUi()
        } else {
            return this.renderOnboardingSearchInputUi()
        }
    }

    renderSearchInputUi() {
        return (
            <View style={styles.searchBar}>
                <TouchableOpacity onPress={() => this._backPress()}>
                    <Image
                        style={styles.searchIcon}
                        source={require("../assets/image/clearWhite.png")}
                        resizeMode="contain"
                        testID={"ClearImageView"}
                        nativeID={"ClearImageView"}
                        accessibilityLabel={"ClearImageView"}
                    />
                </TouchableOpacity>
                <TextInput style={styles.inputIntialText}
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    placeholder="Search by city, state, ZIP, school"
                    placeholderTextColor="white"
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={(event) => this._onDonePress()}
                    onChangeText={(text) =>
                        this._fecthSuggestions(text)
                    }
                    ref={input => { this.textInput = input }}
                    testID={"SearchTextInput"}
                    nativeID={"SearchTextInput"}
                    accessibilityLabel={"SearchTextInput"}
                />
                <Image source={require('../assets/image/ic_search.png')} style={styles.inputSearchIcon} />
                <Text onPress={() => this._clearPress()}
                    style={styles.clearText}
                    testID={"ClearSearchText"}
                    nativeID={"ClearSearchText"}
                    accessibilityLabel={"ClearSearchText"}>Clear</Text>
            </View>
        )
    }

    renderOnboardingSearchInputUi() {
        return (
            <View style={styles.searchBarOnboarding}>
                <TextInput style={styles.inputText}
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    placeholder="Search by city, state, ZIP, school"
                    placeholderTextColor="#8394BC"
                    autoCapitalize="none"
                    returnKeyType="done"
                    onSubmitEditing={(event) => this._onDonePress()}
                    onChangeText={(text) =>
                        this._fecthSuggestions(text)
                    }
                    ref={input => { this.textInput = input }}
                    testID={"OnboardingSearchTextInput"}
                    nativeID={"OnboardingSearchTextInput"}
                    accessibilityLabel={"OnboardingSearchTextInput"}
                />
                <TouchableOpacity onPress={() => this._clearPress()}>
                    <Image source={require('../assets/image/clear.png')} style={styles.clearImage}
                        testID={"OnboardingClearImageView"}
                        nativeID={"OnboardingClearImageView"}
                        accessibilityLabel={"OnboardingClearImageView"} />
                </TouchableOpacity>
            </View>
        )
    }

    renderDefaultSearchComponent() {
        return (
            <View style={styles.container}>
                <FlatList keyboardShouldPersistTaps={true}
                    keyExtractor={this._keyExtractor}
                    data={this._getInitialData()}
                    renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }

    renderSearchComponent() {
        const { searchStore } = this.props;
        return (
            <View style={styles.container}>
                {
                    searchStore.suggestions != [] && searchStore.suggestions != null && searchStore.suggestions.length != 0 && searchStore.showList ?
                        <SectionList
                            sections={searchStore.suggestions}
                            keyboardShouldPersistTaps={true}
                            renderItem={({ item }) => {
                                if (!firstItem && item.level2Text.length > 1) {
                                    searchStore.sectionFirstItem = item;
                                    firstItem = true;
                                }
                                let suggestionTextFirstpart = "";
                                var suggestionTextSecondpart = "";
                                if (this.state.searchText != null) {
                                    let searchTextWOTrailingSpace = this.state.searchText.trim(' ')
                                    let indexVal = item.level1Text.toLowerCase().indexOf(searchTextWOTrailingSpace.toLowerCase());
                                    suggestionTextFirstpart = item.level1Text.substring(0, searchTextWOTrailingSpace.length) ? item.level1Text.substring(0, searchTextWOTrailingSpace.length) : ""
                                    if (indexVal > -1) {
                                        suggestionTextSecondpart = item.level1Text.substring(indexVal + searchTextWOTrailingSpace.length);
                                    }
                                }
                                if ((item.level2Text.length > 1 && item.type == "STATE") || item.type != "STATE") {
                                    return (<View style={styles.suggestionRootContainer}>
                                        <TouchableOpacity onPress={this.suggestionClicked.bind(this, item)} 
                                                          testID={"searchSuggestionView"}
                                                          nativeID={"searchSuggestionView"}
                                                          accessibilityLabel={"searchSuggestionView"}>
                                            <View style={styles.suggestionSubContainer}>
                                                <Text style={styles.level1BlueTextStyle}
                                                      testID={"searchSuggestionTitleText"}
                                                      nativeID={"searchSuggestionTitleText"}
                                                      accessibilityLabel={"searchSuggestionTitleText"}>{suggestionTextFirstpart}</Text>
                                                <Text style={styles.level1GreyTextStyle} 
                                                      testID={"searchSuggestionTitleMainText"}
                                                      nativeID={"searchSuggestionTitleMainText"}
                                                      accessibilityLabel={"searchSuggestionTitleMainText"}>{suggestionTextSecondpart}</Text>
                                            </View>
                                            <Text style={styles.level2TextStyle} 
                                                  testID={"searchSuggestionSubTitleText"}
                                                  nativeID={"searchSuggestionSubTitleText"}
                                                  accessibilityLabel={"searchSuggestionSubTitleText"}>{item.level2Text}</Text>
                                        </TouchableOpacity>
                                    </View>)
                                } else {
                                    return (<View />)
                                }
                            }
                            }
                            renderSectionHeader={({ section }) => {
                                var type = section.index
                                var imagePath = require('../assets/image/place.png');
                                switch (type) {
                                    case 0:
                                        imagePath = require('../assets/image/place.png');
                                        break;
                                    case 1:
                                        imagePath = require('../assets/image/schools.png')
                                        break;
                                    case 2:
                                        imagePath = require('../assets/image/address.png')
                                        break;
                                    case 3:
                                        imagePath = require('../assets/image/address.png')
                                        break;
                                }
                                return (
                                    <View style={styles.sectionTitleContainer}>
                                        <Image source={imagePath} />
                                        <Text style={styles.sectionHeaderStyle}
                                              testID={"searchSuggestionHeaderText"}
                                              nativeID={"searchSuggestionHeaderText"}
                                              accessibilityLabel={"searchSuggestionHeaderText"}>{section.title}</Text>
                                    </View>
                                )
                            }

                            }
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.flatListStyle}
                        />
                        :
                        this.renderDefaultSearchComponent()
                }
            </View >
        )
    }

    componentWillUnmount() {
        if (this.props.searchStore.isSuggestionsEmpty) {
            this.props.searchStore.isSuggestionsEmpty = false
        }
    }
}
export default inject("searchStore")(observer(SearchAutoSuggest));

const styles = StyleSheet.create({
    listItemRootContainer: {
        flexDirection: 'column',
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItemNameContainer: {
        marginLeft: 13,
        justifyContent: 'center'
    },
    listItemRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listItemLeftContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemRightImageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
        alignItems: 'center',
    },
    leftImage: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    rightImage: {
        width: 8,
        height: 15,
        marginRight: 20
    },
    rootContainer: {
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: '#0B2B80'
    },
    rootMainContainer: {
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'white',
    },
    level1BlueTextStyle: {
        fontFamily: "Graphik-Medium",
        fontSize: 15,
        color: '#0B2B80'
    },
    level1GreyTextStyle: {
        fontFamily: "Graphik-Medium",
        fontSize: 15,
        color: '#8C8E9B'
    },
    level2TextStyle: {
        fontFamily: "Graphik",
        fontSize: 13,
        color: '#8C8E9B'
    },
    sectionHeaderStyle: {
        fontFamily: "Graphik-Medium",
        fontSize: 13,
        color: 'black',
        marginHorizontal: 4,
        paddingVertical: 2,
    },
    container: {
        flex: 1
    },
    itemName: {
        fontSize: 15,
        color: '#0B2B80',
        fontFamily: "Graphik-Medium",
        marginTop: 5
    },
    itemSubName: {
        fontSize: 14,
        color: '#868896'
    },
    separator: {
        height: 0.8,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: "#D2D2D2"
    },
    listItemNearByContainer: {
        marginLeft: 13,
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    searchTextInputRootContainer: {
        backgroundColor: '#1F47AF'
    },
    suggestionRootContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white'
    },
    suggestionSubContainer: {
        flexDirection: 'row'
    },
    sectionTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: '#E4E4E4'
    },
    emptyContainer: {
        height: "100%",
        width: "100%",
        alignItems: 'center',
        backgroundColor: '#F5F3F2'
    },
    emptySearchImage: {
        width: 70,
        height: 70,
        marginRight: 20,
        marginTop: 70
    },
    emptySearchTitleStyle: {
        fontFamily: "Graphik-Medium",
        fontSize: 30,
        marginTop: 40,
        color: '#0B2B80'
    },
    emptySearchSubTitleStyle: {
        fontFamily: "Graphik",
        fontSize: 15,
        color: '#000000',
        marginTop: 20,
        textAlign: 'center'
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F47AF'
    },
    clearIcon: {
        padding: 10,
        backgroundColor: 'yellow'
    },
    input: {
        width: '93%',
        height: 45,
        padding: 8,
        borderColor: '#8C8E9B',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 4,
        fontWeight: 'bold'
    },
    inputSearchSection: {
        margin: 3,
        flex: 1,
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: 10
    },
    clearImage: {
        resizeMode: 'contain'
    },
    backImage: {
        height: 18,
        width: 18,
    },
    searchBarOnboarding: {
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 4,
        paddingTop: 4,
        backgroundColor: "#0B2B80"
    },
    inputText: {
        borderColor: '#8C8E9B',
        backgroundColor: "white",
        width: "97%",
        fontSize: 14,
        fontFamily: "Graphik-Medium",
        paddingTop: 6,
        paddingBottom: 6,
        marginLeft: 15,
        paddingLeft: 15,
        color: "#0B2B80"
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
        paddingTop: 6,
        height: 45,
        backgroundColor: "#0B2B80"
    },
    searchIcon: {
        width: 18,
        height: 20,
        marginLeft: 10
    },
    inputIntialText: {
        borderColor: '#8C8E9B',
        backgroundColor: "#314C90",
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 22,
        marginLeft: 10,
        color: "white",
        borderRadius: 4,
    },
    clearText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        paddingLeft: 8,
        fontFamily: 'Graphik-Medium',
        paddingRight: 8,
        color: 'white',
        marginTop: 4,
        textAlign: 'center'
    },
    inputSearchIcon: {
        width: 10,
        height: 10,
        marginLeft: 30,
        tintColor: 'white',
        position: 'absolute',
        left: 15,
        right: 0,
    }
});
