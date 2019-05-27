import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
 export const JustForMeItem = ({line1, line2 }) => {
    return (
        <View>
        <View style={styles.justForMeStyle}>
            <View style={{ flex: 2.9 }}>
            <View 
                    style={styles.justForMeViewStyle}
                />
            </View>
            <View style={{ flex: 1, paddingLeft: 10 }}>
                <Text numberOfLines={1} style={styles.line1Style}>{line1}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft: 10, paddingBottom: 4 }}>
                <Text numberOfLines={1} style={styles.line2Style}>{line2}</Text>
            </View>
            <View style={styles.suggestionTextStyle}>
                <Text numberOfLines={1} style={styles.suggestionStyle}>{"Suggestion"}</Text>
            </View>
           
        </View>
        <View style={styles.justForMeBackgroundStyle}>
        </View>
        </View>
    );
}
export default JustForMeItem;

const styles = StyleSheet.create({
    justForMeStyle: {
        height: 130, 
        width: 150, 
        borderWidth: 1, 
        backgroundColor: '#0B2B80',
        marginRight:8, 
        borderRadius:2,
        borderColor: '#dddddd'
    },
    justForMeBackgroundStyle: {
        height: 8, 
        width: 140, 
        borderWidth: 1, 
        backgroundColor: '#ffffff',
        marginLeft:5, 
        marginTop: -1,
        marginRight:5, 
        borderRadius:2,
        borderColor: '#dddddd'
    },
    justForMeViewStyle: {
        flex: 1, 
        resizeMode: 'cover' 
    },
    line1Style: {
        fontSize: 14, 
        color:'#ffffff', 
        fontWeight: 'bold' 
    },
    line2Style: {
        fontSize: 13, 
        color: '#E2E2E2'
    },
    suggestionTextStyle: {
        flex: 1,
        paddingLeft: 10,
        padding: 6,
        textAlignVertical: "center",
        backgroundColor: '#ffffff' 
    },
    suggestionStyle: {
        fontSize: 13, 
        color: '#9e9e9e', 
        fontWeight: 'bold' 
    }

  });
