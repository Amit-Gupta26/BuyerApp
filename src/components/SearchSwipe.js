import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Text
} from "react-native";

class SearchSwipe extends PureComponent {
    render() {
        return (<View style = {styles.container}>
                    <Text>Swipe</Text>
                </View>);
    }  
}

SearchSwipe.propTypes = {
    properties: PropTypes.array.isRequired  
};
export default SearchSwipe;
const styles = StyleSheet.create({
    container : {
        backgroundColor: "white",
        justifyContent: 'center',
        flex: 1,
    }
});