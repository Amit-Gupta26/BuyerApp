import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
} from "react-native";
 export const DiscoverItem = ({ isNew, newPropertyText, openHouseText, imageUrl, line1, line2 }) => {
    let newStyle = null;
    let openHouseStyle = null;
    let openHouseDate = null;
    let newTextContent= null
    if(isNew == "yes"){
    newTextContent = "NEW";
    newStyle = styles.newTextView;
    openHouseDate = newPropertyText.toUpperCase();
    openHouseStyle = styles.newOffsetView;
    
}
else{
    newTextContent = "OPEN ";
    newStyle = styles.tagOpenHouseTextView;
    openHouseDate = openHouseText.toUpperCase();
    openHouseStyle = styles.tagOpenDateView;
}


    return (
        <View style={styles.discoverStyle}>
            <View style={{ flex: 5 }}>
                <ImageBackground source={{ uri: imageUrl }}
                    style={styles.imageViewStyle}>
                    <View style={styles.imageStyle}>
                    <Text numberOfLines={1} style={newStyle}> {newTextContent} </Text> 
                    <Text numberOfLines={1} style={openHouseStyle}>  {openHouseDate} </Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.line1ViewStyle}>
            <View >
                <Text numberOfLines={1} style={styles.line1Style}>{line1}</Text>
            </View>
            </View>
            <View style={styles.line2ViewStyle}>
                <Text numberOfLines={1} style={styles.line2Style}>{line2}</Text>
            </View>
        </View>
    );
}

export default DiscoverItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newTextView: {
      textAlignVertical: "center",
      paddingTop: 3,
      paddingLeft: 3,
      paddingBottom: 3,
      color: "#FFF",
      marginLeft: 10,
      paddingLeft: 3,
      alignItems: "center",
      fontWeight: "bold",
      justifyContent: 'flex-end',
      backgroundColor: "#4bd385",
      fontSize: 12,
      marginTop: 48, 
    },
    newOffsetView: {
      textAlignVertical: "center",
      padding: 3,
      color: "#595959",
      alignItems: "center",
      paddingRight:3,
      fontWeight: "bold",
      backgroundColor: "#4bd385",
      fontSize: 12,
      marginLeft: -4,
      marginTop: 48, 
    },
      tagOpenHouseTextView: {
        textAlignVertical: "center",
        color: "#FFF",
        marginBottom: 5,
        marginLeft: 5,
        padding: 3,
        fontWeight: "bold",
        justifyContent: 'flex-end',
        backgroundColor: "#B476A7",
        fontSize: 10,
        marginTop: 48, 
      },
      tagOpenDateView: {
        textAlignVertical: "center",
        color: "#FFF",
        marginBottom: 5,
        padding: 3,
        marginRight: 10,
        fontWeight: "bold",
        justifyContent: 'flex-end',
        backgroundColor: "#000000",
        fontSize: 10,
        marginTop: 48, 
      },
      discoverStyle: {
        height: 130, 
        width: 150, 
        marginRight: 8,
        borderWidth: 1, 
        borderColor: '#dddddd'
      },
      line1Style: {
        fontSize: 10, 
        fontWeight: 'bold', 
        color: '#000000', 
        marginTop: 2
      },
      line2Style: {
        fontSize: 10, 
      },
      line1ViewStyle: {
        flex: 1, 
        paddingLeft: 10, 
        marginTop:6
      },
      line2ViewStyle: {
        flex: 1, 
        paddingLeft: 10, 
        marginBottom:5
      },
      imageViewStyle: {
        flex: 1, 
        width: null, 
        height: null, 
        resizeMode: 'cover' 
      },
      imageStyle: {
        flexDirection: 'row',
        marginTop: 10
      }
});
