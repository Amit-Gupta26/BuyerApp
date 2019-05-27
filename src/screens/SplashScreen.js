import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { onVisitedOnboarding, hasVisitedOnboarding } from "../data/local";

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      hasVisitedOnboarding()
        .then(seen => {
          if (seen) {
            this.props.navigation.navigate("Home");
          } else {
            onVisitedOnboarding()
              .then(() => console.log("success"))
              .catch(error => console.log("error"));
            this.props.navigation.navigate("Onboarding");
          }
        })
        .catch(error => console.log("error while checking"));
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/image/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  logo: {
    height: "10%",
    width: "50%"
  }
});
