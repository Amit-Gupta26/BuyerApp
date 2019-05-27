import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Picker,
    Platform,
    TouchableHighlight,
    Modal
} from "react-native";

const { width, height } = Dimensions.get("window");

class DaysOnOwnersCell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            selectedIndex: 0,
            daysOnOwners: 'Any',
            selected: false,
            daysOnOwnersChanged: 'Any',
            daysOnOwnersIndexValue: 0,
            modalVisible: false
        }
    }

    _iosPickerTrigger() {
        this.setState({
            selected: true,
            modalVisible: !this.state.modalVisible
        })
        this.props.openPickerTap(this.props.type)
    }

    _doneButtonPress(value) {
        this.setState({
            selected: false,
            daysOnOwners: this.state.daysOnOwnersChanged,
            modalVisible: !this.state.modalVisible
        })
        this.props.itemClick(this.props.dataItemsArray[this.state.daysOnOwnersIndexValue]['id'])
        this.props.dismissPickerTap()
    }

    _updateDaysOnOwners(value, itemIndex) {
        this.setState({
            daysOnOwners: value
        })

        this.props.itemClick(this.props.dataItemsArray[itemIndex]['id'])
    }
    

    setPreselectedValues(){
        if (this.props.clearTap == true){
          this.setState({
            daysOnOwners: 'Any',      
          })
          this.props.clearClicked(false)
        }
      }

      changeValue(value) {
        this.state.daysOnOwners = value
      }

      componentWillMount(){
        for (let i = 0; i < this.props.dataItemsArray.length; i++) {
          let value = this.props.dataItemsArray[i]
          if (value['id'] == this.props.preSelectedValue){
            this.state.daysOnOwners = value['value'];
            break
          }
        }
    }
    

    render() {
        let type = this.props.type

        return (
            <View style={styles.topLabelView}>
                <Text style={styles.cellType}>{type}</Text>
                {this.renderPicker()}
                {this.renderPickerComponent()}
            </View>
        );
    }

    renderPicker() {

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={styles.topView} onPress={() => this._iosPickerTrigger()} >
                    <Text style={styles.textViewiOS}>{this.state.daysOnOwners}</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View style={styles.topViewAndroid}>
                    <Picker
                        style={[styles.pickerViewAndroid]}
                        selectedValue={this.state.daysOnOwners}
                        onValueChange={(value, itemIndex) => this._updateDaysOnOwners(value, itemIndex)}>
                        {
                            this.props.dataItemsArray.map((item, index) => {
                                return (< Picker.Item label={item.label} value={item.value} key={index} />);
                            })
                        }
                    </Picker>
                </View>
            )
        }
    }

    renderPickerComponent() {
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
                            onPress={(value) => this._doneButtonPress(value)}>
                            <View style={styles.doneTextView}>
                                <Text style={styles.doneButton}>Done</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.pickerTopView}>
                        <Picker
                            selectedValue={this.state.daysOnOwnersChanged}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                daysOnOwnersChanged: itemValue,
                                daysOnOwnersIndexValue: itemIndex
                            })}>
                            {
                                this.props.dataItemsArray.map((item, index) => {
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

const styles = StyleSheet.create({
    pickerView: {
        position: 'relative',
        backgroundColor: 'white',
        left: 0,
        right: 0,
        top: height - 300
    },
    pickerViewAndroid: {
        position: 'relative',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        bottom: 0,
        left: 0,
        right: 0
    },
    pickerStyle: {
        flex: 1
    },
    pickerTopView: {
        height: 300,
        backgroundColor: 'white'
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
    doneButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'normal',
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneTextView: {
        backgroundColor: 'transparent',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    activeTabStyle: {
        backgroundColor: "#0B2B80"
    },
    topLabelView: {
        flexDirection: "column",
        backgroundColor: "white",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1.0
    },
    cellType: {
        top: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#272935",
        marginBottom: 15,
        left: 20
    },
    textViewiOS: {
        flex: 1,
        width: width - 20,
        height: 30,
        fontWeight: "bold",
        color: "#0B2B80",
        paddingVertical: 4,
        backgroundColor: 'transparent',
        left: 20 
    },
    topView: {
        backgroundColor: "transparent",
        width: width - 40,
        height: 30,
        fontWeight: "bold",
        color: "#B1B2B6",
        alignItems: "flex-start",
        backgroundColor: 'transparent',
        top: 0,
        bottom: 10
    },
    topViewAndroid: {
        width: width - 40,
        height: 30,
        backgroundColor: 'transparent',
        left: 12,
        marginBottom: 10
    }
});

export default DaysOnOwnersCell;
