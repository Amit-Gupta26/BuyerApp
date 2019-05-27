import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import ImageTitleDescriptionCell from "./ImageTitleDescriptionCell";

class MakeAnOfferCell extends Component {
    render() {
        const { onPressAction, imagePath, title, description } = this.props;
        return (
            <View style={[styles.containerView]}>
                <Text style={styles.nextStepText}>{"Next Steps"}</Text>
                <View style={styles.makeOfferView}>
                    <ImageTitleDescriptionCell
                        onPressAction={onPressAction}
                        imagePath={imagePath}
                        title={title}
                        description={description}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerView: {
        alignItems: "stretch",
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 1,
        justifyContent: "center",
        backgroundColor: "#F7F7F9"
    },
    nextStepText: {
        color: "#363940",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 8
    },
    makeOfferView: {
        marginTop: 10,
        shadowColor: "#706F74",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1
    }
});
export default MakeAnOfferCell;
