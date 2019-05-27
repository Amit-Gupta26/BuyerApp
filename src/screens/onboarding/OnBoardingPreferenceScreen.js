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
  Dimensions,
  BackHandler
} from "react-native";

const { width } = Dimensions.get("window");

class PreferenceItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title);
  };

  render() {
    const backgrountColor = this.props.selected ? "#69F6EE" : "#5FA3BF";
    const titleColor = this.props.selected ? "#0B2B80" : "white";

    return (
      <View style={styles.gridCell}>
        <TouchableHighlight
          style={styles.gridCell}
          underlayColor="transparent"
          onPress={this._onPress}
        >
          <View
            style={{
              justifyContent: "center",
              backgroundColor: backgrountColor,
              margin: 3,
              borderRadius: 23,
              flex: 1
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 11,
                color: titleColor,
                textAlign: "center"
              }}
            >
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class OnBoardingPreferenceScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selected: new Map(),
    prefrences: []
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onboardingStore.updatePreferences(null);
    this.props.navigation.goBack();
    return true;
  };

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = item => {
    this.props.onboardingStore.updatePreferences(item.id);

    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(item.title, !selected.get(item.title)); // toggle
      return { selected };
    });
  };

  nextClicked() {
    this.props.onboardingStore.applyMatchRank(true);
    this.props.navigation.navigate("OnboardingSignin");
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    var row1 = [
      { title: "Pool", id: "pl" },
      { title: "Waterfront", id: "wt" },
      { title: "Hardwoods", id: "fh" }
    ];
    var row2 = [
      { title: "Swim/Tennis", id: "pc,ts" },
      { title: "Garage", id: "ge" },
      { title: "Views", id: "vs" }
    ];
    var row3 = [
      { title: "Fenced Yard", id: "fy" },
      { title: "Fixer Upper", id: "fu" },
      { title: "Master on Main", id: "mfm" }
    ];
    var row4 = [
      { title: "Basement", id: "bt" },
      { title: "Fireplace", id: "fe" },
      { title: "Updated Kitchen", id: "ku" }
    ];
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
        <View style={styles.skipResultcontainer}>
          <View style={styles.backToSearch}>
            <TouchableHighlight
              style={{ backgroundColor: "transparent" }}
              onPress={() => {
                goBack();
                this.props.onboardingStore.applyMatchRank(false);
                this.props.onboardingStore.updatePreferences(null);
              }}
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
              onPress={() => {
                this.props.onboardingStore.onSkip();
                navigate("Home");
              }}
            >
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    textDecorationLine: "underline",
                    textAlign: "center",
                    backgroundColor: "transparent"
                  }}
                >
                  Skip this
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.groupedContainer}>
            <View style={styles.blankContainer} />
            <View style={styles.imageContainer} />
            <View style={styles.labelContainer}>
              <Text style={styles.textHeadingStyle}>
                Select some features that are important to you
              </Text>
              <Text style={styles.textSubHeadingStyle}>
                This won't hide any properties, but will highlight your best
                matches. You can add more preferences later
              </Text>
            </View>
            <View style={styles.textfieldContainer}>
              <View style={styles.gridHolder}>
                <View style={styles.gridCell}>
                  {row1.map((item, index) => {
                    {
                      return (
                        <PreferenceItem
                          key={index}
                          style={styles.gridHolder}
                          id={item.title}
                          onPressItem={() => this._onPressItem(item)}
                          selected={!!this.state.selected.get(item.title)}
                          title={item.title}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </View>
            <View style={styles.textfieldContainer}>
              <View style={styles.gridHolder}>
                <View style={styles.gridCell}>
                  {row2.map((item, index) => {
                    {
                      return (
                        <PreferenceItem
                          key={index}
                          style={styles.gridHolder}
                          id={item.title}
                          onPressItem={() => this._onPressItem(item)}
                          selected={!!this.state.selected.get(item.title)}
                          title={item.title}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </View>
            <View style={styles.textfieldContainer}>
              <View style={styles.gridHolder}>
                <View style={styles.gridCell}>
                  {row3.map((item, index) => {
                    {
                      return (
                        <PreferenceItem
                          key={index}
                          style={styles.gridHolder}
                          id={item.title}
                          onPressItem={() => this._onPressItem(item)}
                          selected={!!this.state.selected.get(item.title)}
                          title={item.title}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </View>
            <View style={styles.textfieldContainer}>
              <View style={styles.gridHolder}>
                <View style={styles.gridCell}>
                  {row4.map((item, index) => {
                    {
                      return (
                        <PreferenceItem
                          key={index}
                          style={styles.gridHolder}
                          id={item.title}
                          onPressItem={() => this._onPressItem(item)}
                          selected={!!this.state.selected.get(item.title)}
                          title={item.title}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </View>
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            style={styles.nextButtonStyle}
            onPress={() => this.nextClicked()}
          >
            <View style={styles.nextContainer}>
              <Text style={styles.nextTextStyle}>Next</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default inject("onboardingStore")(observer(OnBoardingPreferenceScreen));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#0B2B80"
  },
  nextButtonStyle: {
    backgroundColor: "transparent",
    height: 50,
    bottom: 5
  },
  skipResultcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 40
  },
  allContainer: {
    justifyContent: "space-between",
    width: "100%",
    flex: 1
  },
  groupedContainer: {
    justifyContent: "flex-start",
    width: "100%"
  },
  blankContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 30,
    justifyContent: "center"
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  labelContainer: {
    justifyContent: "space-evenly",
    width: "100%",
    height: 100
  },
  textfieldContainer: {
    justifyContent: "center",
    top: 40,
    width: width,
    padding: 4,
    height: 46
  },
  gridHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    fontSize: 10.5
  },
  gridCell: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row"
  },
  grid: {
    justifyContent: "center",
    backgroundColor: "#60A2BE",
    margin: 3,
    borderRadius: 23,
    flex: 1
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  textHeadingStyle: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20
  },
  textSubHeadingStyle: {
    fontSize: 11,
    color: "lightgrey",
    alignContent: "center",
    textAlign: "center",
    backgroundColor: "#0B2B80",
    top: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30
  },
  nextContainer: {
    justifyContent: "center",
    backgroundColor: "#7FF4FF",
    flex: 1,
    margin: 5
  },
  locationIconContainer: {
    justifyContent: "center",
    backgroundColor: "lightgrey",
    width: 30,
    height: 30
  },
  skipResult: {
    justifyContent: "center",
    width: 80,
    height: 40
  },
  preferenceTextStyle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "white",
    textAlign: "center"
  },

  nextTextStyle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    textAlign: "center",
    backgroundColor: "#7FF4FF"
  },
  backToSearch: {
    backgroundColor: "transparent",
    width: 40,
    height: 40
  }
});
