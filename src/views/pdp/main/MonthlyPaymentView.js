import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList
} from "react-native";

class MonthlyPaymentCell extends Component {
  render() {
    var item = this.props.item;
    return (
      <View
        style={[
          styles.monthlyPaymentView,
          { paddingBottom: item.source != "" ? 25 : 10 }
        ]}
      >
        {this._renderFlatListCell(item)}
        {item.source != "" ? this._renderSourceView(item.source) : null}
      </View>
    );
  }

  _getColorBasedOnItem(item) {
    var colorValue = "transparent";
    if (item.key == "principalInterest") {
      colorValue = "#65A0C0";
    } else if (item.key == "propertyTaxes") {
      colorValue = "#F58464";
    } else if (item.key == "hoaDues") {
      colorValue = "#67E79C";
    }
    return colorValue;
  }

  _getTitleBasedOnItem(str) {
    var title = "";
    if (str == "principalInterest") {
      title = "Principal and Interest ";
    } else if (str == "propertyTaxes") {
      title = "Property Taxes";
    } else if (str == "hoaDues") {
      title = "HOA Dues";
    }
    return title;
  }

  _renderSourceView(source) {
    return (
      <View style={styles.sourceView}>
        <Text style={styles.sourceText}>{"Source: " + source}</Text>
      </View>
    );
  }

  _renderFlatListCell(item) {
    return (
      <View style={styles.flatListCellContentView}>
        <View style={styles.flatListCellKeyView}>
          <View
            style={[
              styles.circularColorView,
              {
                backgroundColor: this._getColorBasedOnItem(item)
              }
            ]}
          />
          <Text style={styles.flatListCellKeyText}>
            {this._getTitleBasedOnItem(item.key)}
          </Text>
        </View>

        <View style={styles.flatListCellValueView}>
          <Text style={styles.flatListCellValueText}>{item.value}</Text>
        </View>
      </View>
    );
  }
}

class MonthlyPaymentView extends Component {
  _renderEstimateMonthlyPayment() {
    return (
      <View style={styles.estimateMonthlyPaymentView}>
        <Text style={styles.estimateMonthlyPaymentText}>
          {"Estimated Monthly Payment"}
        </Text>
      </View>
    );
  }

  _renderMonthlyEMI() {
    return (
      <View style={styles.monthlyEMIView}>
        <Text style={styles.monthlyEMIText}>{"$56,460 per month"}</Text>
      </View>
    );
  }

  _renderMonthlyInterestRate() {
    return (
      <View style={styles.monthlyInterestRateView}>
        <Text style={styles.monthlyInterestRateText}>
          {"30-Year Fixed, 3.86 % Interest"}
        </Text>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => {
            Alert.alert(
              "Includes Property tax and HOA dues when available. Home insurance and other customary loan fees are not included. calculations are for general information only. Actual terms of your loan may differ."
            );
          }}
        >
          <Image
            style={styles.infoButtonImage}
            source={require("../../../assets/image/Info.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderColorStripBasedOnValue({
    mortgageRate,
    principalInterest,
    propertyTaxes,
    hoaDues
  }) {
    return (
      <View style={styles.colorFullStrip}>
        <View
          style={{
            backgroundColor: "#65A0C0",
            width: this._getViewWidth(principalInterest, mortgageRate)
          }}
        />
        <View
          style={{
            backgroundColor: "#F58464",
            width: this._getViewWidth(propertyTaxes, mortgageRate)
          }}
        />
        <View
          style={{
            backgroundColor: "#67E79C",
            width: this._getViewWidth(hoaDues, mortgageRate)
          }}
        />
      </View>
    );
  }

  _separatorLine() {
    return <View style={styles.separatorLine} />;
  }

  _renderListForEstimatedMonthlyPayment(dataSource) {
    return (
      <FlatList
        style={styles.flatList}
        data={dataSource}
        ItemSeparatorComponent={this._separatorLine}
        renderItem={({ item }) => <MonthlyPaymentCell item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
  _renderCustomizeCalculations() {
    return (
      <TouchableOpacity
        style={styles.customizeCalculationTouchView}
        onPress={() => {
          //alert("open Calculator");
          this.props.calculatorPressAction();
        }}
      >
        <Image
          style={styles.customizeCalculationButtonImage}
          source={require("../../../assets/image/Calculatorgray.png")}
        />
        <Text style={styles.customizeCalculationButtonText}>
          {"Customize Calculations"}
        </Text>
      </TouchableOpacity>
    );
  }
  _getViewWidth(x, y) {
    return `${(x / y) * 100}%`;
  }

  render() {
    dataSource = [
      { key: "principalInterest", value: "$48,064", source: "" },
      {
        key: "propertyTaxes",
        value: "$2,510",
        source: "Country(Public) Records"
      },
      { key: "hoaDues", value: "$5,886", source: "" }
    ];
    return (
      <View style={styles.containerView}>
        {this._renderEstimateMonthlyPayment()}
        {this._renderMonthlyEMI()}
        {this._renderMonthlyInterestRate()}
        {this._renderColorStripBasedOnValue({
          mortgageRate: 56460,
          principalInterest: 48064,
          propertyTaxes: 2510,
          hoaDues: 5886
        })}
        {this._renderListForEstimatedMonthlyPayment(dataSource)}
        {this._renderCustomizeCalculations()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: "#FFFFFF",
    alignItems: "stretch",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5,
    justifyContent: "center"
  },
  estimateMonthlyPaymentView: {
    paddingHorizontal: 8,
    alignItems: "flex-start",
    marginBottom: 10,
    justifyContent: "center"
  },
  estimateMonthlyPaymentText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#363940"
  },
  monthlyEMIView: {
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center"
  },
  monthlyEMIText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#363940"
  },
  monthlyInterestRateView: {
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  monthlyInterestRateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888888"
  },
  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  infoButtonImage: {
    width: 20,
    height: 20,
    resizeMode: "cover"
  },
  colorFullStrip: {
    alignItems: "stretch",
    marginBottom: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
    height: 15
  },
  flatList: {
    flex: 1
  },
  separatorLine: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },
  monthlyPaymentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "column"
  },
  flatListCellContentView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  flatListCellKeyView: {
    width: "70%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  flatListCellKeyText: {
    marginLeft: 20,
    color: "#888888",
    fontWeight: "normal",
    fontSize: 16
  },
  circularColorView: {
    width: 16,
    height: 16,
    borderRadius: 8
  },
  flatListCellValueView: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  flatListCellValueText: {
    color: "#363940",
    fontWeight: "bold",
    fontSize: 16
  },
  sourceView: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 5
  },
  sourceText: {
    color: "#888888",
    fontWeight: "normal",
    fontSize: 13
  },
  customizeCalculationTouchView: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 12
  },
  customizeCalculationButtonImage: {
    width: 25,
    height: 30,
    marginLeft: 8,
    resizeMode: "cover"
  },
  customizeCalculationButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#706F74",
    marginLeft: 13
  }
});

export default MonthlyPaymentView;
