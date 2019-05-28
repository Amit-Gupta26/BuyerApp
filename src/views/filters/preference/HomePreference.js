import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import ExteriorPreference from "../preference/ExteriorPreference";
import InteriorPreference from "../preference/InteriorPreference";
import CommunityPreference from "./CommunityPreference";

class HomePreference extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      expanded: false,
      isExteriorExpand: false,
      isInteriorExpand: false,
      isCommunityExpand: false
    }
  }

  onPreferenceClicked = (type) => {
    if (type == "exterior") {
      this.setState({ isExteriorExpand: !this.state.isExteriorExpand, isInteriorExpand: false, isCommunityExpand: false });
    } else if (type == "interior") {
      this.setState({ isInteriorExpand: !this.state.isInteriorExpand, isExteriorExpand: false, isCommunityExpand: false });
    } else {
      this.setState({ isCommunityExpand: !this.state.isCommunityExpand, isInteriorExpand: false, isExteriorExpand: false });
    }
  }

  _onTagPress = tagTitle => {
    alert(tagTitle)
  };

  render() {
    const exteriorImage = this.state.isExteriorExpand ? require('../../../assets/image/upArrow.png'): require('../../../assets/image/downArrow.png');
    const interiorImage = this.state.isInteriorExpand ? require('../../../assets/image/upArrow.png'): require('../../../assets/image/downArrow.png');
    const communityImage = this.state.isCommunityExpand ? require('../../../assets/image/upArrow.png'): require('../../../assets/image/downArrow.png');
    return (
      <View style={styles.container}>
        <Text style={styles.preferenceTitle}>Home Feature Preferences</Text>
        <Text style={styles.preferenceSubTitle}>Choose feature preferences to highlight your best matches(all properties will be shown.)</Text>
        <View style={styles.dividerView} />
        <TouchableHighlight style={styles.button} underlayColor={'transparent'} onPress={() => this.onPreferenceClicked("exterior")}>
          <View style={styles.exteriorContainer}>
            <Image source={require('../../../assets/image/ic_features_exterior.png')} style={styles.leftImage} resizeMode='contain' />
            <Text style={styles.exteriorLabelName}>Exterior Home Features</Text>
            <View style={styles.exteriorRightImageContainer}>
              <Text style={styles.countText}>(+1)</Text>
              <Image source={exteriorImage} style={styles.rightImage} resizeMode='contain' />
            </View>
          </View>
        </TouchableHighlight>
        {this.renderExteriorComponent()}
        <View style={styles.dividerView} />
        <TouchableHighlight style={styles.button} underlayColor={'transparent'} onPress={() => this.onPreferenceClicked("interior")}>
          <View style={styles.exteriorContainer}>
            <View style={styles.dividerView} />
            <Image source={require('../../../assets/image/ic_features_interior.png')} style={styles.leftImage} resizeMode='contain' />
            <Text style={styles.exteriorLabelName}>Interior Home Features</Text>
            <View style={styles.exteriorRightImageContainer}>
              <Text style={styles.countText}>(+1)</Text>
              <Image source={interiorImage} style={styles.rightImage} resizeMode='contain' />
            </View>
          </View>
        </TouchableHighlight>
        {this.renderInteriorComponent()}
        <View style={styles.dividerView} />
        <TouchableHighlight style={styles.button} underlayColor={'transparent'} onPress={() => this.onPreferenceClicked("community")}>
          <View style={styles.communityContainer}>
            <View style={styles.dividerView} />
            <Image source={require('../../../assets/image/ic_features_community.png')} style={styles.leftImage} resizeMode='contain' />
            <Text style={styles.exteriorLabelName}>Neighborhood Features</Text>
            <View style={styles.exteriorRightImageContainer}>
              <Text style={styles.countText}>(+1)</Text>
              <Image source={communityImage} style={styles.rightImage} resizeMode='contain' />
            </View>
          </View>
        </TouchableHighlight>
        {this.renderCommunityComponent()}
      </View>
    );
  }

  renderExteriorComponent() {
    return (
      <ExteriorPreference
        isExteriorExpand={this.state.isExteriorExpand}
        navigation={this.props.navigation}
        onTagPress={tagTitle => this._onTagPress(tagTitle)}
      />
    );
  }

  renderInteriorComponent() {
    return (
      <InteriorPreference
        isInteriorExpand={this.state.isInteriorExpand}
        navigation={this.props.navigation}
        onTagPress={tagTitle => this._onTagPress(tagTitle)}
      />
    );
  }

  renderCommunityComponent() {
    return (
      <CommunityPreference
        isCommunityExpand={this.state.isCommunityExpand}
        navigation={this.props.navigation}
        onTagPress={tagTitle => this._onTagPress(tagTitle)}
      />
    );
  }
}

export default HomePreference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  preferenceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272935",
    marginTop: 10,
    marginLeft: 20
  },
  preferenceSubTitle: {
    color: '#B1B2B6',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 20,
    fontWeight: '500'
  },
  dividerView: {
    borderBottomWidth: 1.0,
    borderBottomColor: "#E2E2E2",
    marginTop: 10
  },
  exteriorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10
  },
  exteriorRightImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    alignItems: 'center',
  },
  leftImage: {
    width: 20,
    height: 20,
    marginLeft: 30
  },
  exteriorLabelName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#272935",
    marginLeft: 5,
    marginTop: 2
  },
  rightImage: {
    width: 15,
    height: 20,
    marginRight: 10,
    marginLeft: 5
  },
  countText: {
    fontSize: 14,
    color: "#B1B2B6",
    marginLeft: 5
  },
  button: {
    backgroundColor: 'white'
  },
  communityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10
  },
});

