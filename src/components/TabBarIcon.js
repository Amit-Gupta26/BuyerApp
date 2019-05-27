import React from "react";
import { Image, StyleSheet, Platform } from "react-native";

const imageSize = Platform.OS === "ios" ? 20 : 16;
export const TabBarIocn = props => {
  const { image, tintColor } = props;
  return (
    <Image
      source= {image}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  );
};
export default TabBarIocn;
const styles = StyleSheet.create({
  icon: {
    height: imageSize,
    width: imageSize
  }
});
