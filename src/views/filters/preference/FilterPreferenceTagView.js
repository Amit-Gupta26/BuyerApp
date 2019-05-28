import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

const tagTextwidth = "Air Conditioning (Any)".length*5.6;
class FilterPreferenceTagView extends Component {
    render() {
        const { filter, onTagPress } = this.props;
        return (
            <TouchableOpacity
                    style={styles.container}
                    onPress={() => onTagPress(this.props.title)}
                >
                <View style={styles.tagContainer}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={() => onTagPress(this.props.title)}
                >
                    <Image
                        source={require("../../../assets/image/add.png")}
                        style={styles.addImage}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}
export default FilterPreferenceTagView;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#68A9CD",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        margin: 5
    },
    tagContainer: {
        paddingHorizontal:6,
        paddingVertical:8,
        borderRightWidth: 1,
        borderRightColor: "#CED0CE",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "white",
        width: tagTextwidth,
        fontSize: 11,
        fontWeight: "600",
        textAlign: 'center'
    },
    imageContainer: {
        width: 30,
        height: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    addImage: {
        width: 12,
        height: 12,
        tintColor: "white"
    }
});
