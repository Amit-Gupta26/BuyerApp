import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

class PDPPriceHistoryCell extends Component {
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
      <View style={styles.priceHistorySubTextContainerView}>
        <View style={styles.priceHistorySubTextView}>
          <Text style={styles.priceHistoryCellSubText}>{"Date"} </Text>
          <Text style={styles.priceHistoryCellSubText}>{"Event"} </Text>
          <Text style={styles.priceHistoryCellSubText}>{"Price"} </Text>
        </View>
        {this._renderPriceDetailsData()}
        <View style={styles.countyPublicContainerView}>
          <Text style={styles.countyPublicView}>
            {"Source: "}
            <Text style={styles.priceHistoryCellSubTextDetails}>
              {"County(Public) Records"}{" "}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  _renderPriceDetailsData() {
    var dataSource = [
      { date: "09 Jan, 2019", event: "Listed Price", price: "$450,000" },
      { date: "09 Jan, 2019", event: "Listed Price", price: "$450,000" },
      { date: "09 Jan, 2019", event: "Listed Price", price: "$450,000" }
    ];
    var table = [];
    for (let i = 0; i < dataSource.length; i++) {
      table.push(
        <View key={i} style={styles.dataSourceView}>
          <Text style={styles.priceHistoryCellSubTextDetails}>
            {dataSource[i].date}
          </Text>
          <Text style={styles.priceHistoryCellSubTextDetails}>
            {dataSource[i].event}
          </Text>
          <Text style={styles.priceHistoryCellSubTextDetails}>
            {dataSource[i].price}
          </Text>
        </View>
      );
    }
    return table;
  }

  render() {
    return (
      <View style={styles.priceContainerView}>
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
            <View style={styles.priceTextView}>
              <Text style={styles.priceHistoryCellText}>{"Price History"}</Text>
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
  priceHistoryCellText: {
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
  priceHistorySubTextContainerView: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  arrowContainerView: {
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  priceHistorySubTextView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  priceHistoryCellSubText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#706F74"
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
  priceTextView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    paddingLeft: 8
  },
  priceContainerView: {
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center"
  },
  priceHistoryCellSubTextDetails: {
    fontSize: 15,
    color: "#706F74",
    paddingBottom: 10,
    paddingTop: 20
  }
});
export default PDPPriceHistoryCell;
