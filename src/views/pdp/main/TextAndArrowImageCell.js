import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";

class TextAndArrowImageCell extends Component {
  _renderSeparatorLine() {
    return <View style={styles.separatorLine} />;
  }
  render() {
    const { text, onPressAction } = this.props;
    return (
      <TouchableOpacity
        style={styles.touchView}
        onPress={() => onPressAction()}
      >
        {this._renderSeparatorLine()}
        <View style={styles.containerView}>
          <View style={styles.textView}>
            <Text style={styles.text}>{text}</Text>
          </View>

          <View style={styles.imgView}>
            <Image
              style={styles.rightArrow}
              source={require("../../../assets/image/Arrow_Blue.png")}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchView: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%"
  },
  containerView: {
    flexDirection: "row",
    width: "100%",
    height: 60
  },
  textView: {
    width: "85%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  text: {
    color: "#062B7D",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8
  },
  imgView: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  rightArrow: {
    width: 10,
    height: 15,
    resizeMode: "cover"
  },
  separatorLine: {
    height: 1,
    width: "95%",
    backgroundColor: "#CED0CE",
    marginLeft: "5%"
  }
});

export default TextAndArrowImageCell;
