import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

class ActivityLoader extends Component {
  render() {
    return (
      <ActivityIndicator style={styles.progress} size="large" color="#1F47AF" />
    );
  }
}
export default ActivityLoader;

const styles = StyleSheet.create({
  progress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  }
});
