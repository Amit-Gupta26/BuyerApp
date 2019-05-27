import React, { Component } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

class PropertyTypeItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.title);
  };

  render() {
    const textColor = this.props.selected ? '#0B2B80' : 'grey';
    const fontWeight = this.props.selected ? 'bold' : 'normal';
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{width: '100%', height: 44, paddingLeft: 20, justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'white'}}>
          <Text style={{ color: textColor, fontWeight: 'bold', fontWeight: fontWeight }}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.seperaterLine}></View>
      </TouchableOpacity>
    );
  }
}

class OnBoardingPropertyTypeSelectionView extends Component {
  static navigationOptions = {
    header: null
  };

  state = {selected: (new Map())};

  _keyExtractor = (item, index) => index.toString();

  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item,index}) => (
    <PropertyTypeItem
      id={item.title}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.title)}
      title={item.title}
    />
  );

  _extractSelectedPropertyTypes() {

    var selectedValueList = []

    if (this.state.selected.size > 0) {
      for (let value of this.state.selected) {
        if (value[1] == true) {
          selectedValueList.push(value[0])
        }
      }
    }

    if (selectedValueList.length == 0) {
      selectedValueList = ['All']
    }

    return selectedValueList
  }
  
  render() {
    const { navigate } = this.props.navigation;

    var data=[{ title: 'Single Family Home'}, { title: 'Condo' }, { title: 'Land'}, { title: 'Multi-family' }, { title: 'Farm/Ranch' },
              { title: 'Triplex' }, { title: 'Duplex' }, { title: 'Modular' }, { title: 'Coop'}, { title: 'Quadraplex' }, { title: 'Studio' }]

    return (

      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={styles.skipResultcontainer}>
          <View style={styles.backToSearch}>
            <TouchableHighlight
            underlayColor='transparent'
              style={{ backgroundColor: 'yellow' }}
              onPress={() => navigate('OnBoardingOtherFilters')}>
              <View style={{ height: 30 }}>
                <Image
                  source={require('../../assets/image/blueBack.png')}
                  style={{ height: 40, width: 50 }}
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.skipResult}>
            <TouchableHighlight
              style={{ backgroundColor: 'transparent' }}
              underlayColor='transparent'
              onPress={() => navigate('Main')}>
              <View style={{ justifyContent: "center" }}>
                <Text style={{ color: '#0B2B80', fontSize: 16, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'transparent' }}>Clear All</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.allContainer}>
          <View style={styles.groupedContainer}>
            <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
          <TouchableHighlight
            style={{ backgroundColor: 'transparent', height: 50 }}
            onPress={() => {
              //11111111
              this.state.selected
              navigate('OnBoardingOtherFilters', {selectedPropertyTypes: this._extractSelectedPropertyTypes()})
              }}>
            <View style={styles.nextContainer}>
              <Text style={styles.nextTextStyle}>Apply Property  Type</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }

}
export default OnBoardingPropertyTypeSelectionView;



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  skipResultcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40
  },
  allContainer: {
    justifyContent: 'space-between',
    width: '100%',
    flex: 1
  },
  groupedContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1
  },
  blankContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
    width: '100%',
    height: 30,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'lightgrey',
    width: '100%',
    height: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  labelContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: 'green',
    width: '100%',
    height: 10
  },
  propertyTypeCell: {
    backgroundColor: 'white',
    height: 44,
    width: '100%',
    justifyContent: 'center',
    marginLeft: 10
  },
  textfieldContainer: {
    justifyContent: 'center',
    width: deviceWidth,
    padding: 4,
    height: 46
  },
  textHeadingStyle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#0B2B80'
  },
  textSubHeadingStyle: {
    fontSize: 13,
    color: 'lightgrey',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#0B2B80'
  },
  nextContainer: {
    justifyContent: 'center',
    backgroundColor: '#0B2B80',
    flex: 1,
  },
  locationIconContainer: {
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    width: 30,
    height: 30
  },
  skipResult: {
    justifyContent: 'center',
    width: 80,
    height: 40
  },

  nextTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#0B2B80'
  },

  backToSearch: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40
  },
  seperaterLine: {
    height: 1,
    width: "95%",
    backgroundColor: "#CED0CE",
    marginLeft: "5%"
  }

})
