import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ErrorView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ErrorView</Text>
            </View>
        );
    }
}
export default ErrorView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});