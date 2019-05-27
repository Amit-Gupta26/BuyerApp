import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Platform
} from "react-native";
import ProprtypeCell from "./ProprtypeCell";
import { propertyTypeData } from './../../data/PropertyTypeData'

class PropertyTypeSelView extends Component {

    constructor() {
        super();
        this.state = {
            propTypeArray: []
        };
    }

    static navigationOptions = {
        title: 'Property Type',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center', },
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: '#1F47AF',
    };

    componentDidMount() {
        propTypeArray = Array.from(this.props.navigation.getParam(
            "propTypeArray"
        ))
        this.setState({
            propTypeArray: propTypeArray
        })
    }

    returnToFilter() {
        var propTypeDisplayText = ''
        var tempPropArray = []
        if (this.state.propTypeArray.length == 0) {
            propTypeDisplayText = 'ALL'
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
        propTypeArray = this.props.navigation.getParam(
            "propTypeArray"
        )
        if (propTypeArray.length > 0) {
            for (let i = 0; i < propTypeArray.length; i++) {
                if (propTypeArray[i].value === value) {
                    selected = true
                    break;
                }
            }

        }
        return selected
    }


    render() {

        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar backgroundColor="#0B2B80" barStyle={Platform.OS == 'ios' ? "dark-content" : "light-content"} />
                <View style={styles.container}>
                    <FlatList
                        data={propertyTypeData}
                        renderItem={({ item, index }) =>
                            <ProprtypeCell
                                type={item.value}
                                index={index}
                                selected={this.retainDataOnView(item.value)}
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
    safeAreaContainer: {
        flex: 1
    },
    flatListStyle: {
        marginBottom: 90
    },
    propTypeButStyle: {
        color: 'white',
        fontSize: 16
    },
    buttonStyle: {
        width: 350,
        height: 50,
        padding: 8,
        backgroundColor: '#0B2B80',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        borderRadius: 5
    },
    BottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        borderRadius: 5,
        width: 350,
        position: 'absolute',
        bottom: 35

    },
});

export default PropertyTypeSelView;
