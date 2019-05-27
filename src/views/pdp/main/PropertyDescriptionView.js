import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";

class PropertyDescriptionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadMoreTap: false
    };
  }
  render() {
    if (this.props.description === "") {
      return null;
    }
    return (
      <TouchableHighlight
        style={styles.readMoreAndLessView}
        underlayColor="white"
        onPress={() => {
          this.setState({ isReadMoreTap: !this.state.isReadMoreTap });
        }}
      >
        <View style={styles.containerView}>
          <Text
            style={styles.descriptionText}
            numberOfLines={this.state.isReadMoreTap ? 0 : 2}
          >
            {this.props.description}
          </Text>
          <View style={styles.readMoreContainerView}>
            <Text style={styles.readMoreText}>
              {this.state.isReadMoreTap ? "Read Less" : "Read More"}
            </Text>
            <Image
              source={
                this.state.isReadMoreTap
                  ? require("../../../assets/image/upArrow.png")
                  : require("../../../assets/image/downArrow.png")
              }
              style={styles.downArrowImage}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default PropertyDescriptionView;

const styles = StyleSheet.create({
  readMoreAndLessView: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0
  },
  containerView: {
    marginVertical: 12,
    marginHorizontal: 14,
    alignSelf: "stretch",
    justifyContent: "flex-start"
  },
  descriptionText: {
    color: "#303648",
    fontWeight: "normal",
    fontSize: 13,
    alignSelf: "stretch"
  },
  readMoreContainerView: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "stretch"
  },
  readMoreText: {
    color: "#0B2B80",
    fontWeight: "bold",
    fontSize: 16
  },
  downArrowImage: {
    width: 15,
    height: 10,
    marginHorizontal: 10,
    marginTop: 3
  }
});
