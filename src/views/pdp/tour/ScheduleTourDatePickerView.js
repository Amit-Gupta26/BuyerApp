import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList
} from "react-native";
import TourDate from './TourDate';
import { observer, inject } from "mobx-react";

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
  };}

class ScheduleTourDatePickerView extends Component {
  _getDateArray = (start, end) => {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  _nextWeek = () => {
    var today = new Date();
    var nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 9
    );
    return nextWeek;
  };

  _fillDataSource = () => {
    var startDate = new Date();
    var endDate = this._nextWeek();
    var dateArr = this._getDateArray(startDate, endDate);
    var dataSource = new Array();
    dateArr.forEach(ele => {
      dataSource.push({ id: ele });
    });
    return dataSource;
  };

  onPressItem = (id, isFromTour) => {
    if(isFromTour)
    {
    this.props.tourDateClickCallBack(id);
    }else{
        var selected = new Map();
        selected.set(id, !selected.get(id));
        const { tourStore } = this.props;
        tourStore.mapDateSelected = selected;
    }
  };

  _renderItem = ({item, index}) => {
    const { tourStore } = this.props;
    return (
      <TourDate
      addressLine1={this.props.addressLine1}
      addressLine2={this.props.addressLine2}
      isFromPdp={this.props.isFromPdp}
      onPressItem={this.onPressItem}
      selected={!!tourStore.getDateSelectedData(index)}
      imageUrl={this.props.imageUrl}
      currentIndex={index}
      currentItem={item}
      dateSelectionCallBack={this.props.dateSelectionCallBack}
      isFromTourDateScreen={this.props.isFromTourDateScreen} />
    )
}

  render() {
    return (
      <View style={styles.datePickerView}>
        <FlatList
          style={styles.flatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this._fillDataSource()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default inject("tourStore")(observer(ScheduleTourDatePickerView));

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
  monthView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 3,
    backgroundColor: "#153081"
  },
  monthText: {
    color: "#fff",
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
  ASAPImage: {
    marginTop: 5,
    width: "35%",
    height: "35%",
    alignSelf: "center",
    tintColor: "#153081"
  },
  GridView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});


