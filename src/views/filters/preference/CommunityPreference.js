import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView
} from "react-native";
import FilterPreferenceTagView from '../../filters/preference/FilterPreferenceTagView';

const { width } = Dimensions.get("window");

class CommunityPreference extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const rootContainerStyle = this.props.isCommunityExpand ? styles.selectedView : styles.unSelectedView;
        return (
            <View style={rootContainerStyle}>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Recreation</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FilterPreferenceTagView
                            title={"Community Pool"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Gym"} 
                            onTagPress={this.props.onTagPress}/>
                    </View>
                    <View>
                        <FilterPreferenceTagView
                            title={"Golf"}
                            onTagPress={this.props.onTagPress} />
                        <FilterPreferenceTagView
                            title={"Marina/Dock"}
                            onTagPress={this.props.onTagPress} />
                    </View>

                    <View>
                        <FilterPreferenceTagView
                            title={"Tennis Courts"}
                            onTagPress={this.props.onTagPress} />
                    </View>
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Community Features</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FilterPreferenceTagView
                        title={"Gated"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"Retirement/55+"}
                        onTagPress={this.props.onTagPress} />
                    <FilterPreferenceTagView
                        title={"No HOA"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Condo Features</Text>
                    <View style={styles.dividerLine} />
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.communityScrollView}
                >
                    <FilterPreferenceTagView
                        title={"Per Friendly"}
                        onTagPress={this.props.onTagPress} />
                </ScrollView>
            </View>
        );
    }
}

export default CommunityPreference;

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
    },
    communityScrollView: {
        marginBottom: 10
    }
});

