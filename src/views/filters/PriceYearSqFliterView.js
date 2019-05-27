import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Modal
} from "react-native";
const { width, height } = Dimensions.get("window");

class PriceYearSqFliterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      minValue: 'No Min',
      maxvalue: 'No Max',
      minSection: false,
      maxSection: false,
      minValueSelIndex: 0,
      maxValueSelIndex: 0,
      minValueSelection: 'No Min',
      maxValueSelection: 'No Max',
      modalVisible: false,
      minCom: this.props.defaultMinValue,
      maxCom: this.props.defaultMaxValue
    }
  }

  componentWillMount(){
    for (let i = 0; i < this.props.minValueData.length; i++) {
      let value = this.props.minValueData[i]
      if (value['id'] == this.props.preSelectedMinValue){
        this.state.minCom = value['id'];
        this.state.minValueSelection = value['value'];
        this.state.minValueSelIndex = i;
        this.state.minValue = value['value'];
        break
      }
    }

    for (let i = 0; i < this.props.maxValueData.length; i++) {
      let value = this.props.maxValueData[i]
      if (value['id'] == this.props.preSelectedMaxValue){
        this.state.maxCom = value['id'];
        this.state.maxValueSelection = value['value'];
        this.state.maxValueSelIndex = i;
        this.state.maxvalue = value['value'];
        break;
      }
    }

    console.log("show data");
  }

  _minButtonClicked() {
    this.setState({
      minSection: true,
      modalVisible: !this.state.modalVisible
    })
    this.props.openPickerTap(this.props.type)

  }
  _updateMinValueClicked() {
    this.setState({ minCom: this.props.minValueData[this.state.minValueSelIndex]['id'] })
    this.setState({
      minValue: this.state.minValueSelection,
      modalVisible: !this.state.modalVisible,
      minSection: false
    })
    // this.props.preSelectedMinValue = this.state.minValue
    this.props.dismissPickerTap()
    this.props.itemClick(this.props.minValueData[this.state.minValueSelIndex]['id'] + "-" + this.state.maxCom, this.props.minValueData[this.state.minValueSelIndex]['id'], this.state.maxCom)

  }

  _maxButtonClicked() {
    this.setState({
      maxSection: true,
      modalVisible: !this.state.modalVisible
    })
    this.props.openPickerTap(this.props.type)
  }

  _updateMaxValueClicked() {
    this.setState({ maxCom: this.props.maxValueData[this.state.maxValueSelIndex]['id'] })
    this.setState({
      maxvalue: this.state.maxValueSelection,
      modalVisible: !this.state.modalVisible,
      maxSection: false
    })
    this.props.dismissPickerTap()
    this.props.itemClick(this.state.minCom + "-" + this.props.maxValueData[this.state.maxValueSelIndex]['id'], this.state.minCom, this.props.maxValueData[this.state.maxValueSelIndex]['id'])
  }

  minClicked(itemValue, itemIndex) {
    this.setState({
      minValue: itemValue,
      minCom: this.props.minValueData[itemIndex]['id'],
      minValueSelection: this.props.minValueData[itemIndex]['value']
    })
    this.props.itemClick(this.props.minValueData[itemIndex]['id'] + "-" + this.state.maxCom, this.props.minValueData[itemIndex]['id'], this.state.maxCom )
  }

  maxClicked(itemValue, itemIndex) {
    this.setState({
      maxvalue: itemValue,
      maxCom: this.props.maxValueData[itemIndex]['id'],
      maxValueSelection: this.props.maxValueData[itemIndex]['value']

    })
    this.props.itemClick(this.state.minCom + "-" + this.props.maxValueData[itemIndex]['id'], this.state.minCom, this.props.maxValueData[itemIndex]['id'] )
  }

  changeValue(minValue, maxValue) {
    this.state.minValueSelection = minValue
    this.state.minValue = minValue
    this.state.minCom = minValue
    this.state.maxValueSelection = maxValue
    this.state.maxvalue = maxValue
    this.state.maxCom = maxValue
    this.props.itemClick(minValue + "-" + maxValue, minValue , maxValue )
  }

  ristrictMinvalue = (itemValue) => {
    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= this.props.minValueData.length; i++) {
      let tempObject = this.props.minValueData[i];
      if (tempObject.value == itemValue) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= this.props.maxValueData.length; i++) {
      let tempObject = this.props.maxValueData[i];
      if (tempObject.value == this.state.maxValueSelection) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (minIndex == 0) {
        this.setState({
          minValueSelection: itemValue,
          minValueSelIndex: minIndex
        });
      } else if (maxIndex != 0) {
        this.setState({
          minValueSelection: this.props.minValueData[maxIndex - 1].value,
          minValueSelIndex: maxIndex - 1
        });
      } else {
        this.setState({
          minValueSelection: itemValue,
          minValueSelIndex: minIndex
        });
      }
    } else {
      this.setState({
        minValueSelection: itemValue,
        minValueSelIndex: minIndex
      });
    }
  }
  

  ristrictMaxvalue = (itemValue) => { 
    var minIndex = 0;
    var maxIndex = 0;

    for (let i = 0; i <= this.props.minValueData.length; i++) {
      let tempObject = this.props.minValueData[i];
      if (tempObject.value == this.state.minValueSelection) {
        minIndex = i;
        break;
      }
    }

    for (let i = 0; i <= this.props.maxValueData.length; i++) {
      let tempObject = this.props.maxValueData[i];
      if (tempObject.value == itemValue) {
        maxIndex = i;
        break;
      }
    }

    if (minIndex < maxIndex == false) {
      if (maxIndex == 0) {
        this.setState({
          maxValueSelection: itemValue,
          maxValueSelIndex: maxIndex
        });
      } else if (minIndex == this.props.minValueData.length - 1) {
        this.setState({
          maxValueSelection: "No Max",
          maxValueSelIndex: 0
        });
      } else if (minIndex != 0) {
        this.setState({
          maxValueSelection: this.props.maxValueData[minIndex + 1].value,
          maxValueSelIndex: minIndex + 1
        });
      } else {
        this.setState({
          maxValueSelection: itemValue,
          maxValueSelIndex: maxIndex
        });
      }
    } else {
      this.setState({
        maxValueSelection: itemValue,
        maxValueSelIndex: maxIndex
      });
    }
  };


  render() {
    let type = this.props.type
    this.state.listDatasource = this.props.dataItemsArray
    this.state.exactListDatasource = this.props.exactDataItemsArray

    return (
      <View style={styles.topView}>
        <View style={styles.cellType}>
          <Text style={styles.eTextView}>{type}</Text>
        </View>
        <View style={styles.minPicker}>
          <View style={styles.pickerLabeView}>
            <Text style={styles.minTextView}>Min</Text>
            {this.renderMinComponent()}
          </View>
          <View style={styles.dividerView}>
          </View>
          <View style={styles.pickerLabeView}>
            <Text style={styles.maxTextView}>Max</Text>
            {this.rendermaxComponent()}
          </View>
        </View>
        {this.renderPickerComponent()}
      </View>
    );
  }

  renderMinComponent() {

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity style={styles.textViewTopView} onPress={() => this._minButtonClicked()} >
          <Text style={[styles.iphoneMaxTextView, { right: 5 }]}>{this.state.minValueSelection}</Text>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={styles.textViewTopView}>
          <Picker
            style={styles.mainPicker}
            selectedValue={this.state.minValueSelection}
            onValueChange={(itemValue, itemIndex) => this.minClicked(itemValue, itemIndex)}>
            {
              this.props.minValueData.map((item, index) => {
                return (< Picker.Item label={item.label} value={item.value} key={index} />);
              })
            }
          </Picker>
        </View>
      )

    }
  }

  rendermaxComponent() {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity style={styles.textViewTopView} onPress={() => this._maxButtonClicked()} >
          <Text style={[styles.iphoneMaxTextView]}>{this.state.maxValueSelection}</Text>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <View style={styles.textViewTopView}>
          <Picker
            style={styles.mainPicker}
            selectedValue={this.state.maxValueSelection}
            onValueChange={(itemValue, itemIndex) => this.maxClicked(itemValue, itemIndex)}>
            {
              this.props.maxValueData.map((item, index) => {
                return (< Picker.Item label={item.label} value={item.value} key={index} />);
              })
            }
          </Picker>
        </View>
      )
    }
  }

  tempFunc(itemValue, itemIndex) {
    this.state.minValueSelection = itemValue
    this.state.minValueSelIndex = itemIndex

  }

  renderPickerComponent() {
    if (this.state.minSection) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={styles.pickerView}>
            <View style={styles.doneButtonTopView}>
              <TouchableHighlight
                style={styles.doneButTopView}
                underlayColor='transparent'
                onPress={() => this._updateMinValueClicked()}>
                <View style={styles.doneTextView}>
                  <Text style={styles.doneButton}>Done</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.pickerTopView}>
              <Picker
                selectedValue={this.state.minValueSelection}
                style={styles.pickerStyle}
                // onValueChange={(itemValue, itemIndex) => this.setState({
                //   minValueSelection: itemValue,
                //   minValueSelIndex: itemIndex
                // })}>
                onValueChange={(itemValue, itemIndex) =>
                  // this.setState({ minPickerSelection: itemValue })
                  this.ristrictMinvalue(itemValue)
                }>
                {
                  this.props.minValueData.map((item, index) => {
                    return (< Picker.Item label={item.label} value={item.value} key={index} />);
                  })
                }
              </Picker>
            </View>
          </View>
        </Modal>
      )
    }

    if (this.state.maxSection) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>


          <View style={styles.pickerView}>
            <View style={styles.doneButtonTopView}>
              <TouchableHighlight
                style={styles.doneButTopView}
                underlayColor='transparent'
                onPress={() => this._updateMaxValueClicked()}>
                <View style={styles.doneTextView}>
                  <Text style={styles.doneButton}>Done</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.pickerTopView}>
              <Picker
                selectedValue={this.state.maxValueSelection}
                style={styles.pickerStyle}
                // onValueChange={(itemValue, itemIndex) => this.setState({
                //   maxValueSelection: itemValue,
                //   maxValueSelIndex: itemIndex
                // })}>
                onValueChange={(itemValue, itemIndex) =>
                  // this.setState({ minPickerSelection: itemValue })
                  this.ristrictMaxvalue(itemValue)
                }>
                {
                  this.props.maxValueData.map((item, index) => {
                    return (< Picker.Item label={item.label} value={item.value} key={index} />);
                  })
                }
              </Picker>
            </View>
          </View>
        </Modal>

      )
    }
  }
}

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "white",
    alignSelf: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0
  },
  pickerStyle: {
    flex: 1
  },
  pickerTopView: {
    height: 300,
    backgroundColor: 'white'
  },
  minPicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 18,
    height: 30
  },
  pickerLabeView: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 30,
    width: (width - 42) / 2
  },
  cellType: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "transparent",
    height: 40
  },
  minTextView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 30,
    height: 30,
    fontWeight: "bold",
    color: "#B1B2B6",
    paddingVertical: 4,
    alignItems: "flex-start"
  },
  iphoneMaxTextView: {
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: 80,
    height: 30,
    color: "#0B2B80",
    paddingVertical: 4,
    backgroundColor: 'transparent'

  },
  textViewTopView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 100,
    height: 30,
    fontWeight: "bold",
    color: "#B1B2B6",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: 'transparent'
  },
  maxTextView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 30,
    height: 30,
    fontWeight: "bold",
    color: "#B1B2B6",
    marginLeft: 10,
    paddingVertical: 4,
    alignItems: "flex-start"
  },
  eTextView: {
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
  dividerView: {
    width: 1,
    height: 30,
    marginLeft: 0,
    backgroundColor: "#B1B2B6",
    width: 1
  },
  doneButton: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'normal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerView: {
    position: 'relative',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: height - 300
  },
  doneButTopView: {
    backgroundColor: 'transparent',
    width: 100,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doneButtonTopView: {
    backgroundColor: '#507BA8',
    width: '100%',
    height: 44,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  doneTextView: {
    backgroundColor: 'transparent',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  mainPicker: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    bottom: 5, left: 80,
    right: 0,
    height: 30,
    color: "#0B2B80"
  }
});

export default PriceYearSqFliterView;
