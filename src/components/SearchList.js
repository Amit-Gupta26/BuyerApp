import React, { PureComponent } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import SearchListItems from "./SearchListItems";
import { observer, inject } from "mobx-react";
import StringUtil from "../utils/StringUtil";


var imageNewArray = [];


class SearchList extends PureComponent {

  imageArray(arrayData) {
    imageNewArray = [];
    if (arrayData != undefined) {
      for (i = 0; i <= 4; i++) {
        imageNewArray.push(arrayData[i])
      }
    }
    return imageNewArray
  }

  listingCourtesyPresent(item) {
    isPresnt = false;

    if (item.sellerFirstName) {
      isPresnt = true;
    }

    return isPresnt;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  };

  render() {
    return (
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={({ distanceFromEnd }) => {
          //Call API to fetch next page of data
          // console.log('on end reached ', distanceFromEnd);
          if (this.props.properties.length < 100 && this.props.searchStore.resultCount > this.props.properties.length) {
            var searchURL = this.props.searchStore.searchUrl;
            if (this.props.searchStore.isBoundaryCall == true) {
              searchURL = searchURL + '/' + (this.props.searchStore.currentListPageIndex + 1) + this.props.searchStore.boundaryURL + '&ajaxsearch=true';
            }
            else {
              searchURL = searchURL + '/' + (this.props.searchStore.currentListPageIndex + 1) + '?ajaxsearch=true';
            }
            this.props.searchStore.fetchListProperties(
              searchURL, this.props.searchStore.isBoundaryCall, this.props.searchStore.isPolygonSearch
            );
            this.props.searchStore.currentListPageIndex = this.props.searchStore.currentListPageIndex + 1;
          }
        }}
        ListFooterComponent={(
          this.props.properties.length < 100 && this.props.searchStore.resultCount > this.props.properties.length ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <ActivityIndicator size='large' color='#0B2B80' />
              {/* <Text>Loading please wait...</Text> */}
            </View>
            :
            <View></View>
        )}
        style={{ backgroundColor: "#fff" }}
        data={this.props.properties}
        renderItem={({ item, index }) => (
          <SearchListItems
            item={item}
            imageArray={item.imageUrlList}
            itemClick={item => this.props.listTapAction(item)}
            onFavClick={item => this.props.favTapAction(item)}
            // listingCourtesyPresent = {this.listingCourtesyPresent(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={this.props.opacityVal == true ? styles.showListFlatListStyle : styles.hideListFlatListStyle}
        opacity={this.props.opacityVal == true ? 1.0 : 0.0}
      />
    );
  }
}

const styles = StyleSheet.create({
  hideListFlatListStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '0%',
    height: '0%'
  },
  showListFlatListStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },
});
SearchList.propTypes = {
  properties: PropTypes.array.isRequired
};
export default inject("searchStore")(observer(SearchList));

