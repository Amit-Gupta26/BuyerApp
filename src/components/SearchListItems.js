import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { NewBadgeTime, priceFormatter, MatchRankDetails } from '../utils/Helper';
import { KEY_HAS_APPLIED_PREFERENCES, retrieveItem } from '../data/local'
const { width, height } = Dimensions.get('window');
const PRICE_INCREASE = "Price Increase";
const PRICE_DECREASE = "Price Decrease"
class SearchListItems extends Component {

  _renderFavorite(item) {
    const { onFavClick } = this.props;
    let imagePath = require("../assets/image/fav_no.png");
    return <View style={styles.headerContainer}>
      {this._renderMlsInfo(item)}
      <TouchableOpacity onPress={() => onFavClick(item)}>
        <Image testID={"property_favorite_image"}
          nativeID={"property_favorite_image"}
          accessibilityLabel={"property_favorite_image"}
          source={imagePath} style={{ height: 50, width: 50 }} />
      </TouchableOpacity>
    </View>
  }
  _renderMlsInfo(item) {
    const mlsBoardUrl = `http:${item.mlsBoardImageURL}`;
    if (item.mlsBoardImageURL && item.mlsBoardImageURL.length > 0) {
      return <Image testID={"property_mls_board_image"}
        nativeID={"property_mls_board_image"}
        accessibilityLabel={"property_mls_board_image"}
        source={{ uri: mlsBoardUrl }} style={styles.mlsLogo} />
    } else if (item.mlsBoardName && item.mlsBoardName.length > 1) {
      return <Text testID={"property_mls_board_name"}
        nativeID={"property_mls_board_name"}
        accessibilityLabel={"property_mls_board_name"}
        style={styles.mlsBoardNameText}>{item.mlsBoardName}</Text>
    }
  }

  _renderMatchRankResult(item) {
    const { matchText, bgColor, imagePath } = MatchRankDetails(item.matchRankScore);
    return <View style={[styles.preferenceContainer, { backgroundColor: bgColor }]}>
      <Image testID={"property_preference_image"}
        nativeID={"property_preference_image"}
        accessibilityLabel={"property_preference_image"}
        source={imagePath} style={{ resizeMode: 'contain' }} />
      <Text testID={"property_preference_text"}
        nativeID={"property_preference_text"}
        accessibilityLabel={"property_preference_text"}
        style={styles.preferenceText}>{matchText}</Text>
    </View>
  }

  _renderMlsId(mlsID) {
    return <Text testID={"property_mls_id"}
      nativeID={"property_mls_id"}
      accessibilityLabel={"property_mls_id"}
      style={styles.mlsId}>MLS#: {mlsID}</Text>
  }

  _renderFeatureTag() {
    let imagePath = require("../assets/image/featured.png");
    return <View style={{ alignItems: 'flex-end', marginHorizontal: '5%' }}>
      <Image source={imagePath} style={{ resizeMode: 'contain' }} />
    </View>
  }

  _renderNewTag(item) {
    return <View style={{ borderRadius: 2, backgroundColor: '#4BD385' }}>
      <Text testID={"property_new_tag"}
        nativeID={"property_new_tag"}
        accessibilityLabel={"property_new_tag"} style={styles.newText}>{"NEW  "}
        <Text style={{ color: '#303648' }}>{`${NewBadgeTime(item.newPropertyText)}`}</Text>
      </Text>
    </View>
  }

  _renderOpenHouse() {
    return <View style={styles.openHouse}>
      <Text testID={"property_open_house_tag"}
        nativeID={"property_open_house_tag"}
        accessibilityLabel={"property_open_house_tag"} style={styles.openHouseText}>OPEN
    </Text>
    </View>
  }

  _renderOpenHouseDate(date) {
    return <View style={styles.openHouseDate}>
      <Text testID={"property_open_house_date"}
        nativeID={"property_open_house_date"}
        accessibilityLabel={"property_open_house_date"} style={styles.openHouseText}>{date}
      </Text>
    </View>
  }

  _renderPriceChangeStatus(priceChangeDetails, hasNewOpen) {
    const priceIncreased = priceChangeDetails.deltaType === PRICE_INCREASE;
    const priceDeltaImg = priceIncreased
      ? require("../assets/image/Increase-Big.png")
      : require("../assets/image/Decrease-Big.png");
    return <View style={[styles.priceChangesView, { backgroundColor: priceIncreased ? '#EFAC42' : '#4BD385' }]}>
      <Image source={priceDeltaImg} style={styles.priceChangeImg} />
      {!hasNewOpen && <Text style={styles.priceChangeText} testID={"property_price_change_text"}
        nativeID={"property_price_change_text"}
        accessibilityLabel={"property_price_change_text"}>
        {priceIncreased ? "PRICE INCREASED" : "PRICE DECREASED"}</Text>}
    </View>
  }

  _renderPriceAndAddress(item) {
    return <View style={styles.priceAddressBackground}>
      <Text testID={"property_price"}
        nativeID={"property_price"}
        accessibilityLabel={"property_price"}
        style={styles.priceText}>
        ${priceFormatter(item.listPrice)}{"  "}
        <Text testID={"property_beds_baths_area"}
          nativeID={"property_beds_baths_area"}
          accessibilityLabel={"property_beds_baths_area"}
          style={{ fontSize: 12, paddingHorizontal: "3%" }}>
          {item.bedCount} Beds • {item.bathCount} Baths • {item.size} ft²
      </Text>
      </Text>
      <Text testID={"property_address"}
        nativeID={"property_address"}
        accessibilityLabel={"property_address"}
        style={[styles.addressText, 
        { marginBottom: item.showMLSID && item.mlsID ? "1%" : "3%" }]}>{item.propAddress.streetName}, {item.propAddress.city},{" "}
        {item.propAddress.state} {item.propAddress.zip}</Text>
      {item.showMLSID && item.mlsID && this._renderMlsId(item.mlsID)}
    </View>
  }

  _renderFooterSeaction(item) {
    return <View style={styles.footerContainer}>
      <View style={{ flexDirection: 'row', marginHorizontal: "3%" }}>
        {item.hasOwnProperty('matchRankDetails') && this._renderMatchRankResult(item)}
        {/* {retrieveItem(KEY_HAS_APPLIED_PREFERENCES).then(preference => {
          if (preference) {
            alert(preference);
            // this._renderMatchRankResult(item);
          }
        }).catch(error =>  alert("error while retrieving preferences"))} */}
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: "3%", marginBottom: item.newProperty || item.hasOwnProperty('openHouse') || item.hasOwnProperty('priceChangeDetails') ? 5 : 0 }}>
        {item.newProperty && this._renderNewTag(item)}
        {item.hasOwnProperty('openHouse') && this._renderOpenHouse()}
        {item.hasOwnProperty('openHouse') && this._renderOpenHouseDate(item.openHouse.date)}
        {item.hasOwnProperty('priceChangeDetails') &&
          this._renderPriceChangeStatus(item.priceChangeDetails, item.newProperty && item.hasOwnProperty('openHouse'))}
      </View>
      {this._renderPriceAndAddress(item)}
    </View>
  }

  _renderListingCoutesey(item) {
    const { itemClick } = this.props;
    let sellerName, courtesyText;
    if (item.sellerFirstName && item.sellerLastName) {
      sellerName = `${item.sellerFirstName} ${item.sellerLastName}`
    }

    if (item.brokerageFirmName) {
      if (sellerName) {
        courtesyText = `${sellerName} , ${item.brokerageFirmName}`
      } else {
        courtesyText = item.brokerageFirmName;
      }
      return <TouchableHighlight style={styles.listingCourtesyView} underlayColor="white"
        onPress={() => {
          itemClick(item);
        }}>
        <Text testID={"property_listing_courtesy"}
          nativeID={"property_listing_courtesy"}
          accessibilityLabel={"property_listing_courtesy"}
          style={styles.listingCourtesyText}>{`Listing Courtesy of ${courtesyText}`}</Text>
      </TouchableHighlight>
    } else {
      return null;
    }

  }
  render() {
    const { imageArray, item, itemClick } = this.props;
    let images = imageArray !== undefined ? imageArray.slice(0, 3) : [""];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1000}
        >
          {images.map((source, i) => {
            console.log(source);
            return (
              <TouchableHighlight onPress={() => itemClick(item)}
                underlayColor="white">
                <ImageBackground
                  testID={"property_list_item"}
                  nativeID={"property_list_item"}
                  accessibilityLabel={"property_list_item"}
                  style={styles.imageContainer}
                  backgroundColor={"grey"}
                  source={{ uri: source }}
                >

                </ImageBackground>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        <View pointerEvents="none" style={{ width: "100%", height: height / 3.3, flexDirection: 'column', position: 'absolute' }}>
          {this._renderFavorite(item)}
          {item.highlighted && this._renderFeatureTag()}
          {this._renderFooterSeaction(item)}
          {this._renderListingCoutesey(item)}
        </View>
      </View>
    );
  }
}
export default SearchListItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    width: "100%",
  },
  imageContainer: {
    width: width,
    height: height / 3.3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 3
  },
  listingCourtesyView: {
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "grey",
  },
  listingCourtesyText: {
    fontSize: 10,
    color: 'black',
    fontWeight: Platform.OS === 'ios' ? "800" : "500",
    marginHorizontal: "3%",
    paddingVertical: 5,
    opacity: Platform.OS === 'ios' ? 0.7 : 0.6
  },
  mlsId: {
    fontWeight: "bold",
    fontSize: 10,
    color: 'white',
    marginHorizontal: "3%",
    marginBottom: "3%",
    opacity: 0.8
  },
  mlsLogo: {
    height: 40,
    width: 50,
    resizeMode: 'contain',
  },
  mlsBoardNameText: {
    backgroundColor: '#8C8E9B',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontWeight: '600'
  },
  priceAddressBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: 'column',
    width: "100%",
    alignItems: 'stretch'
  },
  openHouse: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    backgroundColor: '#BF6EB3',
    marginLeft: 3
  },
  openHouseDate: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#303648',
    marginLeft: 0
  },
  openHouseText: {
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: 'white',
    textAlignVertical: 'center'
  },
  newText: {
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 7,
    paddingVertical: 2,
    color: 'white',
    textAlignVertical: 'center'
  },
  priceText: {
    color: 'white',
    paddingVertical: 2,
    marginHorizontal: "3%",
    marginTop: Platform.OS === 'ios' ? "1.5%" : "1%",
    fontWeight: "500",
    fontSize: 22,
    fontFamily: "Graphik-Medium",
  },
  addressText: {
    fontWeight: "bold",
    fontSize: 11,
    color: 'white',
    marginBottom: "1%",
    marginHorizontal: "3%"
  },
  priceChangesView: {
    borderRadius: 2,
    backgroundColor: '#EFAC42',
    marginHorizontal: 2,
    flexDirection: 'row',
    marginHorizontal: 2
  },
  priceChangeImg: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 4
  },
  priceChangeText: {
    fontSize: 11,
    fontWeight: "bold",
    paddingRight: 5,
    paddingLeft: 3,
    paddingVertical: 2,
    color: 'white',
    textAlignVertical: 'center'
  },
  leftRoundedBox: {
    backgroundColor: '#FFDE59',
    borderTopLeftRadius: 5,
    width: 10,
    alignSelf: 'center',
    height: 5,
    marginHorizontal: 2,
  },
  rightRoundedBox: {
    backgroundColor: '#FFDE59',
    width: 10,
    height: 5,
    alignSelf: 'center',
    borderTopRightRadius: 5,
    marginHorizontal: 2,
  },
  rectagularBox: {
    backgroundColor: '#FFDE59',
    marginHorizontal: 2,
    alignSelf: 'center',
    width: 10,
    height: 5,
  },
  preferenceImageContainer: {
    backgroundColor: '#4167AC',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 3
  },
  preferenceContainer: {
    flexDirection: 'row',
    borderRadius: 2,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    marginBottom: 5
  },
  preferenceText: {
    textAlignVertical: 'center',
    marginHorizontal: 3,
    paddingHorizontal: 0,
    color: 'white',
    fontSize: 11,
    fontWeight: '800'
  }
});