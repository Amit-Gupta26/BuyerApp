import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native";

 export const Advice = ({imageUrl, title}) => {
        return (
            <View style={styles.adviceStyle}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.imageView}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style ={styles.titleText}>{title}</Text>
             </View>
                </ImageBackground>
            </View>
        );
    }
export default Advice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        flex:1,
        width: null,
        height: null,
        margin: 0,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
      },
      titleText: {
        textAlignVertical: 'center',
        paddingHorizontal: 5,
        paddingBottom: 5,
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15,
      },
      adviceStyle : {
        height: 110, 
        width: 150, 
        marginRight: 8, 
        borderWidth: 1, 
        borderColor: '#dddddd',
        marginBottom: 60
      },
});