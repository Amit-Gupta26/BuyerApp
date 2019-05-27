import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class KeyDetailsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>KeyDetailsScreen</Text>
            </View>
        );
    }
}
export default KeyDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});