import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AlertsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AlertsScreen</Text>
            </View>
        );
    }
}
export default AlertsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});