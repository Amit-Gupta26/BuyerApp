import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";

class MortgageCalculatorScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      mortgageRate: "",
      propertyPrice: "",
      downPayment: "",
      loanType: "",
      interestRate: "",
      propertyTax: "",
      hoaDues: "",
      tempDataSource: [],
      currentIndex: 0,
      tempMortgageRate: "",
      testIndex: "",
      years: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Estimated Monthly Payment",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      fontSize: 14,
      fontWeight: "bold"
    },
    headerStyle: {
      backgroundColor: "white",
      borderBottomColor: "transparent",
      borderBottomWidth: 0
    },
    headerTintColor: "#1F47AF",
    headerLeft: (
      <TouchableOpacity
        style={[
          styles.headerButton,
          {
            marginLeft: 8
          }
        ]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/image/clear.png")}
          style={styles.headerButtonImage}
        />
      </TouchableOpacity>
    )
  });

  _renderMortgageRateHeader() {
    let desText =
      "(Includes Property tax and HOA dues when available. Home insurance and other customary loan fees are not included.Calculations are for general information only. Actual terms of your loan may differ.)";
    return (
      <View style={styles.mortgageRateHolderView}>
        <View style={styles.mortgageRateTextHolderView}>
          <Text style={styles.mortgageRateText}>
            {"$" + this.state.tempMortgageRate}
            <Text style={[styles.mortgageRateText, { fontSize: 15 }]}>
              {"/mo"}
            </Text>
          </Text>
          <Text style={[styles.mortgageRateText, { fontSize: 10 }]}>
            {desText}
          </Text>
        </View>
      </View>
    );
  }

  _renderLoanType(currentLoanType) {
    var loanType = ["30yr Fixed", "15yr Fixed", "1/5 Arm"];
    var buttons = [];
    if (this.state.years == undefined) {
      this.state.years = 30;
    }
    loanType.map((ele, index) => {
      buttons.push(
        <TouchableOpacity
          key={index}
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: "33%",
            borderRightColor:
              index == loanType.length - 1 ? "transparent" : "#CED0CE",
            borderRightWidth: index == loanType.length - 1 ? 0 : 1
          }}
          onPress={() => {
            this.setState({ loanType: ele });
            var temp = parseInt(ele);
            this.setState({ loanType: temp.toString() });
            this.state.currentIndex = this.getIndex(ele, loanType);
            var dataSource = Array.from(this.state.tempDataSource);
            dataSource.map((item, index) => {
              if (item.key == "Loan Type") {
                item.value = temp;
                this.state.loanType = temp;
              }
            });

            this.setState({
              tempDataSource: dataSource
            });
            if (this.state.currentIndex == 0 || this.state.currentIndex == 2) {
              this.state.years = 30;
            } else {
              this.state.years = 15;
            }
            var value = this.calculateMonthlyMortgagePayments(
              this.state.propertyPrice,
              this.state.downPayment,
              this.state.years,
              this.state.interestRate
            );
            this.setState({ tempMortgageRate: value });
          }}
        >
          <Text
            style={{
              color:
                index == this.state.currentIndex ||
                (index == 0 && this.state.currentIndex == undefined)
                  ? "#164083"
                  : "#7E7E7E",
              fontWeight: "normal",
              fontSize: 16
            }}
          >
            {ele}
          </Text>
        </TouchableOpacity>
      );
    });

    return buttons;
  }

  getIndex(value, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  calculateMonthlyMortgagePayments(price, downPayment, years, rate) {
    var newPrice = parseFloat(price).toFixed(2);
    newPrice = newPrice - (newPrice * parseFloat(downPayment).toFixed(2)) / 100;

    var monthlyRate = parseFloat(rate).toFixed(2) / 100.0 / 12.0;
    var months = parseFloat(years).toFixed(2) * 12;

    return (
      parseFloat(this.state.propertyTax) +
      parseFloat(this.state.hoaDues) +
      Math.round(
        (newPrice * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      )
    );
  }

  _renderDownPaymentCell(item, index) {
    return (
      <View
        key={index}
        style={{
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "70%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              width: "100%"
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                flexDirection: "row",
                backgroundColor: "#F8F8F8",
                width: "67%"
              }}
            >
              <View
                style={{
                  height: "70%",
                  width: "8%",
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 24
                  }}
                >
                  {" "}
                </Text>
              </View>

              <TextInput
                style={{
                  height: "90%",
                  fontSize: 24,
                  textAlign: "right"
                }}
                defaultValue={item.value}
                value={this.state.downPayment}
                onChangeText={this.handleTextChangedDownPayment}
                placeholder="0"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={this._hideKeyboard}
                blurOnSubmit={true}
              />

              <View
                style={{
                  height: "70%",
                  width: "8%",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 24
                  }}
                >
                  {"%"}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100%",
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                width: "30%",
                marginLeft: "3%"
              }}
            >
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#F8F8F8",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.decrementDownPaymentValue();
                }}
              >
                <Text
                  style={{
                    color: "#104190",
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  {"-"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#F8F8F8",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.incrementDownPaymentValue();
                }}
              >
                <Text
                  style={{
                    color: "#104190",
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  {"+"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderInterestRateCell(item, index) {
    const { interestRate } = this.state.interestRate;
    return (
      <View
        key={index}
        style={{
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "70%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              width: "100%"
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                height: "100%",
                flexDirection: "row",
                backgroundColor: "#F8F8F8",
                width: "67%"
              }}
            >
              <View
                style={{
                  height: "70%",
                  width: "8%",
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 24
                  }}
                >
                  {" "}
                </Text>
              </View>

              <TextInput
                style={{
                  height: "90%",
                  fontSize: 24,
                  textAlign: "right"
                }}
                defaultValue={item.value}
                value={this.state.interestRate}
                onChangeText={this.handleTextChangedInterest}
                placeholder="0"
                autoCapitalize="none"
                maxLength={9}
                autoCorrect={false}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={this._hideKeyboard}
                blurOnSubmit={true}
              />

              <View
                style={{
                  height: "70%",
                  width: "8%",
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 24
                  }}
                >
                  {"%"}
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "100%",
                flexDirection: "row",
                backgroundColor: "#FFFFFF",
                width: "30%",
                marginLeft: "3%"
              }}
            >
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#F8F8F8",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.decrementInterestRateValue();
                }}
              >
                <Text
                  style={{
                    color: "#104190",
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  {"-"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#F8F8F8",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => {
                  this.incrementInterestRateValue();
                }}
              >
                <Text
                  style={{
                    color: "#104190",
                    fontWeight: "bold",
                    fontSize: 16
                  }}
                >
                  {"+"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderPropertyTaxesCell(item, index) {
    const { propertyTax } = this.state.propertyTax;
    return (
      <View
        key={index}
        style={{
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "60%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#F8F8F8",
              width: "70%"
            }}
          >
            <View
              style={{
                height: "70%",
                width: "8%",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 24,
                  marginTop: 2
                }}
              >
                {"$"}
              </Text>
            </View>

            <TextInput
              style={{
                height: "100%",
                fontSize: 24,
                textAlign: "left",
                width: "71%",
                marginTop: 3
              }}
              defaultValue={item.value}
              value={propertyTax}
              onChangeText={this.handleTextChangedTax}
              placeholder="0"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={9}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={this._hideKeyboard}
              blurOnSubmit={true}
            />

            <View
              style={{
                height: "70%",
                width: "20%",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 24
                }}
              >
                {"/mo"}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              height: "30%"
            }}
          >
            <Text
              style={{ color: "#7E7E7E", fontWeight: "normal", fontSize: 12 }}
            >
              {"Source: Country(Public)Records"}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  _renderHoaDuesCell(item, index) {
    const { hoaDues } = this.state.hoaDues;
    return (
      <View
        key={index}
        style={{
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "70%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#F8F8F8",
              width: "70%"
            }}
          >
            <View
              style={{
                height: "70%",
                width: "8%",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 24,
                  marginTop: 2
                }}
              >
                {"$"}
              </Text>
            </View>

            <TextInput
              style={{
                height: "90%",
                fontSize: 24,
                textAlign: "left",
                width: "71%",
                marginTop: 3
              }}
              defaultValue={item.value}
              value={hoaDues}
              onChangeText={this.handleTextChangedHoa}
              placeholder="0"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={9}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={this._hideKeyboard}
              blurOnSubmit={true}
            />

            <View
              style={{
                height: "70%",
                width: "20%",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 24
                }}
              >
                {"/mo"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderLoanTypeCell(item, index) {
    return (
      <View
        key={index}
        style={{
          height: 90,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "80%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              width: "100%"
            }}
          >
            {this._renderLoanType(this.state.loanType)}
          </View>
        </View>
      </View>
    );
  }

  _renderPropertyPriceCell(item, index) {
    this.state.testIndex = "0";
    return (
      <View
        key={index}
        style={{
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          marginTop: index == 0 ? 3 : 0
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            marginHorizontal: "5%",
            height: "70%",
            alignItems: "stretch"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              height: "40%"
            }}
          >
            <Text
              style={{ color: "black", fontWeight: "normal", fontSize: 16 }}
            >
              {item.key}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              height: "60%",
              flexDirection: "row",
              backgroundColor: "#F8F8F8",
              width: "100%"
            }}
          >
            <View
              style={{
                height: "70%",
                width: "8%",
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: 24
                }}
              >
                {"$"}
              </Text>
            </View>

            <TextInput
              style={{
                height: "95%",
                width: "92%",
                fontSize: 24
              }}
              defaultValue={item.value}
              onChangeText={this.handleTextChanged}
              value={this.state.propertyPrice}
              maxLength={9}
              placeholder="0"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={this._hideKeyboard}
              blurOnSubmit={true}
            />
          </View>
        </View>
      </View>
    );
  }

  incrementDownPaymentValue() {
    var temp = parseInt(this.state.downPayment);
    if (temp < 100) {
      temp++;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
      var dataSource = Array.from(this.state.tempDataSource);
      dataSource.map((item, index) => {
        if (item.key == "Down Payment") {
          item.value = temp;
        }
      });
      this.setState({
        tempDataSource: dataSource
      });
      var value = this.calculateMonthlyMortgagePayments(
        this.state.propertyPrice,
        this.state.downPayment,
        this.state.years,
        this.state.interestRate
      );
      this.setState({ tempMortgageRate: value });
    } else {
      var temp = 100;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
      var dataSource = Array.from(this.state.tempDataSource);
      dataSource.map((item, index) => {
        if (item.key == "Down Payment") {
          item.value = temp;
        }
      });

      this.setState({
        tempDataSource: dataSource
      });

      var value = this.calculateMonthlyMortgagePayments(
        this.state.propertyPrice,
        this.state.downPayment,
        this.state.years,
        this.state.interestRate
      );
      this.setState({ tempMortgageRate: value });
    }
  }

  decrementDownPaymentValue() {
    var temp = parseInt(this.state.downPayment);
    if (temp > 1) {
      temp--;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });

      var dataSource = Array.from(this.state.tempDataSource);
      dataSource.map((item, index) => {
        if (item.key == "Down Payment") {
          item.value = temp;
        }
      });

      this.setState({
        tempDataSource: dataSource
      });

      var value = this.calculateMonthlyMortgagePayments(
        this.state.propertyPrice,
        this.state.downPayment,
        this.state.years,
        this.state.interestRate
      );
      this.setState({ tempMortgageRate: value });
    } else {
      var temp = 0;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
      var dataSource = Array.from(this.state.tempDataSource);
      dataSource.map((item, index) => {
        if (item.key == "Down Payment") {
          item.value = temp;
        }
      });

      this.setState({
        tempDataSource: dataSource
      });

      var value = this.calculateMonthlyMortgagePayments(
        this.state.propertyPrice,
        this.state.downPayment,
        this.state.years,
        this.state.interestRate
      );
      this.setState({ tempMortgageRate: value });
    }
  }

  handleTextChanged = propertyPrice => {
    if (propertyPrice > 0) {
      var temp = parseInt(propertyPrice);
      this.state.propertyPrice = temp;
      this.setState({ propertyPrice: temp.toString() });
    } else {
      this.state.propertyPrice = "0";
      this.setState({ propertyPrice: "0" });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: value });
  };

  handleTextChangedDownPayment = downPayment => {
    if (downPayment > 0 && downPayment <= 100) {
      this.state.downPayment = Math.abs(downPayment);
      this.setState({ downPayment: Math.abs(downPayment).toString() });
    } else if (downPayment > 100) {
      var temp = 100;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
    } else if (downPayment == -0 || downPayment == +0) {
      var temp = 0;
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
    } else if (downPayment < 0) {
      var temp = Math.abs(downPayment);
      this.state.downPayment = temp;
      this.setState({ downPayment: temp.toString() });
    } else {
      this.state.downPayment = "0";
      this.setState({ downPayment: "0" });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: value });
  };

  handleTextChangedInterest = interestRate => {
    if (interestRate > 0 && interestRate <= 100) {
      var lastDigit = interestRate
        .toString()
        .split("")
        .pop();
      if (lastDigit == ".") {
        this.state.interestRate = Math.abs(interestRate) + ".0";
        this.setState({
          interestRate: Math.abs(interestRate).toString() + "."
        });
      } else {
        this.state.interestRate = Math.abs(interestRate);
        this.setState({ interestRate: Math.abs(interestRate).toString() });
      }
    } else if (interestRate == "" || interestRate == "0.") {
      this.state.interestRate = "0.1";
      this.setState({ interestRate: "0.1" });
    } else if (interestRate > 100) {
      var temp = 100;
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else if (interestRate == -0 || interestRate == +0) {
      var temp = 0;
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else if (interestRate < 0) {
      var temp = Math.abs(interestRate);
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else if (String(interestRate).includes(".")) {
      var temp = parseInt(interestRate) + ".";
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else {
      this.state.interestRate = 0.1;
      this.setState({ interestRate: 0.1 });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: value });
  };

  handleTextChangedTax = propertyTax => {
    if (propertyTax > 0) {
      this.state.propertyTax = propertyTax;
      this.setState({ propertyTax: propertyTax.toString() });
    } else {
      this.state.propertyTax = 0;
      this.setState({ propertyTax: 0 });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: parseFloat(value) });
  };

  handleTextChangedHoa = hoaDues => {
    if (hoaDues > 0) {
      this.state.hoaDues = hoaDues;
      this.setState({ hoaDues: hoaDues.toString() });
    } else {
      this.state.hoaDues = 0;
      this.setState({ hoaDues: 0 });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: parseFloat(value) });
  };

  incrementInterestRateValue() {
    var temp = parseFloat(this.state.interestRate);
    temp = (temp + 0.1).toFixed(2);
    if (temp < 100) {
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else {
      var temp = 100;
      temp = temp.toFixed(1);
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    dataSource.map((item, index) => {
      if (item.key == "Interest Rate") {
        item.value = temp;
      }
    });

    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: value });
  }
  decrementInterestRateValue() {
    var temp = parseFloat(this.state.interestRate);
    if (temp.toFixed(2) - 0.1 >= 0.1) {
      temp = (temp - 0.1).toFixed(2);
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toString() });
    } else {
      var temp = 0.1;
      this.state.interestRate = temp;
      this.setState({ interestRate: temp.toFixed(2).toString() });
    }
    var dataSource = Array.from(this.state.tempDataSource);
    dataSource.map((item, index) => {
      if (item.key == "Interest Rate") {
        item.value = temp;
      }
    });

    this.setState({
      tempDataSource: dataSource
    });
    var value = this.calculateMonthlyMortgagePayments(
      this.state.propertyPrice,
      this.state.downPayment,
      this.state.years,
      this.state.interestRate
    );
    this.setState({ tempMortgageRate: value });
  }

  _renderFlatListRow(item, index) {
    var cell = [];
    if (item.key == "Property Price") {
      cell.push(this._renderPropertyPriceCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    } else if (item.key == "Down Payment") {
      cell.push(this._renderDownPaymentCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    } else if (item.key == "Loan Type") {
      cell.push(this._renderLoanTypeCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    } else if (item.key == "Interest Rate") {
      cell.push(this._renderInterestRateCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    } else if (item.key == "Property Taxes") {
      cell.push(this._renderPropertyTaxesCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    } else if (item.key == "HOA Dues") {
      cell.push(this._renderHoaDuesCell(item, index));
      cell.push(<View key={index + 1} style={styles.separatorLine} />);
    }

    return cell;
  }

  _hideKeyboard = () => {
    Keyboard.dismiss();
  };

  _renderFlatList() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={100}
      >
        <FlatList
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.tempDataSource}
          renderItem={({ item, index }) => this._renderFlatListRow(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </KeyboardAvoidingView>
    );
  }

  componentWillMount() {
    let mortgageRate = this.props.navigation.getParam("mortgageRate", "");
    this.setState({
      tempMortgageRate: mortgageRate
    });
    let dataSource = this.props.navigation.getParam("dataSource", "");
    dataSource.map((item, index) => {
      if (item.key == "Property Price") {
        this.setState({ propertyPrice: item.value });
      } else if (item.key == "Down Payment") {
        this.setState({ downPayment: item.value });
      } else if (item.key == "Loan Type") {
        this.setState({ loanType: item.value });
      } else if (item.key == "Interest Rate") {
        this.setState({ interestRate: item.value });
      } else if (item.key == "Property Taxes") {
        this.setState({ propertyTax: item.value });
      } else if (item.key == "HOA Dues") {
        this.setState({ hoaDues: item.value });
      }
    });
    this.setState({
      tempDataSource: dataSource
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {this._renderMortgageRateHeader()}
        {this._renderFlatList()}
      </SafeAreaView>
    );
  }
}
export default MortgageCalculatorScreen;

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40
  },
  headerButtonImage: {
    width: 18,
    height: 18,
    resizeMode: "cover"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  mortgageRateHolderView: {
    backgroundColor: "#104190",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  mortgageRateTextHolderView: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "10%",
    width: "90%",
    paddingTop: 2,
    paddingBottom: 8
  },
  mortgageRateText: {
    fontSize: 32,
    fontWeight: "normal",
    color: "white",
    textAlign: "center"
  },
  flatList: {
    flex: 1,
    backgroundColor: "white"
  },
  separatorLine: {
    height: 1,
    width: "95%",
    backgroundColor: "#CED0CE",
    marginLeft: "5%",
    marginBottom: 3
  }
});
