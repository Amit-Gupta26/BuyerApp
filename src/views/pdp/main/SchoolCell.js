import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { SchoolDescription, SchoolRatingColor } from "../../../utils/Helper";

class SchoolCell extends Component {
  _renderSchoolCell(item) {
    return (
      <View style={styles.flatListCellContentView}>
        <View style={styles.flatListCellContentViewFirstContainer}>
          <View
            style={[
              styles.circularView,
              { backgroundColor: SchoolRatingColor(item) }
            ]}
          >
            <Text style={styles.circularViewText}>
              {item.rating ? item.rating : "NR"}
            </Text>
          </View>
        </View>

        <View style={styles.flatListCellContentViewSecondContainer}>
          <Text style={styles.titleText} numberOfLines={0}>
            {item.name}
          </Text>
          <Text style={styles.descriptionText} numberOfLines={0}>
            {SchoolDescription(item)}
          </Text>
        </View>

        <View style={styles.flatListCellContentViewThirdContainer}>
          <View style={styles.classView}>
            <Text style={styles.classText} numberOfLines={0}>
              {`${item.lowGrade} - ${item.highGrade}`}
            </Text>
          </View>

          <View style={styles.distanceView}>
            <Text style={styles.distanceText} numberOfLines={0}>
              {`${item.distance} mi`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderSeparatorLine() {
    return <View style={styles.separatorLine} />;
  }
  render() {
    const { dataSource } = this.props;
    return (
      <FlatList
        style={styles.flatList}
        data={dataSource}
        ItemSeparatorComponent={this._renderSeparatorLine}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.flatListCell} onPress={() => {}}>
            {this._renderSchoolCell(item)}
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "white",
    flex: 1
  },
  flatListCell: {
    height: 80,
    justifyContent: "center",
    alignItems: "stretch"
  },
  flatListCellContentView: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row"
  },
  flatListCellContentViewFirstContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  circularView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#52BD81",
    justifyContent: "center",
    alignItems: "center"
  },
  circularViewText: {
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 18
  },
  flatListCellContentViewSecondContainer: {
    width: "55%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  titleText: {
    color: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: "bold",
    fontSize: 13
  },
  descriptionText: {
    color: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontWeight: "normal",
    fontSize: 12
  },

  flatListCellContentViewThirdContainer: {
    width: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  classView: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: "65%"
  },
  classText: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },
  distanceView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: "65%"
  },
  distanceText: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: "black",
    fontWeight: "bold",
    fontSize: 12
  },
  separatorLine: {
    height: 1,
    width: "95%",
    backgroundColor: "#CED0CE",
    marginLeft: "5%"
  }
});

export default SchoolCell;
