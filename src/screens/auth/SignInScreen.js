import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Platform,
    Dimensions,
    ActivityIndicator,
    Modal,
    ScrollView,
    BackHandler,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import FormField from '../../components/FormField';
import { KeyboardType } from '../../components/FormField';
import { observer, inject } from "mobx-react";
const { width, height } = Dimensions.get("window");
const barStyle = Platform.OS === 'ios' ? "dark-content" : "light-content" 

class SignInScreen extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.keyboardHeight = 0;
    }

    state = {
        password: '',
        email: '',
        emailValid: false,
        passwordValid: false,
        addKeyboardHeight: false
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    doSignIn() {
        Keyboard.dismiss();
        const { email, password } = this.state
        const { authStore } = this.props;
        const { navigation } = this.props;
        const { onboardingStore } = this.props;

        this.refs.email.checkValidation()

        if (this.state.emailValid == true) {
            authStore.getSignIn({ email, password, authStore, navigation, onboardingStore }, this.resultSignIn, false)
        }
    }

    resultSignIn(isLoggedIn, authStore, navigation, onboardingStore, uuid) {
        if (isLoggedIn) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Profile' })],
            });
            navigation.dispatch(resetAction);
            onboardingStore._saveSearch();

            var nextScreenLabel = navigation.getParam('nextScreen');
            if (nextScreenLabel == 'OnBoardingSurvey') {
                navigation.navigate(nextScreenLabel);
            } else {
                navigation.navigate('Search');
            }
        }
        else {
        }
    }

    _onEmailTextChange(value) {
        this.setState({ email: value })
    }
    _onPasswordTextChange(value) {
        this.setState({ password: value })
    }

    backPressed() {
        const { authStore } = this.props;
        authStore.navigateToPreviousScreen = this.props.navigation.getParam('backScreen')
        this.props.navigation.goBack()
    }

    forgotPasswordClicked() {
        Keyboard.dismiss();
        this.props.navigation.navigate('ChangePassword');
    }

    _focusNextField(nextField) {
        if (nextField == 'EMAIL') {
            this.refs.password.refs.PASSWORD.focus()
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
        this.props.navigation.goBack();
        return true;
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
        Keyboard.dismiss();
    }

    render() {
        const { authStore, navigation } = this.props;
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

                            <View style={styles.topViewStyle}>
                                <TouchableOpacity style={styles.backButViewStyle} onPress={() => this.backPressed()}>
                                    <Image source={require('./../../assets/image/BackBlue.png')} style={styles.ImageStyle} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.titleStyle}>
                                <Text style={styles.signInTitle}>Sign In</Text>
                            </View>

                            <View style={styles.emailContainer}>
                                <FormField ref='email'
                                    type={'EMAIL'}
                                    placeHolder={'Email'}
                                    keyboardType={KeyboardType.EMAIL}
                                    onTextChanged={(text) => this._onEmailTextChange(text)}
                                    isFieldValid={(value) => this.setState({ emailValid: value })}
                                    autoFocus={false}
                                    nextFieldSelect={(value) => this._focusNextField(value)}
                                    checkValidation={true}
                                    returnKeyType={"next"}
                                />
                            </View>

                            <View style={styles.passwordContainer}>
                                <FormField ref='password'
                                    type={'PASSWORD'}
                                    placeHolder={'Password'}
                                    onTextChanged={(text) => this._onPasswordTextChange(text)}
                                    isFieldValid={(value) => this.setState({ passwordValid: value })}
                                    autoFocus={false}
                                    nextFieldSelect={(value) => this._focusNextField(value)}
                                    checkValidation={false}
                                    returnKeyType={"done"}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonStyle} onPress={() => this.doSignIn()}>
                                <Text style={styles.signInBuText}>Sign In</Text>
                            </TouchableOpacity>

                            <Text style={styles.forgotPassTextStyle} onPress={() => this.forgotPasswordClicked()}> Forgot Password?</Text>

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
                                <Text style={styles.dntHaveTextStyle}>Don't have an account?</Text>
                                <Text style={styles.signUpTextStyle} onPress={() => this.backPressed()}> Sign up</Text>
                            </View>
                            
                            {this.renderKeyBoardView()}

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>


        )
    }
}

export default inject("authStore", "onboardingStore")(observer(SignInScreen));

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
    emailContainer: {
        marginTop: 50,
        marginBottom: 15
    },
    passwordContainer: {
        marginBottom: 15
    },
    signInTitle: {
        color: '#0B2B80',
        fontSize: 25,
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
    signInBuText: {
        color: 'white',
        fontSize: 18,
        fontFamily: "Graphik-Regular"
    },
    forgotPassTextStyle: {
        fontSize: 12,
        height: 20,
        color: '#0B2B80',
        textAlign: 'right',
        top: 10,
        width: width - 40,
        fontFamily: "Graphik-Regular"
    },
    dntHaveTextStyle: {
        height: 20,
        textAlign: 'auto',
        fontFamily: "Graphik-Regular"
    },
    signUpTextStyle: {
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
        color: 'grey'
    },
    lineStyle: {
        flex: 3,
        height: 1,
        backgroundColor: 'grey'
    },
    orSubViewStyle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orSubViewTextStyle: {
        color: 'grey',
        fontSize: 18,
        height: 30,
        top: 5,
        fontFamily: "Graphik-Regular"
    },
    titleStyle: {
        width: 100,
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
    BottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        borderRadius: 5,
        width: 350,
        position: 'absolute',
        bottom: 35
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
        fontFamily: "Graphik-Regular"
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