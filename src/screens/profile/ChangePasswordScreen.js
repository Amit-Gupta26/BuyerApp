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
    BackHandler,
    SafeAreaView,
    StatusBar,
    ScrollView
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'
import FormField from '../../components/FormField';
import { KeyboardType } from '../../components/FormField';
import { observer, inject } from "mobx-react";

const { width, height } = Dimensions.get("window");
const barStyle = Platform.OS === 'ios' ? "dark-content" : "light-content" 
var _keyboardWillShowSubscription;
var _keyboardWillHideSubscription;

class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        email: '',
        emailValid: false,
        height: height - 332
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    _onEmailTextChange(value) {
        this.setState({ email: value })
    }

    backPressed() {
        this.props.navigation.goBack()
    }

    componentDidMount() {
        _keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
        _keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        _keyboardWillShowSubscription.remove();
        _keyboardWillHideSubscription.remove();
    }
    _keyboardWillShow(e) {
        this.setState({ height: height - 332 - e.endCoordinates.height });
    }
    _keyboardWillHide(e) {
        this.setState({ height: height - 332 });
    }


    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    sendLink() {
        Keyboard.dismiss();
        const { email } = this.state
        const { authStore, navigation } = this.props
        this.refs.email.checkValidation()

        if (this.state.emailValid == true) {
            authStore.sendLink({ email, authStore, navigation }, this.resultChangePassword);
        }
    }

    resultChangePassword(isLinkSend, authStore, navigation) {
        if (isLinkSend == true) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'RegisterScreen' })],
            });
            navigation.dispatch(resetAction);
            navigation.navigate('Search')
        }
    }

    _focusNextField(nextField) {
    }

    render() {
        console.log(height)
        const { authStore } = this.props
        let resetText = "Please enter the email address associated with your account and we'll send you a link so you can reset your password."
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
                                <Text style={styles.resetPassStyle}>Reset Password</Text>
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
                                    returnKeyType={"done"}
                                />
                            </View>

                            <Text style={styles.dntHaveTextStyle}>{resetText}</Text>

                            <TouchableOpacity style={[styles.buttonStyle, { top: this.state.height }]} onPress={() => this.sendLink()}>
                                <Text style={styles.sendLinkBuText}>Send Link</Text>
                            </TouchableOpacity>


                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default inject("authStore")(observer(ChangePasswordScreen));

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
        marginTop: 30,
        marginBottom: 10
    },
    resetPassStyle: {
        color: '#0B2B80',
        fontSize: 20,
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
    sendLinkBuText: {
        color: 'white',
        fontSize: 18,
        fontFamily: "Graphik-Regular"
    },
    dntHaveTextStyle: {
        height: 60,
        textAlign: 'center',
        fontSize: 12,
        width: width - 80,
        fontFamily: "Graphik-Regular"
    },
    titleStyle: {
        width: 200,
        height: 40,
        marginTop: -20,
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
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        alignItems: 'center'
    }
})