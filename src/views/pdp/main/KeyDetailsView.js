import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import TextAndArrowImageCell from "./TextAndArrowImageCell";

class KeyDetailsView extends Component {
    state = {
        isCellExpand: true
    };

    _renderViewAllFeaturesAndDetails() {
        return (
            <TextAndArrowImageCell
                text={"View All Features and Details"}
                onPressAction={this.props.viewAllFeaturePressAction}
            />
        );
    }
    _renderSeparatorLine() {
        return <View style={styles.separatorLine} />;
    }
    _renderKeyDetailsTextHolderView() {
        return (
            <View style={styles.keyDetailsHolderView}>
                <View style={styles.KeyDetailsView}>
                    <Text style={styles.KeyDetailsText}>{"Key Details"}</Text>
                </View>

                <View style={styles.imgView}>
                    <Image
                        style={styles.upAndDownArrowImage}
                        source={
                            this.state.isCellExpand
                                ? require("../../../assets/image/upArrow.png")
                                : require("../../../assets/image/downArrow.png")
                        }
                    />
                </View>
            </View>
        );
    }

    _renderStatusView(key, value) {
        return (
            <View style={styles.statusHolderView}>
                <View style={styles.statusView}>
                    <Text style={styles.statusText}>{key.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusView, { backgroundColor: "#FFFFFF" }]}>
                    <Text style={styles.statusText}>{value.toUpperCase()}</Text>
                </View>
            </View>
        );
    }

    _renderPropertyDetails(details) {
        var count = details.length;
        var table = [];
        for (let i = 0; i < count; i += 2) {
            var children = [];
            for (let j = 0; j < 2; j++) {
                if (i + j < count) {
                    var ele = details[i + j];
                    children.push(
                        <View style={[styles.propertyDetailsKeyValueHolderView]} key={j}>
                            <Text style={[styles.keyText, { color: "#515666" }]}>
                                {ele.key != "" ? `${ele.key}: ` : ""}
                                <Text style={[styles.valueText, { color: "#5f6472" }]}>
                                    {ele.value != "" ? `${ele.value}` : ""}
                                </Text>
                            </Text>
                        </View>
                    );
                }
            }
            table.push(
                <View style={styles.propertyDetailsHolderView} key={i}>
                    {children}
                </View>
            );
        }
        return table;
    }
    _renderPropertyTypeAndOwnersDotComDay(days, propertyType) {
        return (
            <View style={styles.propertyTypeHolderView}>
                <Text style={[styles.keyText, { color: "#0b2b80" }]}>
                    {"Days on Owners.com: "}
                    <Text style={[styles.valueText, { color: "#213f8c" }]}>{days}</Text>
                </Text>
                <Text style={[styles.keyText, { paddingTop: 5, color: "#0b2b80" }]}>
                    {"PropertyType: "}
                    <Text style={[styles.valueText, { color: "#213f8c" }]}>
                        {propertyType}
                    </Text>
                </Text>
            </View>
        );
    }

    render() {
        var details = [
            { key: "MLS#", value: "21830132" },
            { key: "Year Built", value: "1914" },
            { key: "Structure", value: "Single Story" },
            { key: "HOA dues, Frequency", value: "$5,886, Monthly" },
            { key: "Country", value: "San Francisco" },
            { key: "Cooling", value: "Central Air" },
            { key: "Lot Size", value: "0 sqft" }
        ];
        return (
            <View
                style={[
                    styles.containerView,
                    {
                        borderBottomColor: this.state.isCellExpand ? "#FFFFFF" : "#E2E2E2",
                        borderBottomWidth: this.state.isCellExpand ? 0 : 1
                    }
                ]}
            >
                <TouchableOpacity
                    style={styles.touchView}
                    onPress={() => {
                        this.setState(previousValue => ({
                            isCellExpand: !previousValue.isCellExpand
                        }));
                        //alert(this.state.isCellExpand)
                    }}
                >
                    {this._renderKeyDetailsTextHolderView()}
                </TouchableOpacity>
                {this.state.isCellExpand
                    ? this._renderStatusView("Status", "Active")
                    : null}
                {this.state.isCellExpand
                    ? this._renderPropertyTypeAndOwnersDotComDay("39", "Condominium")
                    : null}
                {this.state.isCellExpand ? this._renderPropertyDetails(details) : null}
                {this.state.isCellExpand
                    ? this._renderViewAllFeaturesAndDetails()
                    : null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerView: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        alignItems: "stretch",
        justifyContent: "center"
    },
    touchView: {
        alignItems: "flex-start",
        justifyContent: "center"
    },
    keyDetailsHolderView: {
        flexDirection: "row",
        width: "100%",
        height: 60
    },
    KeyDetailsView: {
        width: "85%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10
    },
    KeyDetailsText: {
        color: "#363940",
        fontSize: 22,
        fontWeight: "bold",
        paddingHorizontal: 8
    },
    imgView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center"
    },
    upAndDownArrowImage: {
        width: 15,
        height: 10,
        resizeMode: "cover"
    },
    statusHolderView: {
        backgroundColor: "#F1F1F3",
        flexDirection: "row",
        height: 20,
        borderRadius: 2,
        alignItems: "stretch",
        justifyContent: "space-evenly",
        width: "32%",
        marginHorizontal: 20,
        marginTop: -10
    },
    statusView: {
        alignItems: "center",
        justifyContent: "center",
        width: "48%",
        marginVertical: 2
    },
    statusText: {
        color: "#878789",
        fontWeight: "normal",
        fontSize: 12
    },
    propertyTypeHolderView: {
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    keyText: {
        fontWeight: "bold",
        fontSize: 12
    },
    valueText: {
        fontWeight: "normal",
        fontSize: 13
    },
    propertyDetailsHolderView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
        marginVertical: 5
    },
    propertyDetailsKeyValueHolderView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        width: "45%",
        marginHorizontal: "5%"
    },
    separatorLine: {
        height: 1,
        width: "95%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%"
    }
});

export default KeyDetailsView;
