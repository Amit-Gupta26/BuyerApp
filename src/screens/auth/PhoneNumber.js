import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Dimensions,
    ActivityIndicator,
    Modal,
    BackHandler,
    SafeAreaView,
    StatusBar,
    ScrollView
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import FormField from '../../components/FormField';
import { observer, inject } from "mobx-react";
import HyperTextUtils from "../../utils/HyperTextUtils";

const { width, height } = Dimensions.get("window");
const barStyle = Platform.OS === 'ios' ? "dark-content" : "light-content" 

class PhoneNumber extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.keyboardHeight = 0;
    }

    state = {
        phone: '',
        phoneValid: false,
        isLoading: false,
        addKeyboardHeight: false
    }

    _onPhoneTextChange(value) {
        this.setState({ phone: value })
    }

    doItLaterClicked() {
        Keyboard.dismiss();
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Profile' })],
        });
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('Search', {
        });
    }

    updatePhoneNumber() {
        Keyboard.dismiss();
        const { phone } = this.state
        const { authStore, navigation } = this.props;

        this.refs.phone.checkValidation()

        if (this.state.phoneValid == true) {
            authStore.updatePhone({ phone, authStore, navigation }, this.resultPhoneUpdate);
        }
    }

    resultPhoneUpdate(isUpdated, authStore, navigation) {
        authStore.updateLead();

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Profile' })],
        });
        navigation.dispatch(resetAction);

        var nextScreenLabel = navigation.getParam('nextScreen');
        if (nextScreenLabel == 'OnBoardingSurvey') {
            navigation.navigate(nextScreenLabel);
        } else {
            navigation.navigate('Search');
        }
    }

    keyboardWillShow = (event) => {
        console.log(event.endCoordinates.height);
        this.keyboardHeight = event.endCoordinates.height;
        this.setState({addKeyboardHeight: true})
    };
  
    keyboardWillHide = (event) => {
      this.setState({addKeyboardHeight: false})
    };

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    renderKeyBoardView(){
        if (this.state.addKeyboardHeight) {
            return(
                <View style={{height: this.keyboardHeight}}>
                </View>
            );
        }
    }

    handleBackButtonClick() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Profile' })],
        });
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('Search', {
        });
        return true;
    }

    _focusNextField(nextField) {
    }

    render() {
        let hyperTextUtils = HyperTextUtils.getInstance();
        const { authStore } = this.props;
        let thankYouBelowtext = "Thanks for creating an account! To help us best serve you, please complete your profile by adding your phone number"
        let hyperTextString = 'By submitting this form, I agree to be contacted according to these <a href="https://www.owners.com/about/terms">Terms and Conditions</a>.  This consent includes receiving autodialed calls and texts from Owners.com, Owners.com Loans, Premium Title Service, Altisource Online Auction and their <a href="https://www.altisource.com/Our-Solutions">affiliates</a>. I understant that this content is not a condition ofto receiving any services. '

        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar backgroundColor="#0B2B80" barStyle={barStyle} />
                <ScrollView keyboardShouldPersistTaps={true}>
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                        <View style={styles.container}>
                            <Modal
                                transparent={true}
                                animationType={'none'}
                                visible={authStore.isLoading}
                                onRequestClose={() => { }}>
                                <View style={styles.modalBackground}>
                                    <View style={styles.activityIndicatorWrapper}>
                                        <ActivityIndicator size='large'
                                            color='#1F47AF' />
                                    </View>
                                </View>
                            </Modal>

                            <View style={styles.titleStyle}>
                                <Text style={styles.thankYouTextStyle}>Thank You!</Text>
                                <Text style={styles.thankYouInfoText}>{thankYouBelowtext}</Text>
                            </View>

                            <View style={{ marginTop: 30, marginBottom: 10 }}>
                                <FormField ref='phone'
                                    type={'PHONE'}
                                    placeHolder={'Phone'}
                                    selected={this.state.phone}
                                    onTextChanged={(text) => this._onPhoneTextChange(text)}
                                    isFieldValid={(value) => this.setState({ phoneValid: value })}
                                    autoFocus={false}
                                    nextFieldSelect={(value) => this._focusNextField(value)}
                                    checkValidation={true}
                                    returnKeyType={"done"}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.updatePhoneNumber()}>
                                <Text style={styles.signInBuText}>Complete Profile</Text>
                            </TouchableOpacity>

                            <Text style={styles.doItLaterTextStyle} onPress={() => this.doItLaterClicked()}> Do it Later</Text>

                            <View style={styles.orViewStyle}>
                                <Text style={styles.belowInfoText}>{hyperTextUtils.convertText(hyperTextString)}</Text>

                            </View>

                            {this.renderKeyBoardView()}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default inject("authStore")(observer(PhoneNumber));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    safeArea: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "white"
    },
    thankYouTextStyle: {
        color: '#0B2B80',
        fontSize: 25,
        fontFamily: "Graphik-Regular"
    },
    thankYouInfoText: {
        color: '#0B2B80',
        fontSize: 11,
        width: 250,
        textAlign: 'center',
        height: 60,
        top: 25,
        marginBottom: 30,
        fontFamily: "Graphik-Regular"
    },
    orViewStyle: {
        flexDirection: 'row',
        width: width - 20,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: 50
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    signInBuText: {
        color: 'white',
        fontSize: 18,
        fontFamily: "Graphik-Regular"
    },
    doItLaterTextStyle: {
        fontSize: 12,
        height: 20,
        right: 25,
        color: '#0B2B80',
        textAlign: 'right',
        top: 10,
        width: width - 20,
        fontFamily: "Graphik-Regular"
    },
    titleStyle: {
        width: 200,
        height: 40,
        marginTop: 200,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonStyle: {
        width: width - 40,
        height: 50,
        padding: 8,
        backgroundColor: '#0B2B80',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        borderRadius: 5
    },
    belowInfoText: {
        fontSize: 10,
        height: 120,
        textAlign: 'auto',
        top: 2,
        fontFamily: "Graphik-Regular"
    }
})