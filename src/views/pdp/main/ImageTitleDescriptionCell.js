import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

class ImageTitleDescriptionCell extends Component {
    _renderViewForImageAndText(img, title, description) {
        return (
            <View style={styles.imageAndTextViewHolder}>
                {this._renderCircularImageView(img)}
                {this._renderTitleAndDescriptionView(title, description)}
            </View>
        );
    }

    _renderCircularImageView(img) {
        return <Image style={styles.circularImageView} source={img} />;
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
        const { imagePath, title, description, onPressAction } = this.props;
        return (
            <TouchableOpacity style={styles.touchView} onPress={onPressAction}>
                {this._renderViewForImageAndText(imagePath, title, description)}
                {this._renderViewForArrowImage()}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchView: {
        flexDirection: "row",
        height: 70,
        backgroundColor: "#FFFFFF",
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
    circularImageView: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        borderRadius: 20,
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
        color: "black",
        fontSize: 14,
        fontWeight: "normal"
    },
    descriptionText: {
        color: "gray",
        fontSize: 12,
        fontWeight: "normal"
    }
});

export default ImageTitleDescriptionCell;
