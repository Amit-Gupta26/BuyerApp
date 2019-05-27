import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import ScheduleTourDatePickerView from "./ScheduleTourDatePickerView";

class ScheduleATourView extends Component {
  render() {
    return (
      <View style={styles.scheduleATourView}>
        <View style={styles.scheduleATourLabelView}>
          <Text style={styles.scheduleATourText}>{"Schedule a Tour"}</Text>
          <Text style={styles.pickADateBelowText}>{"Pick a date below"}</Text>
        </View>
        <ScheduleTourDatePickerView
          addressLine1={this.props.addressLine1}
          addressLine2={this.props.addressLine2}
          imageUrl={this.props.imageUrl} 
          selected={new Map()}
          isFromPdp = {this.props.isFromPdp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scheduleATourView: {
    backgroundColor: "#F7F7F9",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  scheduleATourLabelView: {
    flexDirection: "column",
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "transparent"
  },
  scheduleATourText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272935"
  },
  pickADateBelowText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#B1B2B6",
    paddingVertical: 5
  }
});

export default ScheduleATourView;
