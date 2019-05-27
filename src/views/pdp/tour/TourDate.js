import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { withNavigation } from 'react-navigation';
class DateFormatter {
  static _getDate = str => {
    return str.toString();
  };

  static _getMonthStr = str => {
    var monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return monthList[str].toUpperCase();
  };
  static _getDayStr = str => {
    var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayList[str].toUpperCase();
  };
}
class TourDate extends Component {
  _getAsapItem(textColor, id) {
    var asapTextColor = textColor ? "#153081" : "#B1B2B6";
    var asapImageStyle = textColor ? styles.enabledAsapImage : styles.disabledAsapImage;
    return (
      <View style={[styles.GridView, { height: "100%" }]}>
        <Image
          source={require("../../../assets/image/flash.png")}
          style={asapImageStyle}
        />
        <Text
          style={[
            styles.dateText,
            {
              color: asapTextColor,
              fontSize: 14,
              marginTop: 10
            }
          ]}>
          {"ASAP"}
        </Text>
      </View>
    );
  }
  _getDateItem(item, textColor, id) {
    var monthStyle = textColor ? styles.enabledMonthView : styles.disabledMonthView;
    var monthTextStyle = textColor ? styles.enabledMonthText : styles.disabledMonthText;
    return (
      <View style={styles.GridView}>
        <View style={monthStyle}>
          <Text style={monthTextStyle}>
            {DateFormatter._getMonthStr(item.id.getMonth())}
          </Text>
        </View>
        <Text
          style={[
            styles.dateText,
            {
              color: "#272935",
              fontSize: 18
            }
          ]}
        >
          {DateFormatter._getDate(item.id.getDate())}
        </Text>
        <Text style={styles.dayText}>
          {DateFormatter._getDayStr(item.id.getDay())}
        </Text>
      </View>
    );
  }
  _renderASAPGripAndDateGrid(index, item, textColor) {
    return index == 0 ? this._getAsapItem(textColor, index) : this._getDateItem(item, textColor, index);
  }

  _onPress = (id, isFromTour) => {
    this.props.onPressItem(id, isFromTour);
  };

  render() {
    let index = this.props.currentIndex;
    let item = this.props.currentItem;
    const { navigate } = this.props.navigation;

    return (
      <TouchableOpacity
        style={[styles.flatListView, { marginLeft: index == 0 ? 8 : 0 }]}
        onPress={() => {
          if (this.props.isFromTourDateScreen) {
            this._onPress(this.props.currentIndex, this.props.isFromTourDateScreen)
          } else {
            if (index > 0) {
              this._onPress(this.props.currentIndex, this.props.isFromTourDateScreen)
              navigate('ScheduleTour', {
                tourAddressLine1: this.props.addressLine1,
                tourAddressLine2: this.props.addressLine2,
                imageUrl: this.props.imageUrl
              });
            }else{
              alert('Asap flow to be implemeted')
            }
          }
        }
        }
      >
        {this._renderASAPGripAndDateGrid(index, item, this.props.selected)}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(TourDate);
const styles = StyleSheet.create({
  datePickerView: {
    marginBottom: 5,
    backgroundColor: "transparent"
  },
  flatList: {
    backgroundColor: "transparent",
    marginHorizontal: 10
  },
  flatListView: {
    backgroundColor: "white",
    height: 80,
    width: 60,
    marginRight: 8,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  enabledMonthView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 3,
    backgroundColor: '#0B2B80'
  },
  disabledMonthView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 3,
    backgroundColor: "#E8E8EA"
  },
  enabledMonthText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold"
  },
  disabledMonthText: {
    color: "#48494B",
    fontSize: 12,
    fontWeight: "bold"
  },
  dateText: {
    fontWeight: "bold",
    marginTop: 8,
    alignSelf: "center"
  },
  dayText: {
    color: "#B1B2B6",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 4
  },
  enabledAsapImage: {
    marginTop: 5,
    width: "35%",
    height: "35%",
    alignSelf: "center",
    tintColor: "#153081",
    marginTop: 15
  },
  disabledAsapImage: {
    marginTop: 5,
    width: "35%",
    height: "35%",
    alignSelf: "center",
    tintColor: "#B1B2B6",
    marginTop: 15
  },
  GridView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});
