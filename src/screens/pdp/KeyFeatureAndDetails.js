import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList
} from "react-native";

class KeyFeatureAndDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("address", ""),
        headerTitleStyle: { textAlign: "center", alignSelf: "center" },
        headerStyle: {
            backgroundColor: "white",
            borderBottomColor: "transparent",
            borderBottomWidth: 0
        },
        headerTintColor: "#1F47AF",
        headerLeft: (
            <TouchableOpacity
                style={[
                    styles.headerButton,
                    {
                        marginLeft: 8
                    }
                ]}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={require("../../assets/image/clear.png")}
                    style={styles.headerButtonImage}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                style={[
                    styles.headerButton,
                    {
                        marginRight: 18,
                        borderColor: "gray",
                        borderWidth: 1.5,
                        borderRadius: 20
                    }
                ]}
                onPress={() => {
                    alert("Favorite Action");
                }}
            >
                <Image
                    source={require("../../assets/image/Cards-Fav.png")}
                    style={styles.headerButtonImage}
                />
            </TouchableOpacity>
        )
    });

    _renderItemWithDescription(item, index) {
        var count = item.description.length;
        var table = [];
        for (let i = 0; i < count; i++) {
            var ele = item.description[i];
            table.push(
                <View
                    style={[styles.rowView, { marginBottom: i == count - 1 ? 5 : 0 }]}
                    key={i}
                >
                    <Text style={[styles.rowKeyText, { color: "#515666" }]}>
                        {ele.key != "" ? `${ele.key}: ` : ""}
                        <Text style={[styles.rowValueText, { color: "#5f6472" }]}>
                            {ele.value != "" ? `${ele.value}` : ""}
                        </Text>
                    </Text>
                </View>
            );
        }
        return table;
    }

    _renderItemWithTitle(item, index) {
        return (
            <View style={styles.sectionView}>
                <Image
                    source={this.getImagePathWithName(item.title.toUpperCase())}
                    style={styles.sectionImage}
                />
                <Text style={styles.sectionText}>{item.title.toUpperCase()}</Text>
            </View>
        );
    }

    getImagePathWithName(name) {
        var commonPath = "../../assets/image/";
        if (name == "ROOMS") {
            return require(commonPath + "rooms.png");
        } else if (name == "INTERIOR") {
            return require(commonPath + "interior.png");
        } else if (name == "BUILDING") {
            return require(commonPath + "building.png");
        } else if (name == "GARAGE & PARKING") {
            return require(commonPath + "garage.png");
        } else if (name == "LOT") {
            return require(commonPath + "lot.png");
        } else if (name == "LOCATION") {
            return require(commonPath + "location.png");
        } else if (name == "COMMUNITY") {
            return require(commonPath + "community.png");
        } else if (name == "HEATING & COOLING") {
            return require(commonPath + "heating.png");
        } else if (name == "UTILITIES & SECURITY") {
            return require(commonPath + "utilities.png");
        } else if (name == "APPLIANCES") {
            return require(commonPath + "appliances.png");
        } else if (name == "BATHROOMS") {
            return require(commonPath + "bathrooms.png");
        } else if (name == "EXTERIOR") {
            return require(commonPath + "exterior.png");
        } else if (name == "ACCESSIBILITY") {
            return require(commonPath + "accessibility.png");
        }
    }

    _renderItem(item, index) {
        return (
            <View
                style={[
                    styles.sectionAndRowHolderView,
                    { marginTop: index == 0 ? 5 : 0 }
                ]}
            >
                {this._renderItemWithTitle(item, index)}
                {this._renderItemWithDescription(item, index)}
            </View>
        );
    }

    render() {
        var dataSource = [
            { title: "Rooms", description: [{ key: "Bedrooms", value: "3" }] },
            {
                title: "Interior",
                description: [{ key: "Features", value: "Intercom,Elevator" }]
            },
            {
                title: "Building",
                description: [
                    { key: "Property Types", value: "Condominium" },
                    { key: "Year Built", value: "1912" },
                    { key: "Floor Types", value: "Wood - Hard" }
                ]
            },
            {
                title: "Garage & Parking",
                description: [
                    {
                        key: "Parking",
                        value: "1, Access - Independent, Garage, Mapped On Site"
                    }
                ]
            },
            {
                title: "Lot",
                description: [
                    { key: "Zoning", value: "RM4" },
                    { key: "LotSize", value: "0 sqft" }
                ]
            },
            {
                title: "Location",
                description: [
                    { key: "Country", value: "San Francisco" },
                    { key: "Real Estate Area", value: "Nob Hill" },
                    { key: "Mls #", value: "479866" }
                ]
            },
            {
                title: "Community",
                description: [
                    {
                        key: "Condo Maintenance",
                        value:
                            "Water, Heat, Garbage, Ext Bldg Maintenance, homeowners Insurance, Outside Management"
                    },
                    { key: "HOA Dues", value: "$1,004 / Monthly" }
                ]
            },
            {
                title: "Heating & Cooling",
                description: [{ key: "# of Fireplaces", value: "2" }]
            }
        ];
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <FlatList
                    style={styles.flatList}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={dataSource}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }
}
export default KeyFeatureAndDetails;

const styles = StyleSheet.create({
    headerButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40
    },
    headerButtonImage: {
        width: 18,
        height: 18,
        resizeMode: "cover"
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    flatList: {
        flex: 1
    },
    sectionAndRowHolderView: {
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "column",
        marginBottom: 5
    },
    sectionView: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginHorizontal: 20,
        marginTop: 5,
        flexDirection: "row",
        paddingVertical: 3
    },
    sectionImage: {
        width: 35,
        height: 35,
        resizeMode: "cover"
    },
    sectionText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#1F47AF",
        paddingLeft: 20
    },
    rowView: {
        alignItems: "stretch",
        justifyContent: "center",
        marginHorizontal: 20,
        flexDirection: "column",
        paddingVertical: 5
    },
    rowKeyText: {
        fontWeight: "bold",
        fontSize: 13
    },
    rowValueText: {
        fontWeight: "normal",
        fontSize: 14
    }
});
