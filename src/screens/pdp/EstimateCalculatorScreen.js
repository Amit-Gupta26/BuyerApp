import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class EstimateCalculatorScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>EstimateCalculatorScreen</Text>
            </View>
        );
    }
}
export default EstimateCalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});