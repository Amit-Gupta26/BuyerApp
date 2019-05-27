import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class MultipleUnitsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MultipleUnitsScreen</Text>
            </View>
        );
    }
}
export default MultipleUnitsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});