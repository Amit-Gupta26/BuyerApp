import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import FilterPreferenceTagView from '../../filters/preference/FilterPreferenceTagView';

const { width } = Dimensions.get("window");

class ExteriorPreference extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const rootContainerStyle = this.props.isExteriorExpand ? styles.selectedView : styles.unSelectedView;
        return (
            <View style={rootContainerStyle}>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Pool</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Pool (Any)"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"In Ground Pool"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Waterfront</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Waterfront (Any)"} 
                            onTagPress={this.props.onTagPress}/>
                        <FilterPreferenceTagView
                            title={"Beach Or Ocean Front"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Lake Front"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Gulf Access"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"River Front"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Garage {'&'} Parking</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Garage (Any)"} 
                            onTagPress={this.props.onTagPress}/>
                        <FilterPreferenceTagView
                            title={"3+ Car Garage"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Attached Garage"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"RV/Boat Parking"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"2 Car Garage"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Lot {'&'} Yard</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Fenced Yard"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Corner Lot"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Deck {'&'} Porch</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Deck (Any)"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Porch (Any)"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Style</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Ranch"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Bungalow"} 
                            onTagPress={this.props.onTagPress}/>
                        <FilterPreferenceTagView
                            title={"A-Frame"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Modern"} 
                            onTagPress={this.props.onTagPress}/>
                        <FilterPreferenceTagView
                            title={"Cabin"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Spanish"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"Victorian"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Split Level"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Craftsman"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Views</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Views (Any)"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Mountain View"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Lake View"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"Ocean View"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Boat Facility</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Boathouse (Any)"} 
                        onTagPress={this.props.onTagPress}/>
                    <FilterPreferenceTagView
                        title={"Boat Dock"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Condition</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Fixer Upper"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
            </View>
        );
    }
}

export default ExteriorPreference;

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    dividerLine: {
        width: width,
        backgroundColor: "#E2E2E2",
        marginLeft: 5,
        height: 1,
    },
    dividerText: {
        fontWeight: "bold",
        fontSize: 13,
        fontFamily: "Graphik-Medium",
        color: "#9798A4"
    },
    selectedView: { 
        height: null, 
        overflow: 'hidden', 
        flex: 1, 
        justifyContent: 'center', 
        marginLeft: 32, 
        marginRight: 22 
    },
    unSelectedView: {
        height: 0, 
        overflow: 'hidden', 
        flex: 1, 
        justifyContent: 'center', 
        marginLeft: 32, 
        marginRight: 22 
    }
});

