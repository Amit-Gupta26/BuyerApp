import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ImageTitleDescriptionCell from "./ImageTitleDescriptionCell";

class CallOwnersDotCom extends Component {
    render() {
        const { onPressAction, imagePath, title, description } = this.props;
        return (
            <View style={[styles.containerView]}>
                <View style={styles.OwnersDotComView}>
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
        paddingBottom: 0,
        justifyContent: "center",
        backgroundColor: "#F7F7F9"
    },
    OwnersDotComView: {
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        shadowColor: "#706F74",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1
    }
});
export default CallOwnersDotCom;
