import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";

let { width } = Dimensions.get("window");

class OnBoardingSignInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { onboardingStore } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
        <View style={styles.skipResultcontainer}>
          <View style={styles.backToSearch}>
            <TouchableHighlight
              style={{ backgroundColor: "transparent" }}
              onPress={() => goBack()}
            >
              <View style={{ height: 30 }}>
                <Image
                  source={require("./../../assets/image/backArrow.png")}
                  style={{ height: 40, width: 50 }}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.skipResult}>
            <TouchableHighlight
              underlayColor="transparent"
              style={{ backgroundColor: "transparent" }}
              onPress={() => {
                this.props.onboardingStore.onSkip();
                navigate("Home")
              }}
            >
              <View style={{ justifyContent: "flex-end" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    marginRight: 4
                  }}
                >
                  See My Results
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.groupedContainer}>
            <View style={styles.blankContainer} />
            <View style={styles.imageContainer}>
              <Image
                source={require("./../../assets/image/starSign.png")}
                style={{ height: 100, width: 150 }}
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.textHeadingStyle}>
                Want to save this search?
              </Text>
              <Text style={styles.textSubHeadingStyle}>
                Sign in to save - It's that easy
              </Text>
            </View>
            <View style={styles.lineView} />

            {/* <TouchableHighlight
              underlayColor="transparent"
              style={styles.propertyTypeTouchable}
              onPress={() => {
                if (
                  onboardingStore.filterSummary ||
                  onboardingStore.searchTerm
                ) {
                  navigate("Home");
                }
              }}
            > */}
              <View style={styles.propertyTypeCell}>
                <View style={styles.propertyTextContainer}>
                  <Text style={styles.propertyTitleText}>
                    {onboardingStore.searchTerm}
                  </Text>
                  <View style={styles.spaceBetweenText} />
                  <Text style={styles.propertyTypeText}>
                    {onboardingStore.filterSummary}
                  </Text>
                </View>
              </View>
            {/* </TouchableHighlight> */}
            <View style={styles.lineView} />
          </View>
          <View style={styles.blankContainer} />
          <TouchableHighlight
            style={{ backgroundColor: "transparent", height: 50 }}
            underlayColor="transparent"
            onPress={() =>
              navigate("Register", {
                nextScreen: "OnBoardingSurvey",
                backScreen: "OnboardingSignin"
              })
            }
          >
            <View style={styles.nextContainer}>
              <Text style={styles.nextTextStyle}>Sign in to save</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}
export default inject("onboardingStore")(observer(OnBoardingSignInScreen));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#0B2B80"
  },
  skipResultcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 40
  },
  allContainer: {
    justifyContent: "flex-start",
    width: "100%",
    flex: 1
  },
  blankContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  groupedContainer: {
    justifyContent: "flex-start",
    width: "100%"
  },
  propertyTypeTouchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignItems: "stretch",
    margin: 5
  },
  propertyTypeCell: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  propertyTextContainer: {
    justifyContent: "flex-start",
    flex: 1,
    alignItems: "stretch",
    paddingVertical: 10
  },
  propertyTitleText: {
    width: "100%",
    color: "#7FF4FF",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20
  },
  propertyTypeText: {
    width: "100%",
    fontSize: 15,
    color: "white",
    paddingHorizontal: 10,
    alignContent: "center",
    textAlign: "center"
  },
  labelContainer: {
    justifyContent: "center",
    width: "100%",
    height: 85
  },
  textHeadingStyle: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: "#0B2B80"
  },
  textSubHeadingStyle: {
    fontSize: 13,
    color: "lightgrey",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80"
  },
  searchNameStyle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80"
  },
  textSubHeadingStyle: {
    fontSize: 13,
    color: "lightgrey",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80"
  },
  textfieldContainer: {
    justifyContent: "flex-start",
    width: width,
    padding: 5,
    height: 90
  },
  spaceBetweenText: {
    height: 5,
    width: "100%"
  },
  lineView: {
    backgroundColor: "#193D8B",
    width: "95%",
    height: 2,
    marginLeft: 10,
    justifyContent: "center"
  },
  input: {
    margin: 3,
    height: 45,
    padding: 8,
    borderColor: "#8C8E9B",
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 2,
    fontWeight: "bold"
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 40
  },
  nextContainer: {
    justifyContent: "center",
    backgroundColor: "#7FF4FF",
    flex: 1,
    margin: 5
  },
  nextTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    textAlign: "center",
    backgroundColor: "#7FF4FF"
  },
  skipResult: {
    justifyContent: "center",
    width: 100,
    height: 40
  },
  backToSearch: {
    width: 40,
    height: 40
  }
});
