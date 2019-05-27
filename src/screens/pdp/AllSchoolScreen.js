import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class AllSchoolScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>AllSchoolScreen</Text>
            </View>
        );
    }
}
export default AllSchoolScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});