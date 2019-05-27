import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

class GetDirectionDescriptionCell extends Component {
    _renderViewForImageAndText(img, title, description) {
        return (
            <View style={styles.imageAndTextViewHolder}>
                {this._renderDirectionImageView(img)}
                {this._renderTitleAndDescriptionView(title, description)}
            </View>
        );
    }

    _renderMapImageView() {
        return <View style={[styles.mapImageView, { flexDirection: "column" }]}>
            <Image style={styles.mapImage}
                source={require("../../../assets/image/pdp_map_get_direction.png")} />
        </View>
    }

    _renderDirectionImageView(img) {
        return <Image style={styles.directionImageView} source={img} />;
    }

    _renderTitleAndDescriptionView(title, description) {
        return (
            <View style={styles.titleAndDescriptionView}>
                <Text style={styles.titleText}>{title}</Text>
                {description != "" ? (
                    <Text style={styles.descriptionText}>{description}</Text>
                ) : null}
            </View>
        );
    }
    _renderViewForArrowImage() {
        return (
            <View style={styles.rightArrowView}>
                <Image
                    style={styles.rightArrowImage}
                    source={require("../../../assets/image/Arrow_Blue.png")}
                />
            </View>
        );
    }

    render() {
        const { onPressAction, imagePath, title, description } = this.props;
        return (
            <View style={styles.containerView}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <View>
                        {this._renderMapImageView()}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.touchView} onPress={onPressAction}>
                            {this._renderViewForImageAndText(imagePath, title, description)}
                            {/* {this._renderViewForArrowImage()} */}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        alignItems: "stretch",
        paddingHorizontal: 10,
        paddingBottom: 0,
        justifyContent: "flex-start",
        backgroundColor: "#F7F7F9",
        paddingTop: 10
    },
    touchView: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#314482",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    rightArrowView: {
        height: "80%",
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    rightArrowImage: {
        width: 10,
        height: 15,
        resizeMode: "cover"
    },
    imageAndTextViewHolder: {
        height: "80%",
        width: "80%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    mapImageViewHolder: {
        height: "80%",
        width: "80%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    mapImageView: {
        width: "100%",
        height: "75%",
        resizeMode: "contain",
    },
    mapImage: {
        width: "100%",
        height: 180,
    },
    directionImageView: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginLeft: 10
    },
    titleAndDescriptionView: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        height: "80%",
        marginLeft: 15
    },
    titleText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold"
    },
    descriptionText: {
        color: "gray",
        fontSize: 12,
        fontWeight: "bold"
    }
});

export default GetDirectionDescriptionCell;
