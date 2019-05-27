import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
  Animated,
  Platform,
  Dimensions
} from "react-native";
import SearchFlatList from "./../../components/SearchList";
import SearchMapView from "./../../components/SearchMap";
import SearchSwipeView from "./../../components/SearchSwipe";
import ActivityIndicator from "../../components/ActivityLoader";
import { RECENT_SEARCH, retrieveJsonItem } from "../../data/local";
import { observer, inject } from "mobx-react";
import { NavigationEvents } from "react-navigation";
import QuickView from "../../components/QuickView";

const { width, height } = Dimensions.get("window");

const tabViewTypes = {
  map: "MAP",
  list: "LIST",
  swipe: "SWIPE"
};

class SearchScreen extends Component {
  state = {
    selectedTabViewType: "MAP",
    isInputText: false,
    searchText: 'Search by city, state, ZIP, school',
    bounceValue: new Animated.Value(225),  //This is the initial position of the subview
    buttonText: "Show Subview",
    itemTempValue: [],
    propAddress: [],
  };

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { searchStore } = this.props;
    retrieveJsonItem(RECENT_SEARCH)
      .then(data => {
        if (data) {
          const recentSearch = JSON.parse(data);
          console.log(`${recentSearch.searchUrl}?${recentSearch.filters}`);
          this.props.searchStore.searchText = recentSearch.searchTerm;
          this.setState({
            isLoading: true,
            isInputText: true
          });
          var mlsSearch;
          if (recentSearch.searchUrl.indexOf("searchbyid") > -1) {
            this.props.searchStore.isMlsSearch = true;
            mlsSearch = true;
          } else {
            searchStore.fetchCentroid(recentSearch.searchId);
            mlsSearch = false;
          }
          if (recentSearch.filters) {
            searchStore.setSearchURLData(
              `${recentSearch.searchUrl}?${recentSearch.filters}`,
              true, mlsSearch
            );
          } else {
            searchStore.setSearchURLData(recentSearch.searchUrl, false, mlsSearch);
          }
        }
      })
      .then(error => console.log("error"));
  }
  _handleMapListSwipeTabClicked = value => {
    this.quickViewDismiss();
    this.setState({ selectedTabViewType: value });
  };

  _handleFilterClicked = () => {
    this.quickViewDismiss()
    this.props.navigation.navigate('Filter', {
    });
  }


  filterValue(value) {
    this.props.searchStore.updateBeds(value['beds']);
    this.props.searchStore.updateBaths(value['baths']);
    this.props.searchStore.updatePriceRange(value['priceRange']);
    this.props.searchStore.updateYearBuilt(value['yearBuilt']);
    this.props.searchStore.updateSquareFeet(value['squareFeet']);
    this.props.searchStore.updatePropertyTypes(value['propTypeArray']);
    this.props.searchStore.updatePriceReduced(value['priceReduced']);
    this.props.searchStore.updateOpenHouse(value['openHouse']);
    this.props.searchStore.updateListingType(value['listingType']);
    this.props.searchStore.updateDaysOnOwners(value['daysOnOwners']);
  }

  _onFavoriteTap = property => {
    alert("Favorite Tapped");
  };

  _onListItemTap = item => {
    this.props.navigation.navigate("PropertyDetails", {
      pdpUrl: item.listingUrl,
      address: item.propAddress.streetName
    });
  };

  _fecthSuggestions = () => {
    this.quickViewDismiss()
    this.props.navigation.navigate("SearchAutoSuggest", {
      onGoBack: (suggestionItem, type, isMlsSearch, searchTitle) =>
        this._onSuggestionClicked(suggestionItem, type, isMlsSearch, searchTitle),
      type: "search"
    });
  };

  _onSuggestionClicked = (suggestionItem, type, isMlsSearch, searchTitle) => {
    if (type == null || type == "recent_search") {
      var searchText;
      if (type == "recent_search") {
        const { searchStore } = this.props;
        this.setState({ isLoading: true, isInputText: true });
        searchStore.setSearchURLData(searchStore.searchUrl, false, searchStore.isMlsSearch);
      } else {
        if(suggestionItem.type=="ZIP"){
          searchText = suggestionItem.label;
        } else if (suggestionItem.level1Text != "" && suggestionItem.level2Text != "") {
          searchText = suggestionItem.level1Text + ", " + suggestionItem.level2Text;
        } else {
          searchText = suggestionItem.level1Text;
        }
        this.props.searchStore.searchText = searchText;
        this.setState({ isLoading: true, isInputText: true });
        if (!isMlsSearch) {
          this.props.searchStore.fetchCentroid(
            suggestionItem.id ? suggestionItem.id : ""
          );
          this.props.searchStore.fetchSearchURL(suggestionItem);
        }
      }
    } else {
      this._selectionType(type);
    }
  };

  _selectionType = type => {
    var selectionTitle = "";
    switch (type) {
      case "search_nearby":
        selectionTitle = "Search Near By Clicked";
        break;
      case "saved_search":
        selectionTitle = "Saved Search Clicked";
        break;
      case "home_near":
        selectionTitle = "Home Near By Clicked";
        break;
    }
    alert(selectionTitle);
  };

  componentWillReceiveProps() {
    BackHandler.exitApp();
  }

  _toggleSubview(value) {

    toValue = 0;
    if (value[0].sellerFirstName != undefined) {
      let cpl = Math.floor((width - 4) / (10 / 1.5) );

      let stringTempvalue = "Listing Courtesy of " + value[0].sellerFirstName + " " + value[0].sellerLastName + ", " + value[0].brokerageFirmName;
      numberOfLines = stringTempvalue.length / (width - 4)
      toValue = -23;
    }


    this.setState({
      itemTempValue: value[0],
      propAddress: value[0].propAddress
    })

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 5,
        tension: 2,
        friction: 8,
      }
    ).start();
  }

  quickViewDismiss() {

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 225,
        velocity: 5,
        tension: 2,
        friction: 8,
      }
    ).start();

  }
  
  render() {
    const { searchStore } = this.props;

    let mapContentView = (

      <View style={styles.container}>
        <NavigationEvents
          onDidBlur={payload => {
            this.quickViewDismiss()
          }} />

        <SearchMapView
          opacityVal={
            this.state.selectedTabViewType == tabViewTypes.map ? true : false
          }
          properties={searchStore.mapProperties}
          polygonCoordinates={searchStore.polygonCoordinates}
          isPropertyDetails={searchStore.isPropertyDetails}
          searchURL={searchStore.searchUrl}
          markerClicked={(value) => this._toggleSubview(value)}
          quickViewDismiss={() => this.quickViewDismiss()} />

        <Animated.View
          style={[styles.subView,
          { transform: [{ translateY: this.state.bounceValue }] }]}>

          <QuickView
            item={this.state.itemTempValue}
            propAddress={this.state.propAddress}
            isFavourite={false}
          />
        </Animated.View>
      </View>
    );
    let listContentView = (
      <SearchFlatList
        opacityVal={
          this.state.selectedTabViewType == tabViewTypes.list ? true : false
        }
        properties={searchStore.listProperties}
        listTapAction={this._onListItemTap}
        favTapAction={this._onFavoriteTap}
      />
    );
    if (this.state.selectedTabViewType == tabViewTypes.swipe) {
      contentView = <SearchSwipeView properties={[]} />;
    }

    if (searchStore.isLoading) {
      listContent = <ActivityIndicator />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#0B2B80" barStyle={Platform.OS == 'ios' ? "dark-content" : "light-content"} />
        <View style={styles.searchBar}>
          <View style={styles.inputView}>
            <Image source={require('../../assets/image/ic_search.png')} style={styles.inputSearchIcon} />
            <Text onPress={() => this._fecthSuggestions()} overflow="hidden" style={styles.inputTextStyle} 
                  testID={"srpSearchInputText"} nativeID={"srpSearchInputText"}
                  accessibilityLabel={"srpSearchInputText"}>{searchStore.searchText}</Text>
          </View>
        </View>
        <View style={styles.mapListSwipeTabContainer}>
          {this.state.selectedTabViewType == tabViewTypes.map ? (
            <View style={styles.selectedTabViewState}>
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.map)
                }
              >
                <Text style={styles.selectedTabViewTitleText}>MAP</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.map)
                }
              >
                <Text style={styles.tabViewTitleText}>MAP</Text>
              </TouchableOpacity>
            )}
          {this.state.selectedTabViewType == tabViewTypes.list ? (
            <View style={styles.selectedTabViewState}>
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.list)
                }>
                <Text style={styles.selectedTabViewTitleText}>LIST</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.list)
                }
              >
                <Text style={styles.tabViewTitleText}>LIST</Text>
              </TouchableOpacity>
            )}
          {this.state.selectedTabViewType == tabViewTypes.swipe ? (
            <View style={styles.selectedTabViewState}>
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.swipe)
                }
              >
                <Text style={styles.selectedTabViewTitleText}>SWIPE</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  this._handleMapListSwipeTabClicked(tabViewTypes.swipe)
                }
              >
                <Text style={styles.tabViewTitleText}>SWIPE</Text>
              </TouchableOpacity>
            )}
          <View style={styles.tabViewFilterText}>
            <TouchableOpacity onPress={() => this._handleFilterClicked()}>
              <Text style={styles.tabViewTitleText}>FILTERS</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mapListContainer}>
          {mapContentView}
          {listContentView}
        </View>
      </SafeAreaView>
    );
  }
}
export default inject("searchStore")(observer(SearchScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B2B80',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 225,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 4,
    paddingTop: 4,
    backgroundColor: "#0B2B80"
  },
  mapListSwipeTabContainer: {
    width: "100%",
    height: 40,
    alignItems: "center",
    backgroundColor: "#0B2B80",
    fontWeight: "bold",
    fontSize: 20,
    flexDirection: "row",
    color: "white",
    borderTopWidth: 1.0,
    borderColor: "#2C2A2A70"
  },
  selectedTabViewState: {
    margin: 5,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8C8E9B"
  },
  selectedTabViewTitleText: {
    color: "#1F47AF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 12
  },
  tabViewTitleText: {
    color: "white",
    padding: 14,
    alignItems: "flex-end",
    fontWeight: "bold",
    fontSize: 12
  },
  tabViewFilterText: {
    flex: 1,
    alignItems: "flex-end"
  },
  inputView: {
    backgroundColor: "#314C90",
    borderRadius: 4,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 3,
    paddingLeft: 28,
    paddingRight: 10,
    marginTop: 3,
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 10,
    color: "white"
  },
  inputTextStyle: {
    color: 'white',
    width: "100%",
    height: 20,
    fontSize: 13
  },
  mapListContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputSearchIcon: {
    width: 10,
    height: 10,
    tintColor: 'white',
    position: 'absolute',
    left: 12,
    right: 0,
  },

});
