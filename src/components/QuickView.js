import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    ImageBackground,
    TouchableOpacity,
    Image,
    Platform
} from "react-native";
import StringUtil from "../utils/StringUtil";

const { width, height } = Dimensions.get("window");

class QuickView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFavourite: this.props.isFavourite
        }
    }

    scrollTemp() {
        let wait = new Promise((resolve) => setTimeout(resolve, 0));  // Smaller number should work
        wait.then( () => {
            this.refs.scrollView.scrollTo({ x:0, y:0, animated:false });
        });
    }

    mls() {

        if (this.props.item.mlsBoardImageURL != "") {
            return (
                <Image source={{ uri: `http:${this.props.item.mlsBoardImageURL}` }}
                    testID={"MLSImageView"}
                    nativeID={"MLSImageView"}
                    accessibilityLabel={"MLSImageView"}
                    style={styles.mlsLogo} />
            );
        }
        else {
            return (
                <View style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", top: 20, left: 5, width: 180, position: "absolute", borderRadius: 2 }}>
                    <Text style={styles.mlsBoardName}
                        testID={"MLSBoardNameView"}
                        nativeID={"MLSBoardNameView"}
                        accessibilityLabel={"MLSBoardNameView"}>{this.trunc(this.props.item.mlsBoardName)}</Text>
                </View>
            );
        }
    }

    mlsID() {
        if (this.props.item.showMLSID) {
            return (
                <Text style={styles.subTextView}
                    testID={"MLSidView"}
                    nativeID={"MLSidView"}
                    accessibilityLabel={"MLSidView"}>MLS# {this.props.item.mlsID}</Text>
            );
        }
    }

    trunc(text) {
        return text.length > 25 ? `${text.substr(0, 25)}...` : text;
    }

    onFavClick() {
        this.setState({
            isFavourite: !this.state.isFavourite
        })
    }

    renderListingView(item){
        return(
            <View style={styles.listingCourtesyContainer}>
                    <Text style={[styles.listingCourtesyView, { backgroundColor: "white" }]}
                    adjustsFontSizeToFit = {true}
                        numberOfLines= {1}
                        testID={"listingCourtesyView"}
                        nativeID={"listingCourtesyView"}
                        accessibilityLabel={"listingCourtesyView"}>
                        {"Listing Courtesy of " + item.sellerFirstName + " " + item.sellerLastName + ", " + item.brokerageFirmName}
                    </Text>
                </View>
        );
    }

    render() {
        this.scrollTemp();
        const { item, propAddress } = this.props;
        let stringUtilobj = new StringUtil();

        return (
            <View style={{ width: width, height: 225, backgroundColor: "white" }}>
                <ScrollView
                    ref='scrollView'
                    style={styles.scrollView}
                    testID={"ImageScrollView"}
                    nativeID={"ImageScrollView"}
                    accessibilityLabel={"ImageScrollView"}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollToIndex = {0}
                    // onScroll={this.handleScroll.bind(this)}
                    scrollEventThrottle={1000}
                    onScrollEndDrag={event => {
                        // this.scrollView.scrollTo({ x:0, y:0, animated:false });
                    }}>

                    {item.imageUrlList !== undefined && item.imageUrlList.map((source, i) => {
                        return (
                            <TouchableHighlight
                                onPress={() => {
                                    alert("OPEN PDP")
                                }}
                                underlayColor="white"
                                style={styles.imageContainer}>
                                <ImageBackground
                                    testID={"ImageView"}
                                    nativeID={"ImageView"}
                                    accessibilityLabel={"ImageView"}
                                    backgroundColor={"grey"}
                                    source={{ uri: source }}
                                    style={styles.previewImage}>
                                </ImageBackground>
                            </TouchableHighlight>
                        );
                    })}

                </ScrollView>
                <View style={styles.mlsAndfavouriteContainar}>
                    <View style={{ justifyContent: "flex-start", flex: 1, flexDirection: "column" }}>
                        {this.mls()}
                        {this.mlsID()}
                    </View>

                    <View style={styles.favContainer}>
                        <TouchableOpacity onPress={() => this.onFavClick()}>
                            <Image source={this.state.isFavourite ? require("./../assets/image/selected_Favorite.png") : require("./../assets/image/unselected_Favorite.png")} style={styles.mainImageContainer}
                                testID={"FavouriteButtonView"}
                                nativeID={"FavouriteButtonView"}
                                accessibilityLabel={"FavouriteButtonView"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 110, position: "relative", backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                    pointerEvents="none">
                </View>
                <View style={[styles.detailsView, { height: 50}]}
                    pointerEvents="none">
                    <View style={styles.propertyDetailsContainer}>
                        <Text style={styles.priceTextView}
                            testID={"PriceTextView"}
                            nativeID={"PriceTextView"}
                            accessibilityLabel={"PriceTextView"} >${stringUtilobj.formatMoney(item.listPrice)}</Text>
                        <Text style={styles.propDetails}
                            testID={"BedBathTextView"}
                            nativeID={"BedBathTextView"}
                            accessibilityLabel={"BedBathTextView"}>
                            {item.bedCount} Beds • {item.bathCount} Baths • {item.size} ft²
                         </Text>
                    </View>
                    <Text style={styles.textView}
                        testID={"StreetStateZipNameView"}
                        nativeID={"StreetStateZipNameView"}
                        accessibilityLabel={"StreetStateZipNameView"}>
                        {propAddress.streetName}, {propAddress.city},{" "}
                        {propAddress.state} {propAddress.zip}
                    </Text>
                </View>
                {this.renderListingView(item)}
                
            </View>
        );
    }
}
export default QuickView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        width: "100%",
        height: 225,
        position: 'absolute',
        backgroundColor: "grey"
    },
    imageContainer: {
        backgroundColor: "white",
        alignSelf: "stretch",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1.0,
        height: 225
    },
    previewImage: {
        width: width,
        height: 225,
        alignItems: "flex-start",
        justifyContent: "flex-end"
    },
    mlsAndfavouriteContainar: {
        width: width,
        height: 65,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        flexDirection: "row"
    },
    favContainer: {
        flexDirection: "row",
        backgroundColor: "transparent",
        top: 10
    },
    detailsView: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center"
    },
    propertyDetailsContainer: {
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    priceTextView: {
        textAlignVertical: "center",
        paddingLeft: 10,
        paddingBottom: 5,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Graphik-Medium",
    },
    textView: {
        textAlignVertical: "center",
        paddingHorizontal: 10,
        paddingBottom: 5,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 12,
        fontFamily: "Graphik-Medium",
        backgroundColor: "transparent"
    },
    listingCourtesyView: {
        color: "#8C8E9B",
        fontWeight: "bold",
        fontSize: 10,
        fontFamily: "Graphik-Medium",
        backgroundColor: "transparent",
        textAlignVertical: "center",
        paddingHorizontal:10,
        paddingVertical: 6,
        alignSelf:'flex-start',
        width : width
    },
    listingCourtesyContainer: {
        backgroundColor: "white",
    },
    mlsLogo: {
        height: 20,
        width: 50,
        marginHorizontal: 4,
        resizeMode: "contain",
        top: 10,
        left: 10,
        backgroundColor: "transparent"
    },
    mlsBoardName: {
        width: 180,
        color: "white",
        fontFamily: "Graphik-Medium",
        top: 1,
        fontSize: 12,
        textAlign: "center",
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    mainImageContainer: {
        height: 45,
        width: 45,
        marginRight: 10,
        marginTop: 0,
        borderRadius: 22.5
    },
    subTextView: {
        color: "white",
        top: 1,
        fontFamily: "Graphik-Medium",
        fontSize: 12,
        left: 14,
        width: 100,
        top: 12,
        backgroundColor: "transparent",
    },
    propDetails: {
        paddingLeft: 10,
        paddingBottom: 7,
        color: "#FFF",
        fontWeight: "bold",
        alignSelf: "flex-end",
        fontSize: 12,
        fontFamily: "Graphik-Medium",
        textAlignVertical: "center",
        textAlign: "center"
    },
});