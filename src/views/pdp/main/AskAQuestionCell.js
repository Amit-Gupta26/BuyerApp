import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import ImageTitleDescriptionCell from "./ImageTitleDescriptionCell";

class AskAQuestionCell extends Component {
    render() {
        const { onPressAction, imagePath, title, description } = this.props;
        return (
            <View style={[styles.containerView]}>
                <View style={styles.askAQuestion}>
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
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1,
        alignItems: "stretch",
        paddingHorizontal: 10,
        paddingBottom: 20,
        justifyContent: "center",
        backgroundColor: "#F7F7F9"
    },

    askAQuestion: {
        shadowColor: "#706F74",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1
    }
});
export default AskAQuestionCell;
