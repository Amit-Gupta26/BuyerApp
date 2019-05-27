import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Keyboard,
    StatusBar,
    Image
} from "react-native";

import DiscoverItem from "../../components/DiscoverItem";
import { observer, inject } from "mobx-react";
import { adviceData, justForMeData } from "../../data/DiscoverItemData";
import { Advice } from "../../components/Advice";
import { NavigationEvents } from "react-navigation";
import JustForMeItem from "../../components/JustForMeItem";
import StringUtil from "../../utils/StringUtil";

class DiscoverScreen extends Component {
    constructor(props) {
        super(props);
    }
    handleListTap = item => {
        Keyboard.dismiss();
        this.props.navigation.navigate("PropertyDetails", {
            address: item.propAddress.streetName,
            pdpUrl: item.listingUrl,
            imageUrl: item.imageUrl
        });
    };
    handleListTapJustForMe = item => {
        Keyboard.dismiss();
        console.warn("Just For Me Clicked!");
    };
    handleAdviceTap = item => {
        Keyboard.dismiss();
        this.props.navigation.navigate("AdviceScreen", {
            title: item.title,
            url: item.url
        });
        console.warn("Advice Clicked");
    };
    componentWillMount() {
        this.makeApiCall();
    }
    componentDidMount() { }
    makeApiCall() {
        const { searchStore } = this.props;
        if (searchStore.searchUrl != null && searchStore.searchUrl != undefined) {
            let symbol = searchStore.hasFilter ? "&" : "?";
            this.props.discoverStore.fetchDetailsNewListings(
                `${
                searchStore.searchUrl
                }${symbol}ajaxsearch=true&newListings=7&getuseractivity=true`
            );
            //   this.props.discoverStore.fetchDetailsOpenHouses(
            //     `${
            //       searchStore.searchUrl
            //     }${symbol}ajaxsearch=true&nopenHouse=future&getuseractivity=true`
            //   );
        }
    }
    _displayNewListings() {
        let stringUtilobj = new StringUtil();
        const { discoverStore } = this.props;
        if (
            discoverStore.dataNewListings != undefined &&
            discoverStore.dataNewListings.property != undefined &&
            Object.keys(discoverStore.dataNewListings.property).length > 0
        ) {
            return (
                <View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>New Listings</Text>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={discoverStore.dataNewListings.property}
                            keyboardShouldPersistTaps={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => this.handleListTap(item)}>
                                        <DiscoverItem
                                            isNew={"yes"}
                                            newPropertyText={stringUtilobj._stringUtil(
                                                item.newPropertyText
                                            )}
                                            imageUrl={item.imageUrl}
                                            line1={item.propAddress.streetName}
                                            line2={
                                                item.propAddress.city +
                                                ", " +
                                                item.propAddress.state +
                                                " " +
                                                item.propAddress.zip
                                            }
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            );
        } else {
            return;
        }
    }
    _sort(len, toBeSortedata) {
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (
                    toBeSortedata[j].openHouse.startDate >
                    toBeSortedata[j + 1].openHouse.startDate
                ) {
                    var tmp = toBeSortedata[j];
                    toBeSortedata[j] = toBeSortedata[j + 1];
                    toBeSortedata[j + 1] = tmp;
                }
            }
        }
    }
    _displayOpenHouseListings() {
        const { discoverStore } = this.props;
        let toBeSortedata = [];
        if (
            discoverStore.dataOpenHouses != undefined &&
            discoverStore.dataOpenHouses.property != undefined &&
            Object.keys(discoverStore.dataOpenHouses.property).length > 0
        ) {
            let len = discoverStore.dataOpenHouses.property.length;
            for (let i = 0; i < len; i++) {
                toBeSortedata[i] = discoverStore.dataOpenHouses.property[i];
            }
            this._sort(len, toBeSortedata);
            return (
                <View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>Open Houses Nearby</Text>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={toBeSortedata}
                            keyboardShouldPersistTaps={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => this.handleListTap(item)}>
                                        <DiscoverItem
                                            isNew={"no"}
                                            openHouseText={item.openHouse.date}
                                            imageUrl={item.imageUrl}
                                            line1={item.propAddress.streetName}
                                            line2={
                                                item.propAddress.city +
                                                ", " +
                                                item.propAddress.state +
                                                " " +
                                                item.propAddress.zip
                                            }
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            );
        } else {
            return;
        }
    }
    _displayJustForMe() {
        const { searchStore } = this.props;
        if (
            searchStore.searchUrl != undefined &&
            searchStore.searchUrl.length > 1
        ) {
            return (
                <View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>Just for Me</Text>
                    </View>
                    <View style={{ marginLeft: 15 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={justForMeData}
                            extraData={this.props.searchStore.data.searchText}
                            keyboardShouldPersistTaps={true}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.handleListTapJustForMe(item)}
                                    >
                                        <JustForMeItem
                                            line1={this.props.searchStore.data.searchText}
                                            line2={item.filterTerm}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            );
        } else {
            return;
        }
    }
    _displaySeparatorForNew() {
        const { discoverStore } = this.props;
        if (
            discoverStore.dataNewListings != undefined &&
            discoverStore.dataNewListings.property != undefined &&
            Object.keys(discoverStore.dataNewListings.property).length > 0
        ) {
            return <View style={styles.separator} />;
        } else {
            return null;
        }
    }
    _displaySeparatorForJustForMe() {
        const { searchStore } = this.props;
        if (
            searchStore.searchUrl != undefined &&
            searchStore.searchUrl.length > 1
        ) {
            return <View style={styles.separator} />;
        } else {
            return null;
        }
    }
    _displaySeparatorForOpenHouse() {
        const { discoverStore } = this.props;
        if (
            discoverStore.dataOpenHouses != undefined &&
            discoverStore.dataOpenHouses.property != undefined &&
            Object.keys(discoverStore.dataOpenHouses.property).length > 0
        ) {
            return <View style={styles.separator} />;
        } else {
            return null;
        }
    }

    _onSuggestionClicked = (suggestionItem, type, isMlsSearch, searchTitle) => {
        if (type == null || type == "recent_search") {
            if (type == "recent_search") {
                const { searchStore } = this.props;
                this.setState({ isLoading: true, isInputText: true });
                searchStore.setSearchURLData(searchStore.searchUrl, false, searchStore.isMlsSearch);
            } else {
                var searchText;
                if (suggestionItem.level1Text != "" && suggestionItem.level2Text != "") {
                    searchText = suggestionItem.level1Text + ", " + suggestionItem.level2Text;
                } else {
                    searchText = suggestionItem.level1Text;
                }
                this.setState({
                    isLoading: true,
                    searchText: searchText,
                    isInputText: true
                });
                this.props.searchStore.fetchCentroid(
                    suggestionItem.id ? suggestionItem.id : ""
                );

                if (!isMlsSearch) {
                    this.props.searchStore.fetchSearchURL(suggestionItem);
                }
                this.props.searchStore.searchText = searchText;
            }
        } else {
            alert("Search my current location clicked");
        }
        this.props.navigation.navigate("Search");
    };

    _fecthSuggestions = () => {
        this.props.navigation.navigate('SearchAutoSuggest', {
            onGoBack: (suggestionItem, type, isMlsSearch, searchTitle) => this._onSuggestionClicked(suggestionItem, type, isMlsSearch, searchTitle),
            type: 'discover'
        });
    }

    render() {
        const { searchStore } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{ backgroundColor: "#0B2B80" }} />
                <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
                    <NavigationEvents
                        onWillFocus={payload => {
                            this.makeApiCall();
                        }} />
                    <View style={styles.searchBar}>
                        <View style={styles.inputView}>
                            <Image source={require('../../assets/image/ic_search.png')} style={styles.inputSearchIcon} />
                            <Text onPress={() => this._fecthSuggestions()} overflow="hidden" style={styles.inputTextStyle}
                                  testID={"DiscoverSearchInputText"} nativeID={"DiscoverSearchInputText"}
                                  accessibilityLabel={"DiscoverSearchInputText"}>{searchStore.searchText}</Text>
                        </View>
                    </View>
                    <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps={true}>

                        {this._displayNewListings()}
                        {this._displaySeparatorForNew()}
                        {this._displayOpenHouseListings()}
                        {this._displaySeparatorForOpenHouse()}
                        {this._displayJustForMe()}
                        {this._displaySeparatorForJustForMe()}

                        <View style={styles.paddingBottom}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerText}>Advice</Text>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={adviceData}
                                    keyboardShouldPersistTaps={true}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity onPress={() => this.handleAdviceTap(item)} >
                                                <Advice imageUrl={item.image}
                                                    title={item.title} />
                                            </TouchableOpacity>
                                        );
                                    }
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
export default inject("discoverStore", "searchStore")(observer(DiscoverScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        textAlignVertical: 'center',
        marginHorizontal: 14,
        marginVertical: 10,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 22
    },
    paddingBottom: {
        paddingBottom: 50,
    },
    separator: {
        height: 1,
        backgroundColor: "#CED0CE",
        marginTop: 10
    },
    searchBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 4,
        paddingTop: 4,
        backgroundColor: "#0B2B80"
    },
    containerView: {
        backgroundColor: "#0B2B80"
    },
    inputView: {
        backgroundColor: "#314C90",
        borderRadius: 4,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 3,
        paddingLeft: 28,
        paddingRight: 10,
        marginTop: 3,
        marginBottom: 2,
        marginRight: 10,
        marginLeft: 10,
        color: "white"
    },
    inputTextStyle: {
        color: 'white',
        width: "100%",
        height: 20,
        fontSize: 13
    },
    inputSearchIcon: {
        width: 10,
        height: 10,
        tintColor: 'white',
        position: 'absolute',
        left: 12,
        right: 0,
    },
});
