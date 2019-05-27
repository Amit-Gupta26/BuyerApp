import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Picker,
  Platform
} from "react-native";
import { purchaseData } from "../../data/OnboardingPurchaseData";
import { mortageData } from "../../data/OnboardingMortageData";
import { observer, inject } from "mobx-react";
import CustomPicker from "../../components/CustomModalPicker";

class OnBoardingSurveyScreen extends Component {
  constructor() {
    super();
    this.state = {
      purchasePickerValue: "",
      mortagePickerValue: "",
      purchaseValueToUpdate: "Select an answer",
      purchasePickerSelection:
        Platform.OS === "ios" ? "Now" : "Select an answer",
      mortageValueToUpdate: "Select an answer",
      mortagePickerSelection:
        Platform.OS === "ios" ? "Unkown" : "Select an answer",
      isEnabled: false
    };
  }

  static navigationOptions = {
    title: "",
    header: null
  };

  _purchaseButtonClicked() {
    this.setState({
      mortageSection: false,
      purchaseSection: true,
      isEnabled: true
    });
  }

  _updatePurchaseValueLogic() {
    const textView = (
      <Text style={styles.purchaseMortageText}>
        {this.state.purchaseValueToUpdate}
      </Text>
    );
    return textView;
  }

  _updateBottomValueClicked() {
    if (this.state.purchaseSection) {
      this.setState({
        purchaseSection: false,
        purchaseValueToUpdate: this.state.purchasePickerSelection
      });
    } else {
      this.setState({
        mortageSection: false,
        mortageValueToUpdate: this.state.mortagePickerSelection
      });
    }
  }

  _mortageButtonClicked() {
    this.setState({
      purchaseSection: false,
      mortageSection: true,
      isEnabled: true
    });
  }

  _updateMortageValueLogic() {
    const textView = (
      <Text style={styles.purchaseMortageText}>
        {this.state.mortageValueToUpdate}
      </Text>
    );
    return textView;
  }

  _onSendClick() {
    const { onboardingStore } = this.props;
    const { navigation } = this.props;
    var mortageData = this.state.mortagePickerSelection;
    var priceData = this.state.purchasePickerSelection;
    if (
      (mortageData != null && priceData != null) ||
      (mortageData == null && priceData != null) ||
      (mortageData != null && priceData == null)
    ) {
      onboardingStore._updateSurveyLeadDetails(
        false,
        mortageData,
        priceData,
        this._onSurveyCallBack,
        navigation,
        onboardingStore
      );
    }
  }

  _onSurveyCallBack(isSuccess, navigation, onboardingStore) {
    onboardingStore.onSkip();
    if (isSuccess) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Home");
    }
  }

  _updateBottomViewLogic() {
    const bottomView = (
      <View style={styles.doneMainContainerStyle}>
        <TouchableHighlight
          style={styles.doneSubContainerStyle}
          underlayColor="transparent"
          onPress={() => this._updateBottomValueClicked()}
        >
          <View style={styles.doneTextStyle}>
            <Text style={styles.doneButton}>Done</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
    return bottomView;
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <View style={styles.headerImageContainer}>
            <Image
              source={require("./../../assets/image/onboardingSurvey.png")}
              style={styles.topImageContainer}
            />
            <Text style={styles.tellUsTextStyle}>
              Tell us about your{"\n"} home search
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.purchasePickerContainer}>
            <Text style={styles.purchaseTimeTextStyle}>
              Purchase Time Frame?
            </Text>
            {this.renderPurchaseComponent()}
          </View>
          <View style={styles.divider} />

          <View style={styles.mortagePickerContainer}>
            <Text style={styles.preApprovedTextStyle}>
              Pre-approved for mortage?
            </Text>
            {this.renderMortageComponent()}
          </View>
          <View style={styles.divider} />
        </View>

        <View style={styles.footerContainer}>
          <TouchableHighlight
            style={styles.skipNowText}
            underlayColor="transparent"
            onPress={() => {
              this.props.onboardingStore.onSkip();
              navigate("Home");
            }}
          >
            <View style={styles.skipContainer}>
              <Text style={styles.skipTextStyle}>Skip these questions</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.sendContainer}
            underlayColor="transparent"
            onPress={() => {
              this._onSendClick();
            }}
          >
            <View
              style={
                this.state.isEnabled
                  ? styles.saveContainerEnabled
                  : styles.saveContainerDisabled
              }
            >
              <Text
                style={
                  this.state.isEnabled
                    ? styles.saveTextStyleEnabled
                    : styles.saveTextStyleDisabled
                }
              >
                Send
              </Text>
            </View>
          </TouchableHighlight>
          {this.renderBottomComponent()}
        </View>
      </SafeAreaView>
    );
  }

  renderPurchaseComponent() {
    if (Platform.OS === "ios") {
      return (
        <TouchableOpacity onPress={() => this._purchaseButtonClicked()}>
          <View style={styles.selectionView}>
            {this._updatePurchaseValueLogic()}
            <Image
              source={require("./../../assets/image/surveyArrow.png")}
              style={styles.arrowImageContainer}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.purchaseCustomRowPicker.setModalVisible(true)}
          >
            <View style={styles.pickerRootContainer}>
              <CustomPicker
                ref={purchaseInstance =>
                  (this.purchaseCustomRowPicker = purchaseInstance)
                }
                data={purchaseData}
                onItemSelected={item => {
                  this.setState({
                    purchaseValueToUpdate: item.key,
                    purchasePickerSelection: item.key,
                    isEnabled: true
                  });
                }}
              />
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.purchaseCustomRowPicker.setModalVisible(true)
                  }
                >
                  <Text style={styles.purchaseMortageText}>
                    {this.state.purchaseValueToUpdate}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("./../../assets/image/surveyArrow.png")}
                style={styles.arrowImageContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderMortageComponent() {
    if (Platform.OS === "ios") {
      return (
        <TouchableOpacity onPress={() => this._mortageButtonClicked()}>
          <View style={styles.selectionView}>
            {this._updateMortageValueLogic()}
            <Image
              source={require("./../../assets/image/surveyArrow.png")}
              style={styles.arrowImageContainer}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.mortageCustomRowPicker.setModalVisible(true)}
          >
            <View style={styles.pickerRootContainer}>
              <CustomPicker
                ref={mortageInstance =>
                  (this.mortageCustomRowPicker = mortageInstance)
                }
                data={mortageData}
                onItemSelected={item => {
                  this.setState({
                    mortageValueToUpdate: item.key,
                    mortagePickerSelection: item.key,
                    isEnabled: true
                  });
                }}
              />
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.mortageCustomRowPicker.setModalVisible(true)
                  }
                >
                  <Text style={styles.purchaseMortageText}>
                    {this.state.mortageValueToUpdate}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("./../../assets/image/surveyArrow.png")}
                style={styles.arrowImageContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderBottomComponent() {
    if (this.state.purchaseSection) {
      return (
        <View style={styles.bottomComponentViewStyle}>
          {this._updateBottomViewLogic()}
          <Picker
            selectedValue={this.state.purchasePickerSelection}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ purchasePickerSelection: itemValue })
            }
          >
            {purchaseData.map((item, index) => {
              return (
                <Picker.Item label={item.key} value={item.value} key={index} />
              );
            })}
          </Picker>
        </View>
      );
    }

    if (this.state.mortageSection) {
      return (
        <View style={styles.bottomComponentViewStyle}>
          {this._updateBottomViewLogic()}
          <Picker
            selectedValue={this.state.mortagePickerSelection}
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ mortagePickerSelection: itemValue })
            }
          >
            {mortageData.map((item, index) => {
              return (
                <Picker.Item label={item.key} value={item.value} key={index} />
              );
            })}
          </Picker>
        </View>
      );
    }
  }
}

export default inject("onboardingStore")(observer(OnBoardingSurveyScreen));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#F5F5F5"
  },
  mainContainer: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    flex: 7,
    backgroundColor: "#F5F5F5"
  },
  headerImageContainer: {
    justifyContent: "flex-start",
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
  },
  skipContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  skipTextStyle: {
    justifyContent: "center",
    fontSize: 15,
    color: "#0B2B80",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  saveContainerEnabled: {
    justifyContent: "center",
    backgroundColor: "#0B2B80",
    flex: 1,
    textAlign: "center",
    margin: 5
  },
  saveContainerDisabled: {
    justifyContent: "center",
    backgroundColor: "#E4E4E7",
    flex: 1,
    textAlign: "center",
    margin: 5
  },
  saveTextStyleEnabled: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginLeft: 50,
    marginRight: 50
  },
  saveTextStyleDisabled: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#8C8E9B",
    textAlign: "center",
    marginLeft: 50,
    marginRight: 50
  },
  footerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    flex: 3.1
  },
  purchaseMortageText: {
    fontSize: 15,
    color: "#0B2B80",
    fontWeight: "normal",
    marginTop: 6,
    fontWeight: "bold"
  },
  tellUsTextStyle: {
    fontSize: 16,
    color: "#0B2B80",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  purchaseTimeTextStyle: {
    fontSize: 15,
    color: "grey"
  },
  preApprovedTextStyle: {
    fontSize: 15,
    color: "grey"
  },
  skipNowText: {
    backgroundColor: "transparent",
    height: 80
  },
  sendContainer: {
    backgroundColor: "transparent",
    height: 60
  },
  doneMainContainerStyle: {
    backgroundColor: "#507BA8",
    width: "100%",
    height: 44,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
  },
  doneSubContainerStyle: {
    backgroundColor: "transparent",
    width: 100,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  doneTextStyle: {
    backgroundColor: "transparent",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  bottomComponentViewStyle: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0
  },
  pickerStyle: {
    flex: 1
  },
  topImageContainer: {
    height: 60,
    width: 60
  },
  purchasePickerContainer: {
    flex: Platform.OS === "ios" ? 0.7 : 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  mortagePickerContainer: {
    flex: Platform.OS === "ios" ? 0.7 : 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  divider: {
    borderBottomColor: "#888E90",
    borderBottomWidth: 1.2,
    marginLeft: 10
  },
  pickerRootContainer: {
    flexDirection: "row"
  },
  arrowImageContainer: {
    height: 10,
    width: 15,
    marginRight: 10,
    marginLeft: "auto"
  },
  selectionView: {
    flexDirection: "row"
  }
});
