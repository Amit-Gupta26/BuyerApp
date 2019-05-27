import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ImageTitleDescriptionCell from "./ImageTitleDescriptionCell";

class CommuteCell extends Component {
  render() {
    const { onPressAction, imagePath, title, description } = this.props;
    return (
      <View style={[styles.containerView]}>
        <View style={styles.commuteView}>
          <ImageTitleDescriptionCell
            onPressAction={onPressAction}
            imagePath={imagePath}
            title={title}
            description={description}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    alignItems: "stretch",
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 2,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  commuteView: {
    marginTop: 10,
    shadowColor: "#706F74",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderTopColor: "lightgray",
    borderTopWidth: 1
  }
});
export default CommuteCell;
