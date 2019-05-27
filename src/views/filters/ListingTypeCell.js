import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get("window");

class ListingTypeCell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            value: this.props.preSelectedValue,
            firstViewColor: "",
            firstViewTextColor: "",
            secondViewColor: "",
            secondViewTextColor: "",
        }
    }

    componentWillMount() {
        if (this.state.value == "MLS") {
            this.setState({
                firstViewColor: "#0B2B80",
                firstViewTextColor: "white",
                secondViewColor: "white",
                secondViewTextColor: "#0B2B80"
            })
        }
        else {
            this.setState({
                firstViewColor: "white",
                firstViewTextColor: "#0B2B80",
                secondViewColor: "#0B2B80",
                secondViewTextColor: "white"
            })
        }
    }

    changeValue(value) {
        this.indexClicked(1);
    }

    indexClicked(index) {
        if (index == 1) {
            this.setState({
                firstViewColor: "#0B2B80",
                firstViewTextColor: "white",
                secondViewColor: "white",
                secondViewTextColor: "#0B2B80"
            })
            this.props.itemClick('MLS')
        }
        else {
            this.setState({
                firstViewColor: "white",
                firstViewTextColor: "#0B2B80",
                secondViewColor: "#0B2B80",
                secondViewTextColor: "white"
            })
            this.props.itemClick('FSBO')
        }
    }

    render() {
        const { type } = this.props
        return (
            <View style={styles.topLabelView}>
                <Text style={styles.cellType}>{type}</Text>
                <View style={styles.tabsContainerStyle}>
                    <TouchableOpacity style={[styles.touchableView, { backgroundColor: this.state.firstViewColor }]} onPress={() => this.indexClicked(1)}>
                        <Text style={[styles.tabTextStyle, { color: this.state.firstViewTextColor }]}>By Agent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchableView, { backgroundColor: this.state.secondViewColor }]} onPress={() => this.indexClicked(2)}>
                        <Text style={[styles.tabTextStyle, { color: this.state.secondViewTextColor }]}>By Owners</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabTextStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0B2B80",
        alignItems: "center",
    },
    touchableView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tabsContainerStyle: {
        flexDirection: "row",
        height: 50,
        left: 20,
        width: width - 40,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#dddddd'
    },
    topLabelView: {
        flexDirection: "column",
        backgroundColor: "white",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1.0
    },
    cellType: {
        top: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#272935",
        marginBottom: 30,
        left: 20
    }
});

export default ListingTypeCell;
