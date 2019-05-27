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
  Alert,
  BackHandler,
  TouchableOpacity
} from "react-native";

const { width } = Dimensions.get("window");
const exact_deselect = './../../assets/image/Exact-DeSelected-1.png';
const exact_select = './../../assets/image/Property-Selection-1.png';

class BedItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title);
  };

  render() {
    const titleColor = this.props.selectedBed ? "#78F3FC" : "grey";
    const fontWeight = this.props.selectedBed ? "bold" : "600";

    return (
      <View style={styles.bedBathViewroot}>
        <View style={styles.bedBathView}>
          <TouchableHighlight
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              height: 40
            }}
            underlayColor="transparent"
            onPress={this._onPress}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  color: titleColor,
                  fontWeight: fontWeight,
                  fontSize: 16
                }}
              >
                {this.props.title}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.minMaxMidContainer}>
          <View style={styles.minMaxMidLine} />
        </View>
      </View>
    );
  }
}

class BathItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title);
  };

  render() {
    const titleColor = this.props.selectedBath ? "#78F3FC" : "grey";
    const fontWeight = this.props.selectedBath ? "bold" : "600";

    return (
      <View style={styles.bedBathViewroot}>
        <View style={styles.bedBathView}>
          <TouchableHighlight
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              height: 40
            }}
            underlayColor="transparent"
            onPress={this._onPress}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  color: titleColor,
                  fontWeight: fontWeight,
                  fontSize: 16
                }}
              >
                {this.props.title}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.minMaxMidContainer}>
          <View style={styles.minMaxMidLine} />
        </View>
      </View>
    );
  }
}

class OnBoardingOtherFiltersScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    selectedBed: new Map(),
    selectedBath: new Map(),
    bedValue: "",
    bathValue: "",
    bedUpdatedValue: "",
    bathUpdatedValue: "",
    propTypeArray: [],
    propTypeDisplayText: "All",
    bathsExact: false,
    bedsExact: false

  };
  _keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onboardingStore.updateBeds(null);
    this.props.onboardingStore.updateBaths(null);
    this.props.navigation.goBack();
    return true;
  };

  _onPressBedItem = item => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      var selectedBed = new Map();
      if (this.state.bedValue != item.title) {
        selectedBed.set(item.title, !selectedBed.get(item.title)); // toggle
      } else {
        selectedBed.set(item.title, false); // toggle
      }
      return { selectedBed };
    });

    if (this.state.bedValue != item.title) {
      this.setState({
        bedUpdatedValue: item.id,
        bedValue: item.title
      });
    } else {
      this.setState({
        bedUpdatedValue: "",
        bedValue: ""
      });
    }
  };
  _onPressBathItem = item => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      var selectedBath = new Map();
      if (this.state.bathValue != item.title) {
        selectedBath.set(item.title, !selectedBath.get(item.title)); // toggle
      } else {
        selectedBath.set(item.title, false); // toggle
      }
      return { selectedBath };
    });
    if (this.state.bathValue != item.title) {
      this.setState({
        bathUpdatedValue: item.id,
        bathValue: item.title
      });
    } else {
      this.setState({
        bathUpdatedValue: "",
        bathValue: ""
      });
    }
  };

  constructor(props) {
    super(props);
    var name1 = ["Studio+"];
  }

  _onPressButton() {
    this.props.navigation.navigate("PropertyTypeSelView", {
      onGoBack: (localPropArray, propertyTypeValue, propertyType) =>
        this.refreshView(localPropArray, propertyTypeValue, propertyType),
      propTypeArray: this.state.propTypeArray,
      propTypeDisplayText: this.state.propTypeDisplayText
    });
  }

  refreshView(localPropArray, propertyTypeValue, propertyType) {
    this.setState({
      propTypeArray: localPropArray,
      propTypeDisplayText: propertyTypeValue
    });
  }

  renderBedBathViews(bedBath = "") {
    var bedOptions = ["Studio+", "1+", "2+", "3+", "4+", "5+"];
    var bathOptions = ["1+", "2+", "3+", "4+", "5+"];

    return (
      <View style={styles.bedBathView}>
        <TouchableHighlight
          style={{
            backgroundColor: "#0B2B80",
            justifyContent: "center",
            alignItems: "center",
            height: 40
          }}
          underlayColor="transparent"
          onPress={() => Alert.alert(bedBath)}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text style={{ alignItems: "center", color: "white" }}>
              {bedBath}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _extractValueForPropertyType() {
    let selectedValueList = this.props.navigation.getParam(
      "selectedPropertyTypes",
      ["All"]
    );
    if (selectedValueList.length > 1) {
      return selectedValueList.join(", ");
    } else {
      return selectedValueList;
    }
  }

  nextClicked() {
    this.props.onboardingStore.updateBaths(this.state.bathUpdatedValue);
    this.props.onboardingStore.updateBeds(this.state.bedUpdatedValue);
    this.props.onboardingStore.updatePopertyTypes(
      this.state.propTypeArray.length == 0 ? null : this.state.propTypeArray,
      this.state.propTypeDisplayText
    );
    this.props.navigation.navigate("OnboardingPreference");
  }

  bedsMainItem() {
    var bedOptions = [
      { title: "Studio+", id: "0" },
      { title: "1+", id: "1" },
      { title: "2+", id: "2" },
      { title: "3+", id: "3" },
      { title: "4+", id: "4" },
      { title: "5+", id: "5" }
    ];
    var bedExactOptions = [
      { title: "Studio", id: "0e" },
      { title: "1", id: "1e" },
      { title: "2", id: "2e" },
      { title: "3", id: "3e" },
      { title: "4", id: "4e" },
      { title: "5", id: "5e" }
    ];

    if (this.state.bedsExact == true) {
      return (
        <View style={styles.bedContainer}>
          {bedExactOptions.map((item, index) => {
            {
              return (
                <BedItem
                  key={index}
                  style={styles.bedBathView}
                  id={item.title}
                  onPressItem={() => this._onPressBedItem(item)}
                  selectedBed={!!this.state.selectedBed.get(item.title)}
                  title={item.title}
                />
              );
            }
          })}
        </View>
      );
    }
    else {
      return (
        <View style={styles.bedContainer}>
          {bedOptions.map((item, index) => {
            {
              return (
                <BedItem
                  key={index}
                  style={styles.bedBathView}
                  id={item.title}
                  onPressItem={() => this._onPressBedItem(item)}
                  selectedBed={!!this.state.selectedBed.get(item.title)}
                  title={item.title}
                />
              );
            }
          })}
        </View>
      );
    }
  }

  renderBeds() {

    return (
      < View style={styles.bedBathCell} >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.propertyTitleText}>Beds</Text>
          <View style={styles.exactView}>
            <TouchableOpacity style={styles.exactTouchable} onPress={() => {

              let bedValueTemp = this.state.bedValue;
              this.setState(state => {
                var selectedBed = new Map();
                selectedBed.set(bedValueTemp, false); // toggle
                return { selectedBed };
              });
              this.setState({
                bedUpdatedValue: "",
                bedValue: ""
              })
              let value = false
              if (this.state.bedsExact == true) {
                value = false
              }
              else {
                value = true
              }
              this.setState({
                bedsExact: value
              })
            }} >
              <Text style={styles.exactLabelText}>Exact
              </Text>
              <Image style={styles.exactImageStyle}
                source={this.state.bedsExact ? require(exact_select) : require(exact_deselect)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceBetweenText} />
        </View>
        {this.bedsMainItem()}
      </View >
    );
  }

  bathsMainItem() {
    var bathOptions = [
      { title: "1+", id: "1" },
      { title: "2+", id: "2" },
      { title: "3+", id: "3" },
      { title: "4+", id: "4" },
      { title: "5+", id: "5" }
    ];
    var bathExactOptions = [
      { title: "1", id: "1e" },
      { title: "2", id: "2e" },
      { title: "3", id: "3e" },
      { title: "4", id: "4e" },
      { title: "5", id: "5e" }
    ];

    if (this.state.bathsExact == true) {
      return (
        <View style={styles.bedContainer}>
          {bathExactOptions.map((item, index) => {
            {
              return (
                <BathItem
                  key={index}
                  style={styles.bedBathView}
                  id={item.title}
                  onPressItem={() => this._onPressBathItem(item)}
                  selectedBath={!!this.state.selectedBath.get(item.title)}
                  title={item.title}
                />
              );
            }
          })}
        </View>
      );
    }
    else {
      return (
        <View style={styles.bedContainer}>
          {bathOptions.map((item, index) => {
            {
              return (
                <BathItem
                  key={index}
                  style={styles.bedBathView}
                  id={item.title}
                  onPressItem={() => this._onPressBathItem(item)}
                  selectedBath={!!this.state.selectedBath.get(item.title)}
                  title={item.title}
                />
              );
            }
          })}
        </View>
      );
    }
  }

  renderBaths() {
    return (
      <View style={styles.bedBathCell}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.propertyTitleText}>Baths</Text>
          <View style={styles.exactView}>
            <TouchableOpacity style={styles.exactTouchable} onPress={() => {
              let bathValueTemp = this.state.bathValue;

              this.setState(state => {
                // copy the map rather than modifying state.
                var selectedBath = new Map();
                selectedBath.set(bathValueTemp, false); // toggle
                return { selectedBath };
              });
              this.setState({
                bathUpdatedValue: "",
                bathValue: ""
              })
              let value = false
              if (this.state.bathsExact == true) {
                value = false
              }
              else {
                value = true
              }
              this.setState({
                bathsExact: value
              })
            }} >
              <Text style={styles.exactLabelText}>Exact
              </Text>
              <Image style={styles.exactImageStyle}
                source={this.state.bathsExact ? require(exact_select) : require(exact_deselect)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.spaceBetweenText} />
        </View>

        {this.bathsMainItem()}
      </View >
    );
  }

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#0B2B80" barStyle="light-content" />
        <View style={styles.skipResultcontainer}>
          <View style={styles.backToSearch}>
            <TouchableHighlight
              style={{ backgroundColor: "tranparent" }}
              onPress={() => {
                this.props.onboardingStore.updateBeds(null);
                this.props.onboardingStore.updateBaths(null);
                goBack();
              }}
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
            <View style={styles.imageContainer}>
              <Text
                style={{
                  fontSize: 23,
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  fontFamily: "Graphik-Medium"
                }}
              >
                Any other filters?
              </Text>
            </View>
            <View style={styles.labelContainer} />
            <View style={[styles.lineView, { backgroundColor: "#3A66A3" }]} />
            <TouchableHighlight
              style={styles.propertyTypeTouchable}
              underlayColor="transparent"
              onPress={() => this._onPressButton()}
            >
              <View style={styles.propertyTypeCell}>
                <View style={styles.propertyTextContainer}>
                  <Text style={styles.propertyTitleText}>Property Type</Text>
                  <View style={styles.spaceBetweenText} />
                  <Text style={styles.propertyTypeText}>
                    {this.state.propTypeDisplayText}
                  </Text>
                </View>
                <Image
                  style={styles.homeImage}
                  source={require("./../../assets/image/smallHomeIcon.png")}
                />
              </View>
            </TouchableHighlight>

            <View style={[styles.lineView, { backgroundColor: "#193D8B" }]} />
            {this.renderBeds()}
            <View style={[styles.lineView, { backgroundColor: "#193D8B" }]} />
            {this.renderBaths()}
            <View style={[styles.lineView, { backgroundColor: "#193D8B" }]} />
          </View>
          <TouchableHighlight
            style={styles.nextButtonStyle}
            underlayColor="transparent"
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
export default inject("onboardingStore")(
  observer(OnBoardingOtherFiltersScreen)
);

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
    height: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  labelContainer: {
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  bedBathCell: {
    justifyContent: "flex-start",
    width: width,
    marginLeft: 10,
    paddingVertical: 20,
    height: 90
  },
  bedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 40
  },
  bedBathView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  minMaxMidContainer: {
    width: 1,
    height: "80%",
    alignItems: "flex-end"
  },
  minMaxMidLine: {
    backgroundColor: "#193D8B",
    width: 1,
    height: "80%",
    justifyContent: "center"
  },
  propertyTypeTouchable: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignItems: "stretch",
    marginLeft: 5
  },
  propertyTypeCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginLeft: 5,
    flex: 1
  },
  propertyTextContainer: {
    justifyContent: "flex-start",
    marginLeft: 5,
    flex: 1,
    alignItems: "stretch",
    paddingVertical: 25
  },
  propertyTitleText: {
    height: 25,
    width: "100%",
    color: "white",
    fontSize: 18,
    fontFamily: "Graphik-Medium"
  },
  spaceBetweenText: {
    height: 10,
    width: "100%"
  },
  propertyTypeText: {
    width: "100%",
    fontSize: 18,
    color: "#7FF4FF",
    fontFamily: "Graphik-Regular",
    fontWeight: "bold"
  },
  homeImage: {
    height: 55,
    width: 55,
    right: 20,
    resizeMode: "contain"
  },
  lineView: {
    width: "95%",
    height: 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  nextContainer: {
    justifyContent: "center",
    backgroundColor: "#7FF4FF",
    flex: 1,
    margin: 5,
    left: 5,
    width: width - 20
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
  minMaxMidLine: {
    backgroundColor: "#3A66A3",
    width: 1,
    height: "100%",
    justifyContent: "center"
  },
  bedBathViewroot: {
    flex: 1,
    flexDirection: "row"
  },
  exactView: {
    right: 80,
    width: 50
  },
  exactTouchable: {
    flexDirection: "row"
  },
  exactLabelText: {
    fontSize: 13,
    fontWeight: "bold",
    right: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  exactImageStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 17,
    width: 17,
    borderRadius: 8.0
  },
});
