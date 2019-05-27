import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class FilterTagView extends Component {
    render() {
        const { filter, onPressDelete } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.tagContainer}>
                    <Text style={styles.text}>{filter.value}</Text>
                </View>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => onPressDelete(filter.type)}
                >
                    <Image
                        source={require("../assets/image/clear.png")}
                        style={styles.cancelImage}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
export default FilterTagView;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#0B2B80",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 5
    },
    tagContainer: {
        paddingHorizontal:12,
        paddingVertical:8,
        borderRightWidth: 1,
        borderRightColor: "#CED0CE",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 13,
        fontWeight: "400",
    },
    imageContainer: {
        width: 30,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    cancelImage: {
        width: 12,
        height: 12,
        tintColor: "white"
    }
});
