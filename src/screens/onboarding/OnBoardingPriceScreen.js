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
  Picker,
  Platform,
  BackHandler
} from "react-native";
import { priceMinData, priceMaxData } from "../../data/PriceFilterData";

const { width } = Dimensions.get("window");

class OnBoardingPriceScreen extends Component {
  static navigationOptions = {
    header: null
  };

  minRealvalue = "0";
  maxRealValue = "9000001"
  isMaxSelected = false
  isMinSelected = false

  constructor() {
    super();
    this.state = {
      viewSection: false,
      minSection: false,
      maxSection: false,
      minPickerSelection: "No Min",
      maxPickerSelection: "No Max",
      minValueToUpdate: "No Min",
      maxValueToUpdate: "No Max",
      minPriceForAndroid: priceMinData,
      maxPriceForAndroid: priceMaxData
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onboardingStore.updatePriceRange(0, 900001, null);
    this.props.navigation.goBack();
    return true;
  };

  _updateFilter = () => {
    if (Platform.OS === "ios") {
      this.updateMinMaxrealValue(this.state.minPickerSelection, this.state.maxPickerSelection)
    }
    this.props.onboardingStore.updatePriceRange(this.minRealvalue, this.maxRealValue,
      `${this.state.minPickerSelection} - ${this.state.maxPickerSelection}`
    );
  };

  updateMinMaxrealValue(minvalue, maxvalue) {
    for (let i = 0; i <= priceMinData.length; i++) {
      let tempObject = priceMinData[i];
      if (tempObject.value == minvalue) {
        this.minRealvalue = tempObject.id;
        break;
      }
    }

    for (let i = 0; i <= priceMaxData.length; i++) {
      let tempObject = priceMaxData[i];
      if (tempObject.value == maxvalue) {
        this.maxRealValue = tempObject.id;
        break;
      }
    }
  }

  _minButtonClicked() {
    this.setState({
      maxSection: false,
      minSection: true
    });

    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= priceMinData.length; i++) {
      let tempObject = priceMinData[i];
      if (tempObject.value == this.state.minPickerSelection) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= priceMaxData.length; i++) {
      let tempObject = priceMaxData[i];
      if (tempObject.value == this.state.maxPickerSelection) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (minIndex == 0) {
        this.setState({
          minPickerSelection: priceMinData[minIndex].value
        });
      } else if (maxIndex != 0) {
        this.setState({
          minPickerSelection: priceMinData[maxIndex - 1].value
        });
      }
    }
  }
  _updateMinValueClicked() {
    this.setState({
      minSection: false,
      minValueToUpdate: this.state.minPickerSelection
    });
    this._updateFilter();
  }

  _maxButtonClicked() {
    this.setState({
      minSection: false,
      maxSection: true
    });

    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= priceMinData.length; i++) {
      let tempObject = priceMinData[i];
      if (tempObject.value == this.state.minPickerSelection) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= priceMaxData.length; i++) {
      let tempObject = priceMaxData[i];
      if (tempObject.value == this.state.maxPickerSelection) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (maxIndex == 0) {
        this.setState({
          maxPickerSelection: priceMaxData[maxIndex].value
        });
      } else if (minIndex == priceMinData.length - 1) {
        this.setState({
          maxPickerSelection: "No Max"
        });
      } else if (minIndex != 0) {
        this.setState({
          maxPickerSelection: priceMaxData[minIndex + 1].value
        });
      }
    }
  }

  _updateMaxValueClicked() {
    this.setState({
      maxSection: false,
      maxValueToUpdate: this.state.maxPickerSelection
    });
    this._updateFilter();
  }

  ristrictMinvalue(itemValue) {
    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= priceMinData.length; i++) {
      let tempObject = priceMinData[i];
      if (tempObject.value == itemValue) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= priceMaxData.length; i++) {
      let tempObject = priceMaxData[i];
      if (tempObject.value == this.state.maxPickerSelection) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (minIndex == 0) {
        this.setState({
          minPickerSelection: itemValue
        });
      } else if (maxIndex != 0) {
        this.setState({
          minPickerSelection: priceMinData[maxIndex - 1].value
        });
      } else {
        this.setState({
          minPickerSelection: itemValue
        });
      }
    } else {
      this.setState({
        minPickerSelection: itemValue
      });
    }
  }

  ristrictMaxvalue(itemValue) {
    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= priceMinData.length; i++) {
      let tempObject = priceMinData[i];
      if (tempObject.value == this.state.minPickerSelection) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= priceMaxData.length; i++) {
      let tempObject = priceMaxData[i];
      if (tempObject.value == itemValue) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (maxIndex == 0) {
        this.setState({
          maxPickerSelection: itemValue
        });
      } else if (minIndex == priceMinData.length - 1) {
        this.setState({
          maxPickerSelection: "No Max"
        });
      } else if (minIndex != 0) {
        this.setState({
          maxPickerSelection: priceMaxData[minIndex + 1].value
        });
      } else {
        this.setState({
          maxPickerSelection: itemValue
        });
      }
    } else {
      this.setState({
        maxPickerSelection: itemValue
      });
    }
  }

  renderBottomComponent() {
    if (this.state.minSection) {
      return (
        <View style={styles.iosPickerTop}>
          <View style={styles.doneTopView}>
            <TouchableHighlight
              style={styles.doneTouchableTop}
              underlayColor="transparent"
              onPress={() => this._updateMinValueClicked()}
            >
              <View style={styles.doneView}>
                <Text style={styles.doneButton}>Done</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={this.state.minPickerSelection}
            style={{ flex: 1 }}
            onValueChange={(itemValue, itemIndex) =>
              // this.setState({ minPickerSelection: itemValue })
              this.ristrictMinvalue(itemValue)
            }
          >
            {priceMinData.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      );
    }

    if (this.state.maxSection) {
      return (
        <View style={styles.iosPickerTop}>
          <View style={styles.doneTopView}>
            <TouchableHighlight
              style={styles.doneTouchableTop}
              underlayColor="transparent"
              onPress={() => this._updateMaxValueClicked()}
            >
              <View style={styles.doneView}>
                <Text style={styles.doneButton}>Done</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Picker
            selectedValue={this.state.maxPickerSelection}
            style={{ flex: 1 }}
            onValueChange={(itemValue, itemIndex) =>
              // this.setState({ maxPickerSelection: itemValue })
              this.ristrictMaxvalue(itemValue)
            }
          >
            {priceMaxData.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      );
    }
  }

  _updateMinValueLogic() {
    const textView = (
      <Text style={styles.minMaxText}>Min {this.state.minValueToUpdate}</Text>
    );
    return textView;
  }

  _updateMaxValueLogic() {
    const textView = (
      <Text style={styles.minMaxText}>Max {this.state.maxValueToUpdate}</Text>
    );
    return textView;
  }

  nextClicked() {
    var minValue = "";
    var maxValue = "";

    if (this.state.minValueToUpdate == "No Min") {
      minValue = "0";
    } else {
      minValue = this.state.minValueToUpdate;
    }

    if (this.state.maxValueToUpdate == "No Max") {
      maxValue = "9000001";
    } else {
      maxValue = this.state.maxValueToUpdate;
    }

    if (Platform.OS === "ios") {
      this.props.onboardingStore.updatePriceRange(this.minRealvalue, this.maxRealValue, minValue + "-" + maxValue);
    }
    else {
      this.props.onboardingStore.updatePriceRange(this.minRealvalue, this.maxRealValue,
        `${this.state.minPickerSelection} - ${this.state.maxPickerSelection}`
      );
    }

    this.props.navigation.navigate("OnboardingOtherFilter")
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
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
                  style={{ height: 40, width: 50, resizeMode: "contain" }}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.skipResult}>
            <TouchableHighlight
              style={{ backgroundColor: "transparent" }}
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
          <View backgroundColor="transparent">
            <View style={styles.blankContainer} />
            <View style={styles.imageContainer}>
              <Image
                source={require("./../../assets/image/piggybankIcon.png")}
                style={styles.piggyImageStyle}
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.textHeadingStyle}>
                What's your price range?
              </Text>
              <Text style={styles.textSubHeadingStyle}>
                Don't worry - you can change this later
              </Text>
            </View>
            <View style={styles.mainMinMaxContainer}>
              <View style={styles.minMaxContainer}>
                <View style={styles.lineView} />
                <View style={styles.minMaxView}>
                  {this.renderMinComponent()}
                  <View style={styles.minMaxMidContainer}>
                    <View style={styles.minMaxMidLine} />
                  </View>
                  {this.renderMaxComponent()}
                </View>
                <View style={styles.lineView} />
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
          {this.renderBottomComponent()}
        </View>
      </SafeAreaView>
    );
  }

  renderMinComponent() {
    if (Platform.OS === "ios") {
      return (
        <TouchableHighlight
          style={styles.minMax}
          underlayColor="transparent"
          onPress={() => this._minButtonClicked()}
        >
          <View style={styles.minMax}>{this._updateMinValueLogic()}</View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={styles.minMaxViewAndroid}>
          <Text style={styles.minMaxTextAndroid}>Min </Text>
          <Picker
            style={styles.mainPicker}
            selectedValue={this.state.minPickerSelection}
            onValueChange={(itemValue, itemIndex) => {
              isMinSelected = true;
              if (this.isMaxSelected == false) {
                this.minRealvalue = this.state.minPriceForAndroid[itemIndex].id;
                this._updateFilter();
                this.setState({
                  minPickerSelection: itemValue
                });
                this.refreshMinDataForAndroid(itemValue);
              }
              this.isMaxSelected = false;
            }}
          >
            {this.state.minPriceForAndroid.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      );
    }
  }

  renderMaxComponent() {
    if (Platform.OS === "ios") {
      return (
        <TouchableHighlight
          style={styles.minMax}
          underlayColor="transparent"
          onPress={() => this._maxButtonClicked()}
        >
          <View style={styles.minMax}>{this._updateMaxValueLogic()}</View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={styles.minMaxViewAndroid}>
          <Text style={styles.minMaxTextAndroid}>Max </Text>
          <Picker
            style={styles.mainPicker}
            selectedValue={this.state.maxPickerSelection}
            onValueChange={(itemValue, itemIndex) => {
              this.isMaxSelected = true;
              this.maxRealValue = this.state.maxPriceForAndroid[itemIndex].id;
              this._updateFilter();
              this.setState({
                maxPickerSelection: itemValue
              });
              this.refreshMaxDataForAndroid(itemValue);
            }}
          >
            {this.state.maxPriceForAndroid.map((item, index) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={index}
                />
              );
            })}
          </Picker>
        </View>
      );
    }
  }

  refreshMinDataForAndroid(itemValue) {
    if (itemValue.localeCompare("No Min") == 0) {
      this.setState({
        maxPriceForAndroid: priceMaxData
      })
    }
    else {
      maxIndex = 0;
      for (let i = 0; i < priceMaxData.length; i++) {
        let value = priceMaxData[i]
        if (value['value'].localeCompare(itemValue) == 0) {
          maxIndex = i;
          break
        }
      }

      var noMaxData = [
        {
            id:'9000001',
            value:'No Max',
            label: 'No Max'
        }
      ]
      tempArray = [];
      tempArray = noMaxData.concat(priceMaxData.slice(maxIndex + 1, priceMaxData.length + 1));
      this.setState({
        maxPriceForAndroid: tempArray
      })
    }
  }

  refreshMaxDataForAndroid(itemValue) {
    if (itemValue.localeCompare("No Max") == 0) {
      this.setState({
        minPriceForAndroid: priceMinData
      })
    }
    else {
      minIndex = 0;
      for (let i = 0; i < priceMinData.length; i++) {
        let value = priceMinData[i]
        if (value['value'].localeCompare(itemValue) == 0) {
          minIndex = i;
          break
        }
      }
      this.setState({
        minPriceForAndroid: priceMinData.slice(0, minIndex)
      })
    }
  }
}




export default inject("onboardingStore")(observer(OnBoardingPriceScreen));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#0B2B80"
  },
  iosPickerTop: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0
  },
  doneTopView: {
    backgroundColor: "#507BA8",
    width: "100%",
    height: 44,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
  },
  doneTouchableTop: {
    backgroundColor: "transparent",
    width: 100,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  doneView: {
    backgroundColor: "transparent",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
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
  blankContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 40,
    justifyContent: "center"
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  labelContainer: {
    justifyContent: "space-evenly",
    width: "100%",
    height: 55
  },
  textHeadingStyle: {
    fontSize: 23,
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
  mainMinMaxContainer: {
    justifyContent: "flex-end",
    width: width,
    height: "27%"
  },
  minMaxContainer: {
    width: "100%",
    flex: 0.7,
    justifyContent: "space-around"
  },
  lineView: {
    backgroundColor: "#1C3A86",
    width: "100%",
    height: 2,
    justifyContent: "center"
  },
  minMaxView: {
    flexDirection: "row",
    width: "100%",
    flex: 0.8,
    justifyContent: "space-evenly"
  },
  minMax: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  minMaxViewAndroid: {
    flex: 0.4,
    justifyContent: "center",
    // alignItems: "center"
  },
  minMaxText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Graphik-Regular"
  },
  minMaxTextAndroid: {
    fontSize: 18,
    color: "white",
    fontFamily: "Graphik-Regular"
  },
  doneButton: {
    fontSize: 20,
    color: "white",
    fontWeight: "normal",
    justifyContent: "center",
    alignItems: "center"
  },
  minMaxMidContainer: {
    width: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  minMaxMidLine: {
    backgroundColor: "#1C3A86",
    width: 2,
    height: "90%",
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
  nextContainer: {
    justifyContent: "center",
    backgroundColor: "#7FF4FF",
    flex: 1,
    margin: 5,
    left: 5,
    width: width - 20
  },
  locationIconContainer: {
    justifyContent: "center",
    width: 30,
    height: 30
  },
  skipResult: {
    justifyContent: "center",
    width: 80,
    height: 40
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
  },
  mainPicker: {
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
    bottom: 5,
    left: 80,
    right: 0,
    height: 45,
    color: "white"
  },
  nextButtonStyle: {
    backgroundColor: "transparent",
    height: 50,
    bottom: 5
  },
  piggyImageStyle: {
    height: 100,
    width: 150,
    resizeMode: "contain"
  }
});
