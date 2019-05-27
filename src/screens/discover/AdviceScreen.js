import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  WebView,
  ActivityIndicator
} from "react-native";

class AdviceScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title", ""),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: { backgroundColor: "white" },
    headerTintColor: "#1F47AF"
  });

  ActivityIndicatorView() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1F47AF" />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <WebView
            source={{ uri: this.props.navigation.getParam("url", "") }}
            style={{ marginTop: 0 }}
            renderLoading={this.ActivityIndicatorView}
            startInLoadingState={true}
            javaScriptEnabled={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default AdviceScreen;

const styles = StyleSheet.create({
  container: {
    height: 700,
    justifyContent: "space-around"
  }
});
