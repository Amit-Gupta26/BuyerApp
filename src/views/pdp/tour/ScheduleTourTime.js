import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    FlatListItemSeparator,
    Platform
} from "react-native";
import { tourTimeData } from "../../../data/TourTime";
import ScheduleTourHeaderView from "./ScheduleTourHeaderView";
import { observer, inject } from "mobx-react";

class ScheduleTourTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            morningActive: true,
            afternoonActive: false
        }
    }

    _onMorningPress() {
        this.setState({ morningActive: !this.state.morningActive, afternoonActive: this.state.morningActive })
        this.flatListRef.scrollToIndex({ animated: true, index: 0 });
    }

    _onAfternoonPress() {
        this.setState({ afternoonActive: !this.state.afternoonActive, morningActive: this.state.afternoonActive })
        this.flatListRef.scrollToIndex({ animated: true, index: 7 });
    }

    _renderItem = ({item, index}) => {
        const { tourStore } = this.props;
        var anytime = false;
        if(index==0){
            anytime = true;
        }
        return (
            <MyListItem
                id={index}
                onPressItem={this._onPressItem}
                selected={!!tourStore.getTimeSelectedData(index)}
                title={item.time}
                period={item.period}
                anytime = {anytime}
            />
        )
    }

    _onPressItem = (id) => {
        var selected = new Map();
        selected.set(id, !selected.get(id));
         const { tourStore } = this.props;
         tourStore.mapTimeSelected = selected;
         this.props.listClickCallBack()
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        var address1 = this.props.addressLine1
        var address2 = this.props.addressLine2
        var imageUrl = this.props.imageUrl
        return (
            <View style={styles.rootSubContainer}>
                <ScrollView stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.timeHeaderContainer}>
                        <ScheduleTourHeaderView
                            addressLine1={address1}
                            addressLine2={address2}
                            imageUrl={imageUrl}
                            parentBackClickCallBack={this.props.parentBackClickCallBack} />
                    </View>
                    <View style={styles.timeDateContainer}>
                        <View style={styles.dateSubContainer}>
                            <View style={styles.circleContainer}>
                                <View style={styles.circle}>
                                    <Text style={styles.circleTextStyle}>2</Text>
                                </View>
                            </View>
                            <Text style={styles.propertyTitleLabel}>What time works{"\n"} for you?</Text>
                            <Text style={styles.hourTitleLabel}>Select an hour</Text>
                            <View style={styles.timeContainer}>
                                <TouchableOpacity
                                    style={this.state.morningActive ? styles.timeButtonActive : styles.timeButtonInActive}
                                    onPress={() => this._onMorningPress()}
                                >
                                    <Text style={styles.timeTextStyle}>Morning</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.afternoonActive ? styles.timeButtonActive : styles.timeButtonInActive}
                                    onPress={() => this._onAfternoonPress()}
                                >
                                    <Text style={styles.timeTextStyle}>Afternoon/Evening</Text>
                                </TouchableOpacity>
                            </View>

                             <FlatList
                                    data={tourTimeData}
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    extraData={this.state}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        var isAnytime = this.props.anytime;
        var textColor;
        if(isAnytime){
            textColor = this.props.selected ? 'white' : '#0B2B80';
        }else{
            textColor = this.props.selected ? 'white' : '#373A42';
        }
        const textBackground = this.props.selected ? '#0B2B80' : 'white';
        const subTextColor = this.props.selected ? 'white' : '#909090';
        return (
            <View>
                <Text style={{
                    padding: 10,
                    fontSize: 14,
                    height: 40,
                    borderWidth: 0.4,
                    borderColor: '#A9A9A9',
                    fontWeight: 'bold',
                    color: textColor,
                    backgroundColor: textBackground
                }}
                    onPress={this._onPress}>{this.props.title}<Text style={{ color: subTextColor }}> {this.props.period}</Text>
                </Text>
            </View>
        );
    }
}

export default inject("tourStore")(observer(ScheduleTourTime));
const styles = StyleSheet.create({
    rootSubContainer: {
        flex: 1,
        backgroundColor: '#F8F8F8'
    },
    timeHeaderContainer: {
        flex: Platform.OS === 'ios' ? 0.8 : 1.06
    },
    timeDateContainer: {
        flex: 9,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    dateSubContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },
    circleContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: '#0B2B80',
        borderWidth: 2
    },
    circleTextStyle: {
        color: '#0B2B80',
        fontWeight: 'bold',
        fontSize: 17
    },
    propertyTitleLabel: {
        fontSize: 18,
        textAlign: 'center',
        color: '#0B2B80',
        marginTop: 30
    },
    hourTitleLabel: {
        fontSize: 14,
        textAlign: 'center',
        color: '#606060',
        marginBottom: 20,
        marginTop: 20,
        color: '#5B5B5B'
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 30
    },
    timeTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 14
    },
    flatListRowItem: {
        padding: 10,
        fontSize: 14,
        height: 40,
        borderWidth: 1,
        color: '#373A42',
        borderColor: '#A9A9A9',
        fontWeight: 'bold'
    },
    listRowSubTextStyle: {
        color: '#909090'
    },
    timeButtonStyle: {
        width: '50%',
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#0B2B80',
        borderWidth: 2,
        borderColor: '#ffffff'
    },
    timeButtonInActive: {
        width: '50%',
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#ffffff',
    },
    timeButtonActive: {
        width: '50%',
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#E8E8EA',
    }
});