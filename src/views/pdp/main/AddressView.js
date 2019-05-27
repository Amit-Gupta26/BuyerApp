import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";
import StringUtil from "../../../utils/StringUtil";

let stringUtilobj = new StringUtil();

class AddressView extends Component {
  state = {
    isFavoriteButtonTap: false
  };

  _renderOwnersEstimateView = () => {
    const { propertyId, globalPropertyId, ownerEstimatePrice } = this.props;
    return ownerEstimatePrice && ownerEstimatePrice !== 0 ? (
      <TouchableHighlight
        underlayColor="white"
        onPress={() =>
          Linking.openURL(
            `https://www.owners.com/diy/#/propertyAVMDetails?globalPropId=${globalPropertyId}&ownersPropId=${propertyId}&userType=buyer`
          )
        }
      >
        <Text style={styles.propertyEstimateText}>
          {`Owners.com Estimate: $${ownerEstimatePrice}`}
        </Text>
      </TouchableHighlight>
    ) : null;
  };
  render() {
    return (
      <View style={styles.addressView}>
        <View style={styles.favoriteContainerView}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              this.setState({
                isFavoriteButtonTap: !this.state.isFavoriteButtonTap
              });
            }}
          >
            <Image
              source={
                this.state.isFavoriteButtonTap
                  ? require("../../../assets/image/selected_Favorite.png")
                  : require("../../../assets/image/unselected_Favorite.png")
              }
              style={styles.favoriteImage}
              resizeMode={"stretch"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerView}>
          <Text style={styles.propertyPriceText}>${stringUtilobj.formatMoney(this.props.price)}</Text>
          <TouchableHighlight
            style={styles.mortgageCalculatorButton}
            onPress={() => {
              this.props.mortgageCalculatorPressAction();
            }}
            underlayColor="white"
          >
            <View style={styles.mortgageContentView}>
              <Image
                source={require("../../../assets/image/Calculator.png")}
                style={{ width: 12, height: 15 }}
              />
              <Text style={styles.mortgageCalculatorText}>
                {this.props.mortgageCalculatorText}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        {this._renderOwnersEstimateView()}
        <View style={styles.containerViewForPropertyDetailsAndAddress}>
          <View
            style={{
              alignSelf: "stretch",
              width: "80%"
            }}
          >
            <Text style={styles.propertyDetailsText}>
              {this.props.propertyDetails}
            </Text>
            <Text style={styles.propertyAddressText}>
              {this.props.propertyAddressText}
            </Text>
          </View>
          <TouchableHighlight
            style={[styles.containerViewForMap, { alignSelf: "stretch" }]}
            onPress={() => {
              alert("mapAction");
            }}
            underlayColor="white"
          >
            <Image
              source={require("../../../assets/image/map.png")}
              style={styles.mapImage}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressView: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1
  },

  favoriteContainerView: {
    marginTop: -25,
    height: 50,
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent"
  },
  favoriteButton: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 15,
    borderRadius: 25
  },
  favoriteImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  containerView: {
    marginVertical: 12,
    marginHorizontal: 10,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "flex-start"
  },
  propertyPriceText: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#303648"
  },
  mortgageCalculatorButton: {
    backgroundColor: "#8C8E9B",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 5,
    alignSelf: "stretch",
    padding: 5,
    marginVertical: 5
  },
  mortgageCalculatorText: {
    color: "white",
    paddingStart: 3,
    fontSize: 13,
    fontWeight: "normal"
  },
  propertyEstimateText: {
    fontSize: 12,
    marginVertical: 4,
    marginHorizontal: 10,
    marginBottom: 0,
    fontWeight: "bold",
    color: "#0B2B80",
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    textDecorationStyle: "solid"
  },
  containerViewForPropertyDetailsAndAddress: {
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  propertyDetailsText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#303648",
    alignSelf: "flex-start"
  },
  propertyAddressText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 4,
    color: "#303648",
    alignSelf: "flex-start"
  },
  containerViewForMap: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 3
  },
  mapImage: {
    width: 60,
    height: 60,
    borderRadius: 4
  },
  mortgageContentView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  }
});

export default AddressView;
