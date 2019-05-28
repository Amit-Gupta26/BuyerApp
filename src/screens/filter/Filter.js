import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
    UIManager,
    findNodeHandle,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Platform
} from "react-native";
import { inject, observer } from "mobx-react";
import PropertyTypeCell from "../../views/filters/PropertyTypeCell";
import { daysOnOwnersData } from '../../data/DaysOnOwnersData'
import { bedsData, bedsExactData, bathData, bathExactData } from '../../data/BedAndBathData'
import { priceMinData, priceMaxData } from '../../data/PriceFilterData'
import { squareFeetMinData, squareFeetMaxData } from '../../data/SquareFeetData'
import { yearBuiltMinData, yearBuiltMaxData } from '../../data/YearBuiltData'
import PriceYearSqFliterView from "../../views/filters/PriceYearSqFliterView";
import BedAndBathFilterView from "../../views/filters/BedAndBathFilterView";
import ToggelBasedCell from "../../views/filters/ToggelBasedCell";
import ListingTypeCell from "../../views/filters/ListingTypeCell";
import DaysOnOwnersCell from "../../views/filters/DaysOnOwnersCell";
import HomePreference from "../../views/filters/preference/HomePreference";
import FilterTagView from '../../components/FilterTagView';


const { width, height } = Dimensions.get("window");

class Filter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listingType: this.props.searchStore.listingType ? this.props.searchStore.listingType : "MLS",
            propTypeArray: this.props.searchStore.propertyTypes ? this.props.searchStore.propertyTypes : [],
            minPrice: this.props.searchStore.minPrice ? this.props.searchStore.minPrice : 'No Min',
            maxPrice: this.props.searchStore.maxPrice ? this.props.searchStore.maxPrice : 'No Max',
            minSqFeet: this.props.searchStore.minSquareFeet ? this.props.searchStore.minSquareFeet : 'No Min',
            maxSqFeet: this.props.searchStore.maxSquareFeet ? this.props.searchStore.maxSquareFeet : 'No Max',
            minYear: this.props.searchStore.minYearBuilt ? this.props.searchStore.minYearBuilt : 'No Min',
            maxYear: this.props.searchStore.maxYearBuilt ? this.props.searchStore.maxYearBuilt : 'No Max',
            openHouse: this.props.searchStore.isOpenHouse ? this.props.searchStore.isOpenHouse : false,
            priceReduced: this.props.searchStore.isPriceReduced ? this.props.searchStore.isPriceReduced : false,
            beds: this.props.searchStore.beds ? this.props.searchStore.beds : '',
            baths: this.props.searchStore.baths ? this.props.searchStore.baths : '',
            daysOnOwners: this.props.searchStore.daysOnOwners ? this.props.searchStore.daysOnOwners : 'Any',
            scrollPreviousPosition: 0,
            tempScrollPreviousPosition: 0,
            filterValues: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            title: 'Filter',
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center', },
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: '#1F47AF',
            headerRight: <TouchableOpacity onPress={() => params.clearData()} >
                <Text style={styles.rightBarButton}>Clear All</Text>
            </TouchableOpacity>
        }
    };

    _onFilterDelete = filterType => {
        this.setState({
            filterValues: this.state.filterValues.filter(
                data => data.type !== filterType
            )
        });
    };

    _getItemIndex = filter => {
        const { filterValues } = this.state;
        let index = -1;
        for (let i = 0; i < filterValues.length; i++) {
            if (filterValues[i].type === filter.type) {
                index = i;
                break;
            }
        }
        return index;
    };

    _onFilterTap = filter => {
        let indexOf = this._getItemIndex(filter);
        if (indexOf === -1) {
            this.setState({
                filterValues: [
                    ...this.state.filterValues,
                    { type: filter.type, value: filter.value }
                ]
            });
        } else {
            this.state.filterValues.splice(indexOf, 1, {
                type: filter.type,
                value: filter.value + " New"
            });
            this.setState({
                filterValues: this.state.filterValues
            });
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({ clearData: this.clearAllClicked })
    }

    dismissPickerTapped() {
        this.refs.ScrollView.scrollTo({ x: 0, y: this.state.scrollPreviousPosition, animated: true });
    }

    openPickerTapped(value) {
        this.state.scrollPreviousPosition = this.state.tempScrollPreviousPosition
        var handle = 0
        if (value == 'Price Range') {
            handle = findNodeHandle(this.refs.priceRange);
        }
        else if (value == 'Square Feet') {
            handle = findNodeHandle(this.refs.squareFeet);

        }
        else if (value == 'Year Built') {
            handle = findNodeHandle(this.refs.yearBuilt);

        }
        else if (value == 'Days On Owners') {
            handle = findNodeHandle(this.refs.daysOnOwners);
        }

        UIManager.measureLayoutRelativeToParent(
            handle,
            (e) => { console.error(e) },
            (x, y, w, h) => {
                yPosition = y
                this.refs.ScrollView.scrollTo({ x: 0, y: y, animated: true });
                console.log('offset', x, y, w, h);
            });
    }

    clearAllClicked = () => {
        this.setState({
            openHouse: false,
            priceReduced: false,
            listingType: 'MLS',
            propTypeArray: [],
            minPrice: 'No Min',
            maxPrice: 'No Max',
            minSqFeet: 'No Min',
            maxSqFeet: 'No Max',
            minYear: 'No Min',
            maxYear: 'No Max',
            beds: '',
            baths: '',
            daysOnOwners: 'Any'
        })
        this.refs.openHouse.changeValue(false)
        this.refs.priceReduced.changeValue(false)
        this.refs.propertyType.changedValue([])
        this.refs.priceRange.changeValue('No Min', 'No Max')
        this.refs.squareFeet.changeValue('No Min', 'No Max')
        this.refs.yearBuilt.changeValue('No Min', 'No Max')
        this.refs.beds.changedValue('')
        this.refs.baths.changedValue('')
        this.refs.daysOnOwners.changeValue('Any')
        this.refs.listingType.changeValue('MLS')
    }

    applyFilter() {
        this.props.searchStore.updatePopertyTypes(this.state.propTypeArray, "");
        this.props.searchStore.updateBeds(this.state.beds)
        this.props.searchStore.updateBaths(this.state.baths)
        this.props.searchStore.updatePriceRange(this.state.minPrice, this.state.maxPrice, "")
        this.props.searchStore.updateSquareFeetArea(this.state.minSqFeet, this.state.maxSqFeet)
        this.props.searchStore.updateYearBuilt(this.state.minYear, this.state.maxYear)
        this.props.searchStore.updateListingType(this.state.listingType)
        this.props.searchStore.updateOpenHouse(this.state.openHouse)
        this.props.searchStore.updatePriceReduced(this.state.priceReduced)
        this.props.searchStore.updateDaysOnowners(this.state.daysOnOwners)
        this.props.navigation.goBack()
        this.props.searchStore.applyFilter()
    }

    render() {
        let filterViews = [
            { type: "Bed", value: "Beds 3+" },
            { type: "Bath", value: "Baths 4+" },
            { type: "Price", value: "Price 200k - 300k" },
            { type: "Year", value: "Year 1999 - 2010" },
            { type: "SqFeet", value: "SqFeet 200 - 300" },
            { type: "Open", value: "Open House" },
            { type: "New", value: "New Listing" },
        ];
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#0B2B80" barStyle={Platform.OS == 'ios' ? "dark-content" : "light-content"} />
                <View style={styles.container}>
                    <ScrollView ref="ScrollView" style={styles.scrollViewContainer}>

                        <View style={styles.tagContainer}>
                            {this.state.filterValues.map((data, index) => (
                                <FilterTagView
                                    key={index.toString()}
                                    filter={data}
                                    onPressDelete={type => this._onFilterDelete(type)}
                                />
                            ))}
                        </View>
                        <View style ={{flexDirection:'row'}}>
                        {filterViews.map(view => {
                            return (
                                <TouchableOpacity
                                    style={{ padding: 10 }}
                                    key={view.type}
                                    onPress={() => this._onFilterTap(view)}
                                >
                                    <Text>{view.type}</Text>
                                </TouchableOpacity>
                            );
                        })}
                        </View>
                        <PropertyTypeCell ref='propertyType'
                            type={'Property Type'}
                            propTypeArray={Array.from(this.state.propTypeArray)}
                            navigation={this.props.navigation}
                            updateValue={(propertyType) => this.setState({
                                propTypeArray: propertyType
                            })}
                        />
                        <BedAndBathFilterView ref='beds'
                            type={'Beds'}
                            dataItemsArray={JSON.parse(JSON.stringify(bedsData))}
                            exactDataItemsArray={JSON.parse(JSON.stringify(bedsExactData))}
                            width={(width) / 6}
                            preSelectedValue={this.state.beds}
                            itemClick={(value) => {
                                if (value == "") {
                                    this.setState({ beds: null })
                                }
                                else {
                                    this.setState({ beds: value })
                                }
                            }}
                        />
                        <BedAndBathFilterView ref='baths'
                            type={'Baths'}
                            dataItemsArray={JSON.parse(JSON.stringify(bathData))}
                            exactDataItemsArray={JSON.parse(JSON.stringify(bathExactData))}
                            width={(width) / 5}
                            preSelectedValue={this.state.baths}
                            itemClick={(value) => {
                                if (value == "") {
                                    this.setState({ baths: null })
                                }
                                else {
                                    this.setState({ baths: value })
                                }
                            }}
                        />
                        <PriceYearSqFliterView ref='priceRange'
                            type={'Price Range'}
                            minValueData={priceMinData}
                            maxValueData={priceMaxData}
                            defaultMinValue={'0'}
                            defaultMaxValue={'9000001'}
                            preSelectedMinValue={this.state.minPrice}
                            preSelectedMaxValue={this.state.maxPrice}
                            openPickerTap={(value) => this.openPickerTapped(value)}
                            dismissPickerTap={() => this.dismissPickerTapped()}
                            itemClick={(value, minPrice, maxPrice) => {
                                if (minPrice == "No Min" && maxPrice == "No Max") {
                                    this.setState({ minPrice: null, maxPrice: null })
                                }
                                else {
                                    this.setState({ minPrice: minPrice, maxPrice: maxPrice })
                                }
                            }}
                        />
                        <PriceYearSqFliterView ref='squareFeet'
                            type={'Square Feet'}
                            minValueData={squareFeetMinData}
                            maxValueData={squareFeetMaxData}
                            defaultMinValue={'0'}
                            defaultMaxValue={'10001'}
                            preSelectedMinValue={this.state.minSqFeet}
                            preSelectedMaxValue={this.state.maxSqFeet}
                            openPickerTap={(value) => this.openPickerTapped(value)}
                            dismissPickerTap={() => this.dismissPickerTapped()}
                            itemClick={(value, minSqFeet, maxSqFeet) => {
                                if (minSqFeet == "No Min" && minSqFeet == "No Max") {
                                    this.setState({ minSqFeet: null, maxSqFeet: null })
                                }
                                else {
                                    this.setState({ minSqFeet: minSqFeet, maxSqFeet: maxSqFeet })
                                }
                            }}
                        />
                        <PriceYearSqFliterView ref='yearBuilt'
                            type={'Year Built'}
                            minValueData={yearBuiltMinData}
                            maxValueData={yearBuiltMaxData}
                            defaultMinValue={'1899'}
                            defaultMaxValue={'2019'}
                            preSelectedMinValue={this.state.minYear}
                            preSelectedMaxValue={this.state.maxYear}
                            openPickerTap={(value) => this.openPickerTapped(value)}
                            dismissPickerTap={() => this.dismissPickerTapped()}
                            itemClick={(value, minYear, maxYear) => {
                                if (minYear == "No Min" && maxYear == "No Max") {
                                    this.setState({ minYear: null, maxYear: null })
                                }
                                else {
                                    this.setState({ minYear: minYear, maxYear: maxYear })
                                }
                            }}
                        />
                        <ListingTypeCell ref='listingType'
                            type={'Listing Types'}
                            value={'Listing Types'}
                            preSelectedValue={this.state.listingType}
                            itemClick={(value) => {
                                this.setState({ listingType: value })
                            }}
                        />
                        <ToggelBasedCell ref='openHouse'
                            type={'Open House'}
                            value={'Show Open Houses Only'}
                            height={0}
                            preSelectedValue={this.state.openHouse}
                            itemClick={(value) => this.setState({ openHouse: value })}
                        />
                        <ToggelBasedCell ref='priceReduced'
                            type={'Price Reduced'}
                            value={'Price Reduced'}
                            height={20}
                            preSelectedValue={this.state.priceReduced}
                            itemClick={(value) => this.setState({ priceReduced: value })}
                        />
                        <DaysOnOwnersCell ref='daysOnOwners'
                            type={'Days On Owners'}
                            value={'Days On Owners.com'}
                            dataItemsArray={daysOnOwnersData}
                            preSelectedValue={this.state.daysOnOwners}
                            openPickerTap={(value) => this.openPickerTapped(value)}
                            dismissPickerTap={() => this.dismissPickerTapped()}
                            itemClick={(value) => {
                                if (value == "Any") {
                                    this.setState({ daysOnOwners: null })
                                }
                                else {
                                    this.setState({ daysOnOwners: value })
                                }
                            }}
                        />

                        <HomePreference />

                    </ScrollView>
                    <View style={styles.BottomViewStyle}>
                        <TouchableOpacity onPress={() => this.applyFilter()}>
                            <View style={styles.buttonStyle}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Apply Filter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
export default inject("searchStore")(observer(Filter));


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tagContainer: {
        flexDirection: "row",
        padding: 10,
        alignSelf: "stretch",
        flexWrap: "wrap"
    },
    rightBarButton: {
        color: '#1F47AF',
        margin: 10,
        padding: 5,
        fontSize: 15,
        fontWeight: "bold"
    },
    clearAll: {
        width: 60,
        right: 10
    },
    scrollViewContainer: {
        flex: 1,
        marginBottom: 40
    },
    BottomViewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 40,
        borderRadius: 5,
        width: width,
        position: 'absolute',
        bottom: 0
    },
    buttonStyle: {
        width: width,
        height: 50,
        backgroundColor: '#0B2B80',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        borderRadius: 0
    }
});