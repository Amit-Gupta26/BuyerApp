import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";

class GridView extends Component {

    constructor(props) {
        super(props)
    }

    _getDateItem(index, item) {
        let color = item.selected ? '#0B2B80' : '#B1B2B6'

        return (
            <View style={[styles.GridView, { width: this.props.width }]}>
                <View style={[styles.numberView, { width: this.props.width - 1 }]}>
                    <Text style={[styles.numberText, { color: color }]}>
                        {item.value}
                    </Text>
                </View>
                <View style={styles.dividerView}>
                </View>
            </View>
        );

    }

    _renderASAPGripAndDateGrid(index, item) {
        return this._getDateItem(index, item);
    }



    render() {
        const {currentIndex,currentItem } = this.props;

        return (
            <TouchableOpacity
                style={[styles.flatListView, { width: this.props.width }]}
                onPress={() => {
                    this.props.onTap(currentItem.value, currentItem.id)
                }}>
                {this._renderASAPGripAndDateGrid(currentIndex, currentItem)}
            </TouchableOpacity>
        );
    }
}

class BedAndBathCell extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '',
            refresh: false,
            dataItems: [],
        }
    }
    refreshFlatList(value, id) {
        var newData = []
        this.state.dataItems.forEach((elem) => {
            var tempElem = elem
            if (elem.value === value) {

                if (elem.selected == true) {
                    this.props.onTap('')
                }
                else {
                    this.props.onTap(id)
                }
                tempElem.selected = !elem.selected
            }
            else {
                tempElem.selected = false
            }
            newData.push(tempElem);
        })

        this.setState({ 
            dataItems: newData
        })
    }

    refreshView(){
        this.setState({ 
            dataItems: []
        })
    }

    render() {
        if ((this.state.dataItems.length > 0)) {
            if (this.state.dataItems[0].value != this.props.dataItemsArray[0].value) {
                this.setState({
                    dataItems: [],
                })
            }
        }

        var dataItemsArray = this.state.dataItems.length === 0 ? this.props.dataItemsArray : this.state.dataItems;
        this.state.dataItems = dataItemsArray

        return (
            <View style={styles.topView}>
                <FlatList
                    style={styles.flatList}
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    data={dataItemsArray}
                    renderItem={({ item, index }) => (
                        <GridView currentIndex={index}
                            currentItem={item}
                            width={this.props.width}
                            selected={item.selected}
                            onTap={(value, id) => this.refreshFlatList(value, id)} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topView: {
        marginBottom: 0,
        marginLeft: 10,
        backgroundColor: "transparent"
    },
    flatList: {
        backgroundColor: "transparent",
        marginVertical: 8
    },
    flatListView: {
        backgroundColor: "white",
        height: 30,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 0 
    },
    dividerView: {
        width: 1,
        height: 30,
        marginLeft: 0,
        backgroundColor: "#B1B2B6"
    },
    numberView: {
        alignItems: "center",
        justifyContent: "center",
        width: 59,
        height: 30,
        backgroundColor: "white",
    },
    numberText: {
        fontSize: 14,
        fontWeight: "bold",
        paddingVertical: 4,
    },
    GridView: {
        backgroundColor: "white",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "row"
    }
});

export default BedAndBathCell;