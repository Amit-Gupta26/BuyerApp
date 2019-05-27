import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { observer, inject } from "mobx-react";

const { width, height } = Dimensions.get("window");

class OnBoardingSearchScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      searchText: "Search by city, state, ZIP, school"
    };
  }

  _onInputTextChange = text => {
    console.log(text);
  };

  _onPressButton() {
    this.props.navigation.navigate("OnboardingPrice");
  }

  _fetchSuggestions() {
    this.props.navigation.navigate("SearchAutoSuggest", {
      onGoBack: (suggestionItem, type, isMlsSearch) =>
        this.onSuggestionClicked(suggestionItem, type, isMlsSearch),
      type: 'onboarding'
    });
  }

  onSuggestionClicked(suggestionItem, type, isMlsSearch) {
    if (type == null) {
      var searchText;
      if (suggestionItem.level1Text != "" && suggestionItem.level2Text != "") {
        searchText = suggestionItem.level1Text + ", " + suggestionItem.level2Text;
      } else {
        searchText = suggestionItem.level1Text;
      }
      this.setState({
        searchText: searchText,
        isInputText: true
      });
      const { searchStore } = this.props;
      const { onboardingStore } = this.props;
      if (isMlsSearch) {
        onboardingStore.setMlsSearchUrl(searchStore.searchUrl, searchStore.searchText);
        onboardingStore.searchTerm = searchText;
      } else {
        this.props.onboardingStore.fetchSearchUrl(suggestionItem);
      }
    } else {
      this.selectionType(type);
    }
    this.props.navigation.navigate("OnboardingPrice");
  }

  selectionType(type) {
    var selectionTitle = "";
    switch (type) {
      case "search_nearby":
        selectionTitle = "Search Near By Clicked";
        break;
      case "recent_search":
        selectionTitle = "Most Recent Search Clicked";
        break;
      case "saved_search":
        selectionTitle = "Saved Search Clicked";
        break;
      case "home_near":
        selectionTitle = "Home Near By Clicked";
        break;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const inputTextStyle = this.state.isInputText
      ? styles.inputText
      : styles.inputIntialText;
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
        <View style={styles.skipResultcontainer}>
          <View style={styles.skipResult}>
            <TouchableHighlight
              underlayColor="transparent"
              style={{ backgroundColor: "transparent" }}
              onPress={() => navigate("Home")}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.skipThisContainer}>Skip this</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.blankContainer} />
          <View style={styles.imageContainer}>
            <Image source={require("./../../assets/image/homeIcon.png")}
              style={styles.homeIcon} />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.whereText}>Where do you want to live?</Text>
          </View>
          <View style={styles.textfieldContainer}>
            <Text onPress={() => this._fetchSuggestions()} style={inputTextStyle}  
                  testID={"OnboardingSearchInputText"} nativeID={"OnboardingSearchInputText"}
                  accessibilityLabel={"OnboardingSearchInputText"}>{this.state.searchText}</Text>
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.locationTouch}
            onPress={() => {
              this._onPressButton();
            }}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Search my current location</Text>
              <View style={styles.locationIconContainer}>
                <Image source={require("./../../assets/image/locationIcon.png")} style={styles.locationIcon} />
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default inject("onboardingStore", "searchStore")(observer(OnBoardingSearchScreen));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#0B2B80"
  },
  skipResultcontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    height: 30
  },
  allContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: height - 30 - 20
  },
  blankContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: Platform.OS === 'ios' ? 40 : 80,
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
  labelContainer: {
    justifyContent: "center",
    width: "100%",
    height: 70
  },
  textfieldContainer: {
    justifyContent: "flex-start",
    width: width,
    padding: 5,
    height: 80
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 40
  },
  locationIconContainer: {
    justifyContent: "center",
    width: 30,
    height: 30
  },
  skipResult: {
    justifyContent: "center",
    width: 80,
    height: 30
  },
  inputIntialText: {
    backgroundColor: "white",
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: "Graphik-Medium",
    margin: 3,
    color: "#8C8E9B"
  },
  inputText: {
    backgroundColor: "white",
    fontFamily: "Graphik-Medium",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    margin: 3,
    color: "black"
  },
  whereText: {
    fontSize: 23,
    color: "white",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80",
    fontFamily: "Graphik-Medium"
  },
  skipThisContainer: {
    color: "white",
    fontSize: 12,
    textDecorationLine: "underline",
    textAlign: "center",
    backgroundColor: "transparent"
  },
  homeIcon: {
    height: 110,
    width: 180
  },
  locationTouch: {
    backgroundColor: "transparent",
    height: 40
  },
  locationText: {
    fontSize: 19,
    color: "white",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80",
    fontFamily: "Graphik-Medium"
  },
  locationIcon: {
    height: 20,
    width: 30,
    marginLeft: 5,
    marginBottom: Platform.OS === 'ios' ? 14 : 5
  }
});
