import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class EmptyView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>EmptyView</Text>
            </View>
        );
    }
}
export default EmptyView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});