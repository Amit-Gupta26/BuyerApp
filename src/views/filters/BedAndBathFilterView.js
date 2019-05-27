import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import BedAndBathCell from "./BedAndBathCell";

const exact_deselect = './../../assets/image/Exact-DeSelected.png';
const exact_select = './../../assets/image/Property-Selection.png';

class BedAndBathFilterView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      exact: false,
      listDatasource: [],
      exactListDatasource: [],
      preSelectedValue: ''
    }
  }

  changedValue(value) {
    this.setValues(value)
    this.refs.bedAndBathCell.refreshView()

  }

  componentWillMount() {
    this.setValues(this.props.preSelectedValue)
  }

  setValues(value){
    var newData = []
    var tempValue =  value;
    
    if (tempValue == ''){
      newData = Array.from(this.props.dataItemsArray)
      this.setState({exact: false})
      this.state.exact = false
    }
    else if (tempValue.includes('e')){
      newData = Array.from(this.props.exactDataItemsArray)
      this.state.exact = true

    }
    else{
      newData = Array.from(this.props.dataItemsArray)
      this.state.exact = false
    }

    var tempDataArray = Array()
    newData.forEach((elem) => {
      var tempElem = JSON.parse(JSON.stringify(elem))
      if (tempElem.id === tempValue) {
          tempElem.selected = true
      }
      else {
          tempElem.selected = false
      }
      tempDataArray.push(tempElem);
    })

    newData = Array.from(tempDataArray)
    if (this.state.exact == true){
      this.state.listDatasource = Array.from(this.props.dataItemsArray)
      this.state.exactListDatasource = Array.from(newData)
    }
    else{
      this.state.listDatasource = Array.from(newData)
      this.state.exactListDatasource = Array.from(this.props.exactDataItemsArray)
    }
  }

  render() {
    const { type } = this.props
    let color = this.state.exact ? '#0B2B80' : '#B1B2B6'

    return (
      <View style={styles.topView}>
        <View style={styles.topLabelView}>
          <Text style={styles.topLabelText}>{type}</Text>
          <View style={styles.exactView}>
            <TouchableOpacity style={styles.exactTouchable} onPress={() => {
              let value = false
              if (this.state.exact == true) {
                value = false
              }
              else {
                value = true
              }
              this.setState({
                exact: value,
                listDatasource : this.props.dataItemsArray,
                exactListDatasource: this.props.exactDataItemsArray
              })
              this.props.itemClick('')
            }} >
              <Text style={[styles.exactLabelText, { color: color }]}>Exact
              </Text>
              <Image style={styles.exactImageStyle}
                source={this.state.exact ? require(exact_select) : require(exact_deselect)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <BedAndBathCell ref='bedAndBathCell' 
        type={type}
          dataItemsArray={this.state.exact ? this.state.exactListDatasource : this.state.listDatasource}
          width={this.props.width}
          onTap={(value) => this.props.itemClick(value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  exactImageStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 17,
    width: 17
  },
  exactView: {
    alignItems: "flex-end",
    flex: 1
  },
  exactTouchable: {
    flexDirection: "row"
  },
  topLabelView: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "transparent"
  },
  topLabelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272935"
  },
  exactLabelText: {
    fontSize: 13,
    fontWeight: "bold",
    right: 5,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default BedAndBathFilterView;
