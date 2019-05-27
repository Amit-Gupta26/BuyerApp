import React, { Component } from "react";
import {
    View,
    StyleSheet,
    TextInput
} from "react-native";

export default class TourFormField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            placeHolder: '',
            keyboardType: KeyboardType.DEFAULT,
            inputText: "",
            fieldValidate: true,
            selectedValue: false
        }
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
        var textValue;

        if (this.props.type == "PHONE") {
            textValue = this.formatPhoneNumber(text)
            this.setState({ inputText: textValue });
            alert(textValue)
        }
    }

    _onFocusReceived() {
        this.setState({
            selectedValue: true,
        })
    }

    _onFocusLost() {
        this.setState({
            selectedValue: false,
        })
    }

    checkValidation() {      
        this._validate(this.state.inputText)
    }

    _validate = (text) => {
        this._onInputTextChange(text)

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

    render() {
        const inputText = this.state;
        if (this.props.type == 'COMMENTS') {
            return (
                <View style={styles.commentContainerStyle}>
                    <TextInput
                        style={styles.commentTextInputStyle}
                        multiline={true}
                        placeholderTextColor='grey'
                        numberOfLines={4}
                        placeholder='Would you like to add any additional notes for your agent? (optional)'
                        underlineColorAndroid={'transparent'}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.formContainerStyle}>
                    <View style={styles.formSubContainerStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={this.props.placeHolder}
                            autoCapitalize="none"
                            placeholderTextColor='grey'
                            returnKeyType={"next"}
                            keyboardType={this.props.keyboardType}
                            onChangeText={text => this._validate(text)}
                            value={inputText}
                            onFocus={() => this._onFocusReceived()}
                            onBlur={() => this._onFocusLost()}
                        />
                    </View>
                    <View style={[styles.textErrorSectionStyle, !this.state.fieldValidate ? styles.textError : null]}>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    formSubContainerStyle: {
        flex: 9.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 50
    },
    textErrorSectionStyle: {
        flex: .5,
        backgroundColor: 'transparent',
        height: 2,
        justifyContent: 'center'
    },
    textError: {
        flex: .5,
        backgroundColor: 'red',
        height: 2
    },
    formContainerStyle: {
        height: 45,
        flexDirection: 'column',
        paddingLeft: 0,
        backgroundColor: 'white'
    },
    textInputStyle: {
        flex: 1,
        marginLeft: 8,
        marginRight: 20
    },
    commentContainerStyle: {
        height: 55,
        flexDirection: 'column',
        paddingLeft: 0,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        marginLeft: 10,
        marginRight: 10
    },
    commentTextInputStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        paddingLeft: 8
    }
});

const KeyboardType = {
    DEFAULT: "default",
    PHONE: "phone-pad",
    EMAIL: "email-address",
    DECIMAL: "decimal-pad"
};

export { KeyboardType };
