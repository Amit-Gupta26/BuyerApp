import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

class PDPTaxDetailsCell extends Component {
    state = {
        isCellExpand: false
    };
    _renderCellView() {
        return (
            <View style={styles.cellView}>
                {this.state.isCellExpand ? this._renderCellExpandMode() : null}
            </View>
        );
    }

    _renderCellExpandMode() {
        return <View style={styles.expandView}>{this._renderExpandMode()}</View>;
    }

    _renderExpandMode() {
        return (
            <View style={styles.taxHistorySubTextContainerView}>
                <View style={styles.taxHistorySubTextView}>
                    <Text style={styles.taxHistoryCellSubText}>{"Assessed Value"} </Text>
                </View>
                {this._renderTaxDetailsData()}
                {this._renderSeparatorLine()}
                {this._renderTaxMoreDetailsData()}
                <View style={styles.countyPublicContainerView}>
                    <Text style={styles.countyPublicView}>
                        {"Source: "}
                        <Text style={styles.taxHistoryCellSubTextDetails}>
                            {"County(Public) Records"}{" "}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }

    _renderTaxDetailsData() {
        return <View style={{ flexDirection: "column", alignItems: "stretch" }}>
            <View style={styles.dataSourceView}>
                <Text style={[styles.taxHistoryCellSubTextDetails, { justifyContent: "flex-start", color: "black", fontWeight: "bold", paddingLeft: 20, }]}>
                    {"Land"}
                </Text>
                <Text style={styles.taxHistoryCellSubTextDetails}>
                    {"$45000"}
                </Text>
            </View>
            <View style={styles.dataSourceView}>
                <Text style={[styles.taxHistoryCellSubTextDetails, { justifyContent: "flex-start", color: "black", fontWeight: "bold", paddingLeft: 20, }]}>
                    {"Additions"}
                </Text>
                <Text style={styles.taxHistoryCellSubTextDetails}>
                    {"$45000"}
                </Text>
            </View>
        </View>
    }

    _renderSeparatorLine() {
        return <View style={styles.separatorLine} />;
    }

    _renderTaxMoreDetailsData() {
        return <View style={{ flexDirection: "column", alignItems: "stretch" }}>
            <View style={styles.dataSourceView}>
                <Text style={[styles.taxHistoryCellSubTextDetails, { color: "black", fontWeight: "bold" }]}>
                    {"Total"}
                </Text>
                <Text style={[styles.taxHistoryCellSubTextDetails, { color: "black", fontWeight: "bold" }]}>
                    {"$450000"}
                </Text>
            </View>
            <View style={styles.dataSourceView}>
                <Text style={[styles.taxHistoryCellSubTextDetails, { justifyContent: "flex-start", color: "black", fontWeight: "bold" }]}>
                    {"Tax"}
                    <Text style={{ color: "#706F74" }}>
                        {"(2018)"}
                    </Text>
                </Text>
                <Text style={[styles.taxHistoryCellSubTextDetails, { color: "black", fontWeight: "bold" }]}>
                    {"$450,000"}
                </Text>
            </View>
        </View>
    }

    render() {
        return (
            <View style={styles.taxContainerView}>
                <TouchableOpacity
                    style={[
                        styles.containerView,
                        {
                            borderBottomColor: this.state.isCellExpand ? "white" : "#E2E2E2",
                            borderBottomWidth: this.state.isCellExpand ? 0 : 1
                        }
                    ]}
                    onPress={() => {
                        this.setState(previousValue => ({
                            isCellExpand: !previousValue.isCellExpand
                        }));
                    }}
                >
                    <View style={styles.touchView}>
                        <View style={styles.taxTextView}>
                            <Text style={styles.taxHistoryCellText}>{"Property Tax"}</Text>
                        </View>

                        <View style={styles.arrowContainerView}>
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
                </TouchableOpacity>
                {this._renderCellView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    taxHistoryCellText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#272935"
    },
    containerView: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "column"
    },
    borderView: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "row"
    },
    taxHistorySubTextContainerView: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "stretch"
    },
    countyPublicContainerView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    countyPublicView: {
        color: "black",
        fontSize: 15,
        paddingBottom: 10,
        paddingTop: 20
    },
    dataSourceView: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "stretch"
    },
    arrowContainerView: {
        width: "10%",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    taxHistorySubTextView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    taxHistoryCellSubText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000"
    },
    collapseView: {
        marginBottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    expandView: {
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    upAndDownArrowImage: {
        width: 15,
        height: 10
    },
    cellView: {
        width: "100%",
        alignItems: "stretch",
        justifyContent: "center",
        paddingHorizontal: "5%"
    },
    touchView: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    taxTextView: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        paddingLeft: 8
    },
    taxContainerView: {
        backgroundColor: "white",
        alignItems: "stretch",
        justifyContent: "center"
    },
    taxHistoryCellSubTextDetails: {
        fontSize: 15,
        color: "#706F74",
        paddingBottom: 10,
        paddingTop: 10,
    },
    separatorLine: {
        height: 1,
        backgroundColor: "#CED0CE",
    }
});
export default PDPTaxDetailsCell;
