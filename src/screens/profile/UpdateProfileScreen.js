import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class UpdateProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>UpdateProfileScreen</Text>
            </View>
        );
    }
}
export default UpdateProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});