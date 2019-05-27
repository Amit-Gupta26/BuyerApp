import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Platform,
    Keyboard,
    Dimensions
} from "react-native";
import ScheduleTourHeaderView from "./ScheduleTourHeaderView";
import TourFormField from "./TourFormField";
import { KeyboardType } from "./TourFormField";
import HyperTextUtils from "../..//../utils/HyperTextUtils";
const { width, height } = Dimensions.get("window");

class ScheduleTourTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            emailSelected: false,
            phoneSelected: true,
            firstNameSelected: false,
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            phoneNumberValid: false,
        }
    }

    _onFirstNameTextChange(value) {
        this.setState({ firstname: value })
    }
    _onLastNameTextChange(value) {
        this.setState({ lastname: value })
    }
    _onEmailTextChange(value) {
        this.setState({ email: value })
    }
    _onPhoneTextChange(value) {
        this.setState({ phoneNumber: value })
    }

    _onConfirmTourPress() {
        Keyboard.dismiss();
        this.refs.firstName.checkValidation()
        this.refs.lastName.checkValidation()
        this.refs.email.checkValidation()
        this.refs.phone.checkValidation()
        const { firstName, lastName, phoneNumber, email } = this.state

        if ((this.state.firstNameValid == true) && (this.state.lastNameValid == true) && (this.state.emailValid == true) && (this.state.phoneNumberValid == true)) {
            alert('Api call to be implemented')
        }
    }

    render() {
        let hyperTextUtils = HyperTextUtils.getInstance();
        let thankYouBelowtext = "Thanks for creating an account! To help us best serve you, please complete your profile by adding your phone number"
        let hyperTextString = 'By submitting this form, I agree to be contacted according to these <a href="https://www.owners.com/about/terms">Terms and Conditions</a>.  This consent includes receiving autodialed calls and texts from Owners.com, Owners.com Loans, Premium Title Service, Altisource Online Auction and their <a href="https://www.altisource.com/Our-Solutions">affiliates</a>. I understant that this content is not a condition ofto receiving any services. '
        return (
            <View style={styles.rootSubContainer}>
                <View style={styles.dateInfoContainer}>
                    <ScrollView stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.timeHeaderContainer}>
                            <ScheduleTourHeaderView
                                addressLine1={this.props.addressLine1}
                                addressLine2={this.props.addressLine2}
                                imageUrl={this.props.imageUrl}
                                parentBackClickCallBack={this.props.parentBackClickCallBack} />
                        </View>
                        <View style={styles.dateContainer}>
                            <View style={styles.dateSubContainer}>
                                <View style={styles.circleContainer}>
                                    <View style={styles.circle}>
                                        <Text style={styles.circleTextStyle}>3</Text>
                                    </View>
                                </View>
                                <Text style={styles.propertyTitleLabel}>Share your contact{"\n"} information</Text>
                                <Text style={styles.dayTitleLabel}>Complete all the required fields below</Text>

                                <View style={styles.formContainer}>
                                    <Text style={styles.formLabel}>First Name</Text>
                                    <TourFormField ref='firstName'
                                        type={'FIRSTNAME'}
                                        selected={this.state.firstNameSelected}
                                        onTextChanged={(text) => this._onFirstNameTextChange(text)}
                                        isFieldValid={(value) => this.setState({ firstNameValid: value })}
                                        checkValidation={true}
                                    />
                                    <View style={styles.lineView}></View>
                                    <Text style={styles.formLabel}>Last Name</Text>
                                    <TourFormField ref='lastName'
                                        type={'LASTNAME'}
                                        onTextChanged={(text) => this._onLastNameTextChange(text)}
                                        isFieldValid={(value) => this.setState({ lastNameValid: value })}
                                        checkValidation={true}
                                    />
                                    <View style={styles.lineView}></View>
                                    <Text style={styles.formLabel}>E-mail</Text>
                                    <TourFormField ref='email'
                                        type={'EMAIL'}
                                        keyboardType={KeyboardType.EMAIL}
                                        onTextChanged={(text) => this._onEmailTextChange(text)}
                                        isFieldValid={(value) => this.setState({ emailValid: value })}
                                        checkValidation={true}
                                    />
                                    <View style={styles.lineView}></View>
                                    <Text style={styles.formLabel}>Phone Number</Text>
                                    <TourFormField ref='phone'
                                        type={'PHONE'}
                                        keyboardType={KeyboardType.PHONE}
                                        selected={this.state.phoneSelected}
                                        onTextChanged={(text) => this._onPhoneTextChange(text)}
                                        isFieldValid={(value) => this.setState({ phoneNumberValid: value })}
                                        checkValidation={true}
                                    />
                                </View>

                                <TourFormField type={'COMMENTS'}
                                    keyboardType={KeyboardType.PHONE}
                                    selected={this.state.phoneSelected}
                                    placeHolder={'Would you like to add any additional notes for your agent? (optional)'}
                                    onTextChanged={(text) => this._onPhoneTextChange(text)}
                                />

                                <View style={styles.orViewStyle}>
                                <Text style={styles.belowInfoText}>{hyperTextUtils.convertText(hyperTextString)}</Text>

                            </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        style={styles.submitButtonStyle}
                        activeOpacity={.5}
                        onPress={() => this._onConfirmTourPress()} >
                        <Text style={styles.submitTextStyle}>Confirm Tour</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

export default ScheduleTourTime;
const styles = StyleSheet.create({
    rootSubContainer: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
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
    propertyTitleLabel: {
        fontSize: 18,
        textAlign: 'center',
        color: '#0B2B80',
        marginTop: 30
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
    formContainer: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10
    },
    formLabel: {
        fontSize: 16,
        textAlign: 'left',
        color: '#92939C',
        backgroundColor: '#ffffff',
        paddingLeft: 7,
        fontWeight: '400'
    },
    lineView: {
        backgroundColor: '#C8C8C8',
        width: '100%',
        height: 1,
        justifyContent: 'center'
    },
    notesLabel: {
        fontSize: 16,
        textAlign: 'left',
        color: '#8A8C8C',
        backgroundColor: '#ffffff',
        paddingLeft: 7,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 5
    },
    hypertextStyle: {
        fontSize: 12,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 5
    },
    timeHeaderContainer: {
        flex: Platform.OS === 'ios' ? 0.8 : 1.06
    },
    dateInfoContainer: {
        flex: 6,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    orViewStyle: {
        flexDirection: 'row',
        width: width - 45,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        marginRight: 10,
        backgroundColor: 'transparent',
        marginTop: 30
    },
    belowInfoText: {
        fontSize: 10,
        height: 120,
        textAlign: 'auto',
        top: 2,
        fontFamily: "Graphik-Regular"
    }
});