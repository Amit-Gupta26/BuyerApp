import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
const { width, height } = Dimensions.get("window");
const exact_select = "./../../assets/image/Property-Selection.png";

class ProprtypeCell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            selected: this.props.selected
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.refresh !== newProps.refresh) {
          this.setState({ selected: false})
        }
      }

    handlePropTypeClick = item => {
        if (this.state.selected == true) {
            this.setState({ selected: false })
        }
        else {
            this.setState({ selected: true })
        }
        this.state.selected = true
        this.props.onTap(this.props.type)
    }


    renderImageComponent() {
        if (this.state.selected) {
            return (
                <View style={styles.imageBaseView}>
                    <View style={styles.imageTopView} >
                        <Image style={styles.imageMainCon}
                            source={require(exact_select)}
                        />
                    </View>
                </View>
            )
        }
    }

    componentDidMount() {
        console.log("hello");
    }

    render() {
        let type = this.props.type
        return (
            <TouchableOpacity style={styles.topView} onPress={this.handlePropTypeClick}>
                <View style={styles.topLabelView}>
                    <Text style={[styles.topLabelText, { color: this.state.selected ? '#0B2B80' : '#272935' }]}>{type}</Text>
                    {this.renderImageComponent()}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    topView: {
        backgroundColor: "white",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: 1.0,
        flexDirection: "column",
        width: width,
        left: 10
    },
    imageBaseView: {
        alignItems: "flex-end",
        flex: 1
    },
    imageTopView: {
        flexDirection: "row",
        right: 20,
        top: 0
    },
    topLabelView: {
        flexDirection: "row",
        marginHorizontal: 0,
        marginTop: 18,
        // marginBottom: 10,
        backgroundColor: "transparent"
    },
    topLabelText: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        left: 0
    },
    imageMainCon: {
        height: 20,
        width: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ProprtypeCell;
