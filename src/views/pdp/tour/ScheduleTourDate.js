import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform
} from "react-native";
import ScheduleTourHeaderView from "./ScheduleTourHeaderView";
import ScheduleTourDatePickerView from "./ScheduleTourDatePickerView";
import { observer, inject } from "mobx-react";

class ScheduleTourDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: ""
        }
    }
    _onDateContinueButtonPress() {
        this.props.tourDateClickCallBack(1)
    }

    _onTourDateSelected = (id) => {
        var selected = new Map();
        selected.set(id, !selected.get(id));
        const { tourStore } = this.props;
        tourStore.mapDateSelected = selected;
        this.props.tourDateClickCallBack(id)
    }

    render() {
        var address1 = this.props.addressLine1
        var address2 = this.props.addressLine2
        var imageUrl = this.props.imageUrl
        return (
            <View style={styles.dateContainer}>
            <View style={styles.dateInfoContainer}>
                <View style={styles.timeHeaderContainer}>
                    <ScheduleTourHeaderView
                        dontShowBackButton={true}
                        addressLine1={address1}
                        addressLine2={address2}
                        imageUrl={imageUrl}
                        parentBackClickCallBack={this.props.parentBackClickCallBack} />
                </View>
                <View style={styles.tourDateContainer}>
                    <ScrollView>
                        <View style={styles.dateSubContainer}>
                            <View style={styles.circleContainer}>
                                <View style={styles.circle}>
                                    <Text style={styles.circleTextStyle}>1</Text>
                                </View>
                            </View>
                            <Text style={styles.propertyTitleLabel}>When are you available{"\n"} to visit this property?</Text>
                            <Text style={styles.dayTitleLabel}>Select a day</Text>
                            <ScheduleTourDatePickerView
                                addressLine1={address1}
                                addressLine2={address2}
                                imageUrl={imageUrl}
                                tourDateClickCallBack={this._onTourDateSelected}
                                dateSelectionCallBack={this.props.tourDateClickCallBack}
                                isFromTourDateScreen={true} />
                        </View>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.submitContainer}>
                <TouchableOpacity
                    style={styles.submitButtonStyle}
                    activeOpacity={.5}
                    onPress={() => this._onDateContinueButtonPress()} >
                    <Text style={styles.submitTextStyle}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

}

export default inject("tourStore")(observer(ScheduleTourDate));
const styles = StyleSheet.create({
    dateContainer: {
        flex: 5,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    tourDateContainer: {
        flex: Platform.OS === 'ios' ? 6 : 5,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    dateSubContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: '#0B2B80',
        borderWidth: 2
    },
    circleTextStyle: {
        color: '#0B2B80',
        fontWeight: 'bold',
        fontSize: 17
    },
    circleContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    submitContainer: {
        flex: Platform.OS === 'ios' ? 0.6 : 0.8,
        backgroundColor: 'white'
    },
    submitButtonStyle: {
        marginTop: 10,
        paddingTop: 8,
        paddingBottom: 8,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#0B2B80',
        borderWidth: 1,
        borderColor: '#fff'
    },
    submitTextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    dayTitleLabel: {
        fontSize: 14,
        textAlign: 'center',
        color: '#606060',
        marginBottom: 20,
        marginTop: 5
    },
    dateInfoContainer: {
        flex: 6,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    timeHeaderContainer: {
        flex: Platform.OS === 'ios' ? 0.8 : 1.06
    },
    propertyTitleLabel: {
        fontSize: 18,
        textAlign: 'center',
        color: '#0B2B80',
        marginTop: 30
    }
});