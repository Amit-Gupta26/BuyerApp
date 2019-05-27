import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity
} from "react-native";
import ScheduleTourTime from "../../views/pdp/tour/ScheduleTourTime";
import ScheduleTourInfo from "../../views/pdp/tour/ScheduleTourInfo";
import ScheduleTourDate from "../../views/pdp/tour/ScheduleTourDate";
import { observer, inject } from "mobx-react";

class ScheduleTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'time',
        }
        this._onBackButtonClicked = this._onBackButtonClicked.bind(this);
        this._onListItemPress = this._onListItemPress.bind(this);
        this._onTourDateSelected = this._onTourDateSelected.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Schedule a Tour',
        headerTitleStyle: { textAlign: "center", alignSelf: "center", marginLeft: 52 },
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#1F47AF",
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.state.params.handleClearPress(navigation)}>
                <Image
                    source={require("../../assets/image/clear.png")}
                    style={{ marginHorizontal: 12 }}
                />
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        this.props.navigation.setParams({
            handleClearPress: this._handleClearPress.bind(this)
        });
    }

    _handleClearPress(navigation) {
        const { tourStore } = this.props;
        tourStore.clearTimeData()
        tourStore.clearDateData()
        navigation.goBack(null)
    }

    _onListItemPress = () => {
        this.setState({ type: 'info' })
    }

    _onBackButtonClicked = () => {
        var currentState = this.state.type;
        if (currentState === 'info') {
            this.setState({ type: 'time' })
        } else if (currentState === 'time') {
            const { tourStore } = this.props;
            tourStore.clearTimeData()
            this.setState({ type: 'date' })
        }
    }

    _onTourDateSelected(index) {
        if (index > 0) {
            this.setState({ type: 'time' })
        } else {
            this.setState({ type: 'info' })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.rootContainer}>
                {this._renderTourComponent(this.state.type, this.props.navigation.getParam(
                    "tourAddressLine1"), this.props.navigation.getParam(
                        "tourAddressLine2"), this.props.navigation.getParam("imageUrl"))}
            </SafeAreaView >
        );
    }

    _renderTourComponent(type, address1, address2, imageUrl) {
        if (type === 'time') {
            return this._renderTourTimeComponent(address1, address2, imageUrl)
        } else if (type === 'info') {
            return this._renderTourInfoComponent(address1, address2, imageUrl)
        } else if (type == 'date') {
            return this._renderTourDateComponent(address1, address2, imageUrl)
        }
    }

    _renderTourTimeComponent(address1, address2, imageUrl) {
        return (
            <ScheduleTourTime
                addressLine1={address1}
                addressLine2={address2}
                imageUrl={imageUrl}
                parentBackClickCallBack={this._onBackButtonClicked}
                listClickCallBack={this._onListItemPress} />
        );
    }

    _renderTourInfoComponent(address1, address2, imageUrl) {
        return (
            <ScheduleTourInfo
                addressLine1={address1}
                addressLine2={address2}
                imageUrl={imageUrl}
                parentBackClickCallBack={this._onBackButtonClicked}
                listClickCallBack={this._onListItemPress} />
        )
    }

    _renderTourDateComponent(address1, address2, imageUrl) {
        return (
            <ScheduleTourDate
                addressLine1={address1}
                addressLine2={address2}
                imageUrl={imageUrl}
                parentBackClickCallBack={this._onBackButtonClicked}
                tourDateClickCallBack={this._onTourDateSelected} />
        )
    }

}

export default inject("tourStore")(observer(ScheduleTour));
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
});
