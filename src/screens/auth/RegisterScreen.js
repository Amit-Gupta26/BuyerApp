import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Dimensions,
    Linking,
    Platform,
    ActivityIndicator,
    Modal,
    BackHandler,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import FormField from '../../components/FormField';
import { KeyboardType } from '../../components/FormField';
import { observer, inject } from "mobx-react";
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");
const barStyle = Platform.OS === 'ios' ? "dark-content" : "light-content" 

class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.keyboardHeight = 0;
    }

    state = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        phone_number: '',
        emailSelected: false,
        phoneSelected: true,
        firstNameSelected: false,
        passwordSelected: false,
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        passwordValid: true,
        isLoading: false,
        addKeyboardHeight: false
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount() {
        const { authStore } = this.props;
        authStore.navigateToPreviousScreen = this.props.navigation.getParam('backScreen')
    }

    doRegister() {
        Keyboard.dismiss();
        this.refs.firstName.checkValidation()
        this.refs.lastName.checkValidation()
        this.refs.email.checkValidation()
        this.refs.password.checkValidation()
        const { authStore } = this.props;
        const { navigation } = this.props;
        const { firstName, lastName, password, email } = this.state
        const { onboardingStore } = this.props;

        if ((this.state.firstNameValid == true) && (this.state.lastNameValid == true) && (this.state.emailValid == true) && (this.state.passwordValid == true)) {
            this.setState({ isLoading: true })
            authStore.getRegister({ firstName, lastName, password, email, authStore, navigation, onboardingStore }, this.resultRegister, true);
        }
    }

    resultRegister(isLoggedIn, authStore, navigation, onboardingStore, uuid) {
        if (isLoggedIn) {
            var nextScreenLabel = navigation.getParam('nextScreen');
            navigation.navigate('PhoneNumberScreen', {
                nextScreen: nextScreenLabel
            });
            onboardingStore._saveSearch();
        }
        else {
        }
    }

    signIn() {
        Keyboard.dismiss();
        var nextScreenLabel = this.props.navigation.getParam('nextScreen');
        var backScreenLabel = this.props.navigation.getParam('backScreen');
        this.props.navigation.navigate('SignInScreen', {
            nextScreen: nextScreenLabel,
            backScreen: backScreenLabel
        });
    }

    phoneNumberUpdate() {
        this.props.navigation.navigate('PhoneNumberScreen');
    }

    _onFirstNameTextChange(value) {
        this.setState({ firstName: value })
    }
    _onLastNameTextChange(value) {
        this.setState({ lastName: value })
    }
    _onEmailTextChange(value) {
        this.setState({ email: value })
    }
    _onPasswordTextChange(value) {
        this.setState({ password: value })
    }
    _onPhoneTextChange(value) {
        this.setState({ phone_number: value })
    }

    backPressed() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'RegisterScreen' })],
        });
        this.props.navigation.dispatch(resetAction);

        const { authStore } = this.props;
        if (typeof authStore.navigateToPreviousScreen != "undefined") {
            this.props.navigation.navigate(authStore.navigateToPreviousScreen)
        } else {
            this.props.navigation.navigate('Search')
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

    handleBackButtonClick() {
        this.props.navigation.navigate('Search', {
        });
        return true;
    }

    _focusNextField(nextField) {
        if (nextField == 'FIRSTNAME') {
            this.refs.lastName.refs.LASTNAME.focus()
        }
        if (nextField == 'LASTNAME') {
            this.refs.email.refs.EMAIL.focus()
        }
        if (nextField == 'EMAIL') {
            this.refs.password.refs.PASSWORD.focus()
        }
    }

    renderKeyBoardView(){
        if (this.state.addKeyboardHeight) {
            return(
                <View style={{height: this.keyboardHeight}}>
                </View>
            );
        }
    }

    socialLoginClicked(){
        Keyboard.dismiss()
    }


    render() {
        let belowLabeltext = "Create an account to save your favourite properties"
        const { authStore } = this.props;

        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar backgroundColor="#0B2B80" barStyle={barStyle} />
 
                <ScrollView style={{ top: 0, backgroundColor: 'white' }} keyboardShouldPersistTaps={true}>
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

                                <View style={styles.topViewStyle}>
                                    <TouchableOpacity style={styles.backButViewStyle} onPress={() => this.backPressed()}>
                                        <Image source={require('./../../assets/image/BackBlue.png')} style={styles.ImageStyle} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.titleStyle}>
                                    <Text style={styles.registerTitle}>Register</Text>
                                </View>

                                <View style={styles.belowLabelStyle}>
                                    <Text style={styles.belowRegisterTxt}>{belowLabeltext}</Text>
                                </View>

                                <View style={styles.FirstSectionStyle}>
                                    <FormField ref='firstName'
                                        type={'FIRSTNAME'}
                                        placeHolder={'First Name'}
                                        selected={this.state.firstNameSelected}
                                        onTextChanged={(text) => this._onFirstNameTextChange(text)}
                                        isFieldValid={(value) => this.setState({ firstNameValid: value })}
                                        autoFocus={false}
                                        nextFieldSelect={(value) => this._focusNextField(value)}
                                        checkValidation={true}
                                        returnKeyType={"next"}
                                    />
                                    <FormField ref='lastName'
                                        type={'LASTNAME'}
                                        placeHolder={'Last Name'}
                                        onTextChanged={(text) => this._onLastNameTextChange(text)}
                                        isFieldValid={(value) => this.setState({ lastNameValid: value })}
                                        autoFocus={false}
                                        nextFieldSelect={(value) => this._focusNextField(value)}
                                        checkValidation={true}
                                        returnKeyType={"next"}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <FormField ref='email'
                                        type={'EMAIL'}
                                        placeHolder={'Email'}
                                        selected={this.state.emailSelected}
                                        keyboardType={KeyboardType.EMAIL}
                                        onTextChanged={(text) => this._onEmailTextChange(text)}
                                        isFieldValid={(value) => this.setState({ emailValid: value })}
                                        autoFocus={false}
                                        nextFieldSelect={(value) => this._focusNextField(value)}
                                        checkValidation={true}
                                        returnKeyType={"next"}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <FormField ref='password'
                                        type={'PASSWORD'}
                                        placeHolder={'Password'}
                                        selected={this.state.password}
                                        onTextChanged={(text) => this._onPasswordTextChange(text)}
                                        isFieldValid={(value) => this.setState({ passwordValid: value })}
                                        autoFocus={false}
                                        nextFieldSelect={(value) => this._focusNextField(value)}
                                        checkValidation={true}
                                        returnKeyType={"done"}

                                    />
                                </View>

                                {this.renderErrorPassword()}

                                <TouchableOpacity onPress={() => this.doRegister()}>
                                    <View style={styles.buttonStyle}>
                                        <Text style={styles.registerBuTextStyle}>Register</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.orViewStyle}>
                                    <Text style={styles.lineStyle}></Text>
                                    <View style={styles.orSubViewStyle}>
                                        <Text style={styles.orSubViewTextStyle}> {'or'}</Text>
                                    </View>
                                    <Text style={styles.lineStyle}></Text>
                                </View>

                                <TouchableOpacity style={styles.socialViewStyle} onPress={() => this.socialLoginClicked()}>
                                    <Image source={require('./../../assets/image/facebook-logo.png')} style={styles.socialImageStyle} />
                                    <Text style={styles.socialTextStyle}>Continue  with  Facebook</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialViewStyle} onPress={() => this.socialLoginClicked()}>
                                    <Image source={require('./../../assets/image/google-logo.png')} style={styles.socialImageStyle} />
                                    <Text style={styles.socialTextStyle}>Continue  with  Google</Text>
                                </TouchableOpacity>

                                <View style={styles.orViewStyle}>
                                    <Text style={styles.alrHaveTextStyle}>Already have an account?</Text>
                                    <Text style={styles.logInTextStyle} onPress={() => this.signIn()}> Log In</Text>
                                </View>

                                <View style={styles.orViewStyle}>
                                    <Text style={styles.byRegistYouAgree}>By registering you agree to the</Text>
                                    <Text style={styles.termsAndCondit}
                                        onPress={() => Linking.openURL('https://www.owners.com/about/terms')}>
                                        {' Terms & Conditions'}
                                    </Text>
                                </View>
                                {this.renderKeyBoardView()}
                            </View>                           
                        </TouchableWithoutFeedback>
                    </ScrollView>
            </SafeAreaView>

        )
    }

    renderErrorPassword() {
        if (this.state.passwordValid == false) {
            return (
                <Text style={styles.errorPassword}>{"Must be at least 8 characters long. Use a combination of letters & numbers."}</Text>
            );
        }
    }
}

export default inject("authStore", "onboardingStore")(observer(RegisterScreen));


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
    registerTitle: {
        color: '#0B2B80',
        fontSize: 28,
        fontFamily: "Graphik-Regular"
    },
    belowRegisterTxt: {
        color: '#0B2B80',
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Graphik-Regular"
    },
    byRegistYouAgree: {
        fontSize: 12,
        height: 20,
        textAlign: 'auto',
        top: 2,
        fontFamily: "Graphik-Regular"
    },
    termsAndCondit: {
        fontSize: 12,
        color: '#0B2B80',
        fontFamily: "Graphik-Regular"
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
    registerBuTextStyle: {
        color: 'white',
        fontSize: 18,
        fontFamily: "Graphik-Regular"
    },
    alrHaveTextStyle: {
        height: 20,
        textAlign: 'auto',
        fontFamily: "Graphik-Regular"
    },
    logInTextStyle: {
        fontSize: 14,
        height: 20,
        left: 0,
        color: '#0B2B80',
        fontFamily: "Graphik-Regular"
    },
    socialTextStyle: {
        flex: 1,
        fontSize: 14,
        height: 20,
        left: 20,
        color: 'grey',
        fontFamily: "Graphik",
        top: 2
    },
    errorPassword: {
        fontSize: 12,
        height: 30,
        left: 0,
        color: 'red',
        top: -5,
        marginBottom: 10,
        width: width - 46,
        textAlign: 'left',
        fontFamily: "Graphik-Regular"
    },
    lineStyle: {
        flex: 3,
        height: 1,
        backgroundColor: 'grey'
    },
    orSubViewStyle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "Graphik-Regular",
        fontSize: 18
    },
    orSubViewTextStyle: {
        color: 'grey',
        fontSize: 18,
        height: 30,
        top: 5
    },
    titleStyle: {
        width: width - 20,
        height: 40,
        marginTop: 0,
        marginBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    backButViewStyle: {
        width: 25,
        height: 25,
        marginTop: 0,
        left: 10,
        borderRadius: 5
    },
    topViewStyle: {
        top: 10,
        width: width,
        height: 25
    },
    belowLabelStyle: {
        width: 180,
        height: 40,
        marginTop: 5,
        marginBottom: 20,
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
        borderRadius: 5,
    },
    orViewStyle: {
        flexDirection: 'row',
        width: width - 80,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: 15
    },
    socialViewStyle: {
        flexDirection: 'row',
        width: width - 40,
        height: 45,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#F4F2F1',
        borderWidth: 1,
        marginTop: 15,
        shadowColor: '#F4F2F1',
        shadowRadius: 4,
        shadowOpacity: 0.6,
        elevation: 1,
        shadowOffset: { width: 0, height: 4 },
        fontFamily: "Graphik-Regular",
        fontSize: 15
    },
    FirstSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        borderRadius: 5,
        width: width - 40,
        marginBottom: 25
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    socialImageStyle: {
        height: 25,
        width: 25,
        marginLeft: 10
    }
})