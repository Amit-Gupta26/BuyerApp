import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

const { height } = Dimensions.get("window");

class ScheduleTourHeaderView extends Component {
    _displayBackImage(parentBackClickCallBack) {
        if (!this.props.dontShowBackButton) {
            return <View style={styles.backView}>
                <TouchableOpacity onPress={parentBackClickCallBack}>
                    <Image style={styles.backImage}
                        source={require('../../../assets/image/blueBack.png')}
                    />
                </TouchableOpacity>
            </View>
        }else{
            return <View style={styles.backView}></View>
        }
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                {this._displayBackImage(this.props.parentBackClickCallBack)}
                <View style={styles.addressContainer}>
                    <Text style={styles.addressLineFirst}>{this.props.addressLine1}</Text>
                    <Text style={styles.addressLineSecond}>{this.props.addressLine2}</Text>
                    <Text style={styles.timeLine}>Sat Jan 12th</Text>
                </View>

                <Image style={styles.headerImage}
                    source={{ uri: this.props.imageUrl }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1.06,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    backView: {
        flex: 0.1,
        height: '100%',
        width: 20,
        justifyContent: 'center',
        marginLeft: 12
    },
    backImage: {
        height: '60%',
        width: 20,
    },
    addressContainer: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    addressLineFirst: {
        fontSize: 14,
        textAlign: 'left',
        marginTop: 10,
        fontWeight: 'bold',
        color: '#404040'
    },
    addressLineSecond: {
        fontSize: 14,
        textAlign: 'left',
        color: '#686868',
        marginBottom: 4
    },
    timeLine: {
        fontSize: 13,
        textAlign: 'left',
        color: '#0B2B80',
        marginBottom: 10
    },
    headerImage: {
        flex: 1,
        width: '100%',
        height: '80%',
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    }
});

export default ScheduleTourHeaderView;
