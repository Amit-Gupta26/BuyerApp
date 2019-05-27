import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    Dimensions
} from "react-native";
import ProprtypeCell from "../../views/onboarding/ProprtypeCell";
import { propertyTypeData } from '../../data/PropertyTypeData'
const topMarginForBack = Platform.OS === 'ios' ? 0 : 10
const leftSpacingForBack = Platform.OS === 'ios' ? 10 : 10
const rightSpacingForClearAll = Platform.OS === 'ios' ? 10 : 10
const { width } = Dimensions.get("window");


class PropertyTypeSelView extends Component {

    constructor() {
        super();
        this.state = {
            propTypeArray: [],
            propertyTypeDataArray: propertyTypeData,
            refresh: false
        };
    }

    static navigationOptions = {
        header: null
    };

    clearClicked() {
        this.setState({
            propTypeArray: [],
            refresh: !this.state.refresh
        })
    }

    componentWillMount() {
        propTypeArray = Array.from(this.props.navigation.getParam(
            "propTypeArray"
        ))
        this.setState({
            propTypeArray: propTypeArray
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleClearAll: this.clearClicked });
    }

    returnToFilter() {
        var propTypeDisplayText = ''
        var tempPropArray = []
        if (this.state.propTypeArray.length == 0) {
            propTypeDisplayText = 'All'
        }
        else {
            for (let i = 0; i < this.state.propTypeArray.length; i++) {
                propTypeDisplayText += this.state.propTypeArray[i].value
                tempPropArray.push(this.state.propTypeArray[i].id)
                if (this.state.propTypeArray.length != i + 1) {
                    propTypeDisplayText += ", "
                }
            }
        }

        this.props.navigation.state.params.onGoBack(this.state.propTypeArray, propTypeDisplayText, tempPropArray);
        this.props.navigation.goBack();
    }

    addRemovePropType(item) {
        exist = false
        if (this.state.propTypeArray.length == 0) {
            this.state.propTypeArray.push(item)
        }
        else {
            for (let i = 0; i < this.state.propTypeArray.length; i++) {
                if (this.state.propTypeArray[i].value === item.value) {
                    exist = true
                    this.state.propTypeArray.splice(i, 1)
                    break;
                }
            }
            if (exist === false) {
                this.state.propTypeArray.push(item)
            }
        }
    }

    retainDataOnView(value) {

        selected = false
        if (this.state.propTypeArray.length > 0) {
            for (let i = 0; i < this.state.propTypeArray.length; i++) {
                if (this.state.propTypeArray[i].value === value) {
                    selected = true
                    break;
                }
            }

        }
        return selected
    }

    backPressed() {
        this.props.navigation.goBack()
    }


    render() {

        return (
            <SafeAreaView style={styles.rootContainer}>

                <View style={styles.container}>
                    <View style={styles.TopViewStyle}>
                        <TouchableOpacity style={styles.backButViewStyle} onPress={() => this.backPressed()}>
                            <Image source={require('./../../assets/image/BackBlue.png')} style={styles.ImageStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearAllButViewStyle} onPress={() => this.clearClicked()}>
                            <Text style={styles.clearAllTextStyle}>Clear All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={this.state.propertyTypeDataArray}
                        extraData={this.state.refresh}
                        renderItem={({ item, index }) =>
                            <ProprtypeCell
                                type={item.value}
                                index={index}
                                selected={this.retainDataOnView(item.value)}
                                refresh={this.state.refresh}
                                onTap={(value) => this.addRemovePropType(item)} />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatListStyle}
                    />
                    <View style={styles.BottomViewStyle}>
                        <TouchableOpacity onPress={() => this.returnToFilter()}>
                            <View style={styles.buttonStyle}
                            >
                                <Text style={styles.propTypeButStyle}>Apply Property Types</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    flatListStyle: {
        marginTop: 60,
        marginBottom: 50
    },
    propTypeButStyle: {
        color: 'white',
        fontSize: 18,
        fontFamily: "Graphik-Regular"
    },
    clearAllTextStyle: {
        color: '#0B2B80',
        fontSize: 18,
        width: 100,
        textAlign: 'center'
    },
    buttonStyle: {
        width: width,
        height: 60,
        backgroundColor: '#0B2B80',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18
    },
    BottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 50,
        width: width,
        position: 'absolute',
        bottom: 0
    },
    TopViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        borderRadius: 5,
        width: width,
        position: 'absolute',
    },
    backButViewStyle: {
        width: 25,
        height: 25,
        left: leftSpacingForBack,
        top: topMarginForBack,
        borderRadius: 5
    },
    clearAllButViewStyle: {
        width: 90,
        height: 25,
        right: rightSpacingForClearAll,
        borderRadius: 5,
        top: 5
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    rootContainer: {
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'white'
    }
});

export default PropertyTypeSelView;
