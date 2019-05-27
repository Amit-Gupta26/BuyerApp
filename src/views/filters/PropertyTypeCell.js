import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { propertyTypeData } from '../../data/PropertyTypeData'

const homeIcon = './../../assets/image/Filter-Home-Icon.png';

class PropertyTypeCell extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      propTypeArray: [],
      propTypeDisplayText: ''
    }
  }

  handlePropTypeClick() {
    const { navigate } = this.props.navigation;

    navigate('PropertyTypeSelView', {
      onGoBack: (localPropArray, propertyTypeValue, propertyType) => this.refreshView(localPropArray, propertyTypeValue, propertyType),
      propTypeArray: this.state.propTypeArray,
      propTypeDisplayText: this.state.propTypeDisplayText
    });
  }

  refreshView(localPropArray, propertyTypeValue, propertyType) {
    this.setState({
      propTypeArray: localPropArray,
      propTypeDisplayText: propertyTypeValue
    })
    this.props.updateValue(propertyType)
  }

  changedValue(propTypeArray) {
    this.setValues(propTypeArray)
  }

  componentWillMount() {
    this.setValues(this.props.propTypeArray)
  }

  setValues(propArray) {
    var tempPropertyTypeArray = []
    var tempPropertyTypeValue = ''


    if (propArray.length == 0) {
      tempPropertyTypeValue = 'ALL'
    }
    else {
      for (let j = 0; j < propArray.length; j++) {
        var id = propArray[j]
        for (let i = 0; i < propertyTypeData.length; i++) {
          var propertyTypeId = propertyTypeData[i].id
          if (propertyTypeId == id) {
            tempPropertyTypeValue += propertyTypeData[i].value
            let com = {
              'value': propertyTypeData[i].value,
              'id': propertyTypeData[i].id
            }
            tempPropertyTypeArray.push(com)
            break;
          }
        }
        if (propArray.length != j + 1) {
          tempPropertyTypeValue += ", "
        }
      }
    }
    this.setState({
      propTypeArray: tempPropertyTypeArray,
      propTypeDisplayText: tempPropertyTypeValue
    })
  }


  render() {
    let type = this.props.type

    return (
      <TouchableOpacity style={styles.topView} onPress={() => this.handlePropTypeClick()}>
        <View style={styles.topLabelView}>
          <View style={styles.arrangeColumn}>
            <Text style={styles.topLabelText}>{type}</Text>
            <Text style={styles.propertyTypeLabelText}>{this.state.propTypeDisplayText}</Text>
          </View>
          <View style={styles.imageBaseView}>
            <View style={styles.imageTopView}>
              <Image style={styles.imageMainCon}
                source={require(homeIcon)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageBaseView: {
    alignItems: "flex-end",
    flex: 1
  },
  imageTopView: {
    flexDirection: "row",
    right: 20,
    top: 10
  },
  imageMainCon: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  topView: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  topLabelView: {
    flexDirection: "row",
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "transparent"
  },
  arrangeColumn: {
    flexDirection: "column",
    marginHorizontal: 18,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "transparent"
  },
  topLabelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272935",
    marginBottom: 10
  },
  propertyTypeLabelText: {
    fontSize: 13,
    width: 250,
    color: "#0B2B80"
  }
});

export default PropertyTypeCell;
