import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Platform,
    TextInput,
    TouchableOpacity,
    Dimensions
} from "react-native";

const imageSize = Platform.OS === 'ios' ? 15 : 10
const { width, height } = Dimensions.get("window");

export default class FormField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            placeHolder: '',
            keyboardType: KeyboardType.DEFAULT,
            inputText: "",
            fieldValidate: true,
            showContent: true,
            selectedValue: false
        }
    }

    renderImage() {
        let imagePath;
        switch (this.props.type) {
            case 'EMAIL':
                imagePath = require('./../assets/image/Message.png');
                break;
            case 'FIRSTNAME':
                imagePath = require('./../assets/image/user2.png');
                break;
            case 'LASTNAME':
                imagePath = require('./../assets/image/user2.png');
                break;
            case 'PASSWORD':
                imagePath = require('./../assets/image/lock2.png');
                break;
            case 'PHONE':
                imagePath = require('./../assets/image/IconPhoneBlue.png');
                break;
            default:
                imagePath = require('./../assets/image/search.png');
                break;
        }
        return imagePath;
    }

    renderImageNotSelected() {
        let imagePath;
        switch (this.props.type) {
            case 'EMAIL':
                imagePath = require('./../assets/image/email.png');
                break;
            case 'FIRSTNAME':
                imagePath = require('./../assets/image/Name-tab-icon.png');
                break;
            case 'LASTNAME':
                imagePath = require('./../assets/image/Name-tab-icon.png');
                break;
            case 'PASSWORD':
                imagePath = require('./../assets/image/lock.png');
                break;
            case 'PHONE':
                imagePath = require('./../assets/image/call.png');
                break;
            default:
                imagePath = require('./../assets/image/search.png');
                break;
        }
        return imagePath;
    }

    onChangeText = (key, val) => {
        // this.setState({ [key]: val })
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return phoneNumberString
    }

    _onInputTextChange(text) {
        this.setState({ inputText: text });
        this.props.onTextChanged(text);
        var textValue = text;

        if (this.props.type == "PHONE") {
            textValue = this.formatPhoneNumber(text)
            this.setState({ inputText: textValue });
            this.props.onTextChanged(textValue);
        }
        else {
            this.setState({ inputText: textValue });
            this.props.onTextChanged(textValue);
        }
        this.validate(textValue)
    }

    _getPasswordVisibilityImage(inputText, showContent) {
        if (inputText) {
            let eyesImage = require("./../assets/image/password_visbility.png");
            let passwordVisibilityImage = (<TouchableOpacity onPress={() => this._togglePasswordVisibility(!showContent)}>
                <Image style={styles.visibilityImage} source={eyesImage} />
            </TouchableOpacity>);
            return passwordVisibilityImage;
        }
        else {
            let eyesImage = require("./../assets/image/password_visbility.png")
            let passwordVisibilityImage = (<TouchableOpacity onPress={() => this._togglePasswordVisibility(!showContent)}>
                <Image style={styles.visibilityImage} source={eyesImage} />
            </TouchableOpacity>);
            return passwordVisibilityImage;
        }

    }

    _togglePasswordVisibility(show) {
        this.setState({ showContent: show });
    }

    focusReceived() {
        this.setState({
            selectedValue: true,
        })
    }

    focusLost(text) {
        this.validate(text)
        this.setState({
            selectedValue: false,
        })
    }

    checkValidation() {
        this.validate(this.state.inputText)
    }

    validate = (text) => {
        if (this.props.checkValidation == true) {
            if (this.props.type == 'FIRSTNAME' || this.props.type == 'LASTNAME') {
                let nameRegex = /^[a-zA-Z]{1,10}$/;
                if (nameRegex.test(text) === false) {
                    this.setState({
                        fieldValidate: false,
                    })
                    this.props.isFieldValid(false)
                }
                else {
                    this.setState({
                        fieldValidate: true,
                    })
                    this.props.isFieldValid(true)
                }
            }
            else if (this.props.type == 'EMAIL') {
                let emailReg = /([0-9a-zA-Z]+)([._-][a-zA-Z0-9]+)*@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
                if (emailReg.test(text) === false) {
                    this.setState({
                        fieldValidate: false,
                    })
                    this.props.isFieldValid(false)
                }
                else {
                    this.setState({
                        fieldValidate: true,
                    })
                    this.props.isFieldValid(true)
                }
            }
            else if (this.props.type == 'PASSWORD') {
                let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (passwordReg.test(text) === false) {
                    this.setState({
                        fieldValidate: false,
                    })
                    this.props.isFieldValid(false)
                }
                else {
                    this.setState({
                        fieldValidate: true,
                    })
                    this.props.isFieldValid(true)
                }
            }
            else if (this.props.type == 'PHONE') {
                let phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (phoneReg.test(text) === false) {
                    this.setState({
                        fieldValidate: false,
                    })
                    this.props.isFieldValid(false)
                }
                else {
                    this.setState({
                        fieldValidate: true,
                    })
                    this.props.isFieldValid(true)
                }
            }
        }
    }


    render() {
        const { inputText, showContent } = this.state;
        let passwordVisibilityImage = this._getPasswordVisibilityImage(inputText, showContent);

        passwordVisibilityImage = (this.props.type == 'PASSWORD')
            ? passwordVisibilityImage
            : null;
        this.state.showContent = (this.props.type == 'PASSWORD')
            ? true
            : false;
        if (this.props.type == 'FIRSTNAME') {
            return (
                <View style={[styles.firstLastViewStyle, { marginRight: 10 }]}>

                    <View style={styles.UserSectionStyle}>
                        <Image source={this.state.selectedValue ? this.renderImage() : this.renderImageNotSelected()} style={styles.ImageStyle} />

                        <TextInput ref={this.props.type}
                            style={{ flex: 1, marginLeft: 5, fontFamily: "Graphik", height: 42 }}
                            placeholder={this.props.placeHolder}
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            returnKeyType={this.props.returnKeyType}
                            keyboardType={this.props.keyboardType}
                            onChangeText={text => this._onInputTextChange(text)}
                            value={inputText}
                            autoFocus={this.props.autoFocus}
                            onFocus={(text) => this.focusReceived()}
                            onBlur={(text) => this.focusLost(this.state.inputText)}
                            onSubmitEditing={() => this.props.nextFieldSelect(this.props.type)}
                        />
                    </View>

                    <View style={[styles.ErrorSectionStyle, !this.state.fieldValidate ? styles.error : null]}>
                    </View>
                </View>

            );
        }
        else if (this.props.type == 'LASTNAME') {
            return (
                <View style={[styles.firstLastViewStyle, { marginRight: 0 }]}>
                    <View style={styles.UserSectionStyle}>
                        <TextInput ref={this.props.type}
                            style={{ flex: 1, marginLeft: 15, fontFamily: "Graphik", height: 42}}
                            placeholder={this.props.placeHolder}
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            returnKeyType={this.props.returnKeyType}
                            keyboardType={this.props.keyboardType}
                            onChangeText={text => this._onInputTextChange(text)}
                            value={inputText}
                            autoFocus={this.props.autoFocus}
                            onFocus={(text) => this.focusReceived()}
                            onBlur={(text) => this.focusLost(this.state.inputText)}
                            onSubmitEditing={() => this.props.nextFieldSelect(this.props.type)}
                        />
                    </View>
                    <View style={[styles.ErrorSectionStyle, !this.state.fieldValidate ? styles.error : null]}>
                    </View>
                </View>

            );
        }
        else {
            return (
                <View style={styles.topViewStyle}>
                    <View style={styles.CommonStyle}>
                        <Image source={this.state.selectedValue ? this.renderImage() : this.renderImageNotSelected()} style={styles.ImageStyle} />
                        <TextInput ref={this.props.type}
                            style={{ flex: 1, marginLeft: 5, fontFamily: "Graphik", height: 42}}
                            placeholder={this.props.placeHolder}
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            returnKeyType={this.props.returnKeyType}
                            keyboardType={this.props.keyboardType}
                            onChangeText={text => this._onInputTextChange(text)}
                            value={inputText}
                            secureTextEntry={showContent}
                            autoFocus={this.props.autoFocus}
                            onFocus={(text) => this.focusReceived()}
                            onBlur={(text) => this.focusLost(this.state.inputText)}
                            onSubmitEditing={() => this.props.nextFieldSelect(this.props.type)}
                        />
                        {passwordVisibilityImage}
                    </View>
                    <View style={[styles.ErrorSectionStyle, !this.state.fieldValidate ? styles.error : null]}>
                    </View>
                </View>

            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    CommonStyle: {
        flex: 9.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F2F1',
        height: 50,
        width: width - 40
    },

    UserSectionStyle: {
        flex: 9.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F2F1',
        height: 50
    },
    ErrorSectionStyle: {
        flex: .5,
        backgroundColor: 'transparent',
        height: 2,
        justifyContent: 'center'
    },
    ErrorMessageSectionStyle: {
        flex: .5,
        backgroundColor: 'transparent',
        height: 10,
        justifyContent: 'center'
    },
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: imageSize,
        width: imageSize,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    error: {
        flex: .5,
        backgroundColor: 'red',
        height: 2
    },
    visibilityImage: {
        width: 18,
        height: 18,
        marginRight: 10,
        resizeMode: 'contain'
    },
    topViewStyle: {
        height: 45,
        flexDirection: 'column',
        marginBottom: 10,
        paddingLeft: 0
    },
    firstLastViewStyle: {
        flex: 1,
        height: 45,
        flexDirection: 'column'
    }
});

const KeyboardType = {
    DEFAULT: "default",
    PHONE: "phone-pad",
    EMAIL: "email-address",
    DECIMAL: "decimal-pad"
};

export { KeyboardType };
