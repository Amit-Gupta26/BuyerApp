import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

class PriceChangeNotificationView extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.touchView}
                onPress={() => {
                    alert("open Price Change Notification View");
                }}
            >
                <View style={styles.holderView}>
                    <Image
                        style={styles.buttonImage}
                        source={require("../../../assets/image/bell.png")}
                    />
                </View>

                <View style={[styles.holderView, { marginLeft: 12 }]}>
                    <Text style={styles.buttonText}>
                        {"Notify me when the price changes"}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchView: {
        width: "100%",
        height: 60,
        backgroundColor: "#FFFFFF",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1.0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    holderView: {
        height: "80%",
        justifyContent: "center",
        alignItems: "stretch"
    },

    buttonImage: {
        width: 35,
        height: "80%",
        resizeMode: "cover"
    },

    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#314482"
    }
});

export default PriceChangeNotificationView;
