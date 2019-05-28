import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView} from "react-native";
import FilterPreferenceTagView from '../../filters/preference/FilterPreferenceTagView';

const { width } = Dimensions.get("window");

class InteriorPreference extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const rootContainerStyle = this.props.isInteriorExpand ? styles.selectedView : styles.unSelectedView;
        return (
            <View style={rootContainerStyle}>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Basement</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Basement (Any)"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Finished Basement"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Basement Full"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Fireplace</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Fireplace (Any)"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Rooms</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Main Floor Master BR"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Open Floor Plan"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Guest Quaters"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Home Theater"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Walk In Closets"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"In Law Suite"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Bonus Room"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Heat {'&'} Cooling</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Air Conditioning (Any)"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Energy Efficient"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Central Air"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Gas Heating"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Additional Interior Features</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Hardwood Floors"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Kitchen</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Updated Kitchen"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Kitchen Island"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Accessibility</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Accessible"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
            </View>
        );
    }
}

export default InteriorPreference;

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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

