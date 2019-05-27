import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  Platform
} from "react-native";
import StringUtil from "../utils/StringUtil";

const { width, height } = Dimensions.get("window");


export const SearchListItem = props => {
  let detailViewHeight = Platform.OS == 'ios' ? 55 : 62
  const { item, itemClick, onFavClick, index, imageArray, listingCourtesyPresent } = props;
  let imagePath =
    index == 1
      ? require("../assets/image/fav_on.png")
      : require("../assets/image/fav_no.png");
  let mlsBoardurl = `http:${item.mlsBoardImageURL}`;
  let stringUtilobj = new StringUtil();

  let newproprtyText =
    item.newPropertyText == undefined
      ? ""
      : stringUtilobj._stringUtil(item.newPropertyText).toUpperCase();

  let newTextContent =
    item.newPropertyText == undefined ? null : (
      <Text style={styles.tagTextView}>
        {"NEW - "}   
        <Text style={{ color: 'white', marginLeft: 2 }}>
          { newproprtyText}
        </Text>
      </Text>
    );

  let listingCourtesy = listingCourtesyPresent == false ? null : (
    <View>
      <Text style={[styles.subHeaderText, { top: item.newPropertyText == undefined ? 102 : (Platform.OS == 'ios' ? 70 : 65) }]}>
        {"Listing Courtesy of " + item.sellerFirstName + " " + item.sellerLastName + ", " + item.brokerageFirmName}
      </Text>
      <View style={{ width: "100%", backgroundColor: "#8C8E9B", height: 1, top: item.newPropertyText == undefined ? 117 : 65 }}></View>
    </View>
  );

  return (
    <View style={{ width: width, height: listingCourtesyPresent == true ? 210 : 180 }}>
      <View style={{ width: width, height: 160 }}>
        <ScrollView style={styles.scrollView}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          // onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={1000}
          onScrollEndDrag={event => {
            // this.handlePageChange(event);
          }}
        >

          {imageArray !== undefined && imageArray.map((source, i) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  itemClick(item);
                }}
                underlayColor="white"
                style={styles.imageContainer}
              >

                <ImageBackground
                  backgroundColor={"grey"}
                  source={{ uri: source }}
                  style={[styles.previewImage, { resizeMode: 'contain' }]}
                >
                </ImageBackground>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
        <View style={styles.favContainer}>
          <Image source={{ uri: mlsBoardurl }} style={styles.mlsLogo} />
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            <TouchableOpacity onPress={() => onFavClick(item)}>
              <Image source={imagePath} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
          </View>
        </View>
        {newTextContent}
        <View
          style={[styles.detailsView, { top: item.newPropertyText == undefined ? 114 : (Platform.OS == 'ios' ? 72 : 65)}, {height: detailViewHeight}]}
        >
          <View style={styles.propertyDetailsContainer}>
            <Text style={styles.priceTextView}>${stringUtilobj.formatMoney(item.listPrice)}</Text>
            <Text style={styles.propDetails}>
              {item.bedCount} Beds • {item.bathCount} Baths • {item.size} ft²
              </Text>
          </View>
          <Text style={styles.textView}>
            {item.propAddress.streetName}, {item.propAddress.city},{" "}
            {item.propAddress.state} {item.propAddress.zip}
          </Text>
          <Text style={styles.subTextView}>MLS# {item.mlsID}</Text>
        </View>
        {listingCourtesy}
      </View>
    </View>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  textView: {
    textAlignVertical: "center",
    paddingHorizontal: 10,
    paddingBottom: 5,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12
  },
  subTextView: {
    textAlignVertical: "center",
    paddingLeft: 10,
    paddingBottom: 5,
    color: "#fff",
    top: 120
  },
  propertyDetailsContainer: {
    flexDirection: "row"
  },
  priceTextView: {
    textAlignVertical: "center",
    paddingLeft: 10,
    paddingBottom: 5,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22
  },
  propDetails: {
    paddingLeft: 10,
    paddingBottom: 7,
    color: "#FFF",
    fontWeight: "bold",
    alignSelf: "flex-end",
    fontSize: 15
  },
  tagTextView: {
    textAlignVertical: "center",
    color: "#FFF",
    margin: 10,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "green",
    fontSize: 10,
    top: 70,
    width: 98
  },
  favContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    height: 0
  },
  subHeaderText: {
    color: "#8C8E9B",
    fontWeight: "bold",
    fontSize: 10,
    left: 10,
    padding: 8,
    // top: 40,
    alignItems: "flex-end",

  },
  mlsLogo: {
    height: 40,
    width: 50,
    marginHorizontal: 4,
    resizeMode: "contain"
  },
  imageContainer: {
    backgroundColor: "grey",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0,
    height: 170
  },
  previewImage: {
    width: width,
    height: 170,
    alignItems: "flex-start",
    justifyContent: "flex-end"

  },
  scrollView: {
    width: "100%",
    height: 170,
    position: 'absolute',
  },
  detailsView: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    // top: 45
  }
});
