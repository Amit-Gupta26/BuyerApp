import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch
} from "react-native";

class ToggelBasedCell extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      switchOn: this.props.preSelectedValue
    }
  }

  onPress = (value) => {
    this.setState({ switchOn: value })
    this.props.itemClick(value)
  }

  changeValue(value) {
    this.state.switchOn = value
  }

  render() {
    const { value, height } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.firstTextView}>{value}</Text>
          <Text style={[styles.secondTextView, { height: height }]}>{"<7days"}</Text>
        </View>
        <View style={styles.switchViewCont}>
          <Switch
            onValueChange={(value) => this.onPress(value)}
            trackColor={{ false: '#E2E2E2', true: '#0B2B80' }}
            value={this.state.switchOn}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 0,
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 1.0,
    borderBottomColor: "#E2E2E2"
  },
  switchViewCont: {
    marginTop: 16,
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  leftContainer: {
    alignSelf: 'center',
    flexDirection: "column",
    marginHorizontal: 18,
    flex:6
  },
  firstTextView: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272935",
    marginBottom: 2
  },
  secondTextView: {
    fontSize: 13,
    width: 250,
    color: "#0B2B80"
  }
});

export default ToggelBasedCell;
