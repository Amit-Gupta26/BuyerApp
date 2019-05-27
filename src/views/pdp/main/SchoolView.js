import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking
} from "react-native";

import SchoolCell from "./SchoolCell";
import { SchoolRatingColor } from "../../../utils/Helper";
import TextAndArrowImageCell from "./TextAndArrowImageCell";

class SchoolView extends Component {
  state = {
    isCellExpand: false
  };

  _renderCellView() {
    return (
      <View style={styles.cellView}>
        {this.state.isCellExpand
          ? this._renderSchoolCellExpandMode()
          : this._renderSchoolCellCollapseMode()}
      </View>
    );
  }

  _renderSchoolInformation() {
    return (
      <View style={styles.schoolInfoView}>
        <Text style={styles.schoolInfoText}>{"School Information"}</Text>
        <TouchableOpacity
          style={styles.schoolInfoBtn}
          onPress={() => {
            Alert.alert(
              "School Rating\n\n",
              "The GreatSchools rating is a simple tool for parents to compare schools based on test scores. It compares schools across the state.\n\n Above Average (8-10)\n\n Average(4-7)\n\n Below Average (1-3)\n",
              "OK"
            );
          }}
        >
          <Image
            style={styles.schoolInfoBtnImg}
            source={require("../../../assets/image/Info.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderSchoolCellExpandMode() {
    return (
      <View style={styles.expandView}>{this._renderSchoolInformation()}</View>
    );
  }

  _renderSchoolRatingInfo(school, index) {
    return (
      <View style={styles.schoolRatingView} key={index}>
        <Text style={styles.schoolRatingName}>{`${school.lowGrade} - ${
          school.highGrade
        }`}</Text>
        <View
          style={[
            styles.schoolRatingCircularView,
            { backgroundColor: SchoolRatingColor(school) }
          ]}
        >
          <Text style={styles.schoolRatingValue}>
            {school.rating ? school.rating : "NR"}
          </Text>
        </View>
      </View>
    );
  }

  _renderSchoolList() {
    return (
      <View style={styles.schoolTextView}>
        <Text style={styles.schoolText}>{"Schools"}</Text>
        {this._renderSchoolComponent()}
      </View>
    );
  }

  _renderSchoolComponent() {
    return this.props.publicSchools.slice(0, 3).map((school, index) => {
      return this._renderSchoolRatingInfo(school, index);
    });
  }

  _renderSchoolCellCollapseMode() {
    return <View style={styles.collapseView}>{this._renderSchoolList()}</View>;
  }

  _renderViewDataProvider() {
    return (
      <View style={styles.dataProviderView}>
        <Text style={styles.dataProviderText}>{"Data Provided by "}</Text>
        <TouchableOpacity
          style={styles.greatSchoolView}
          onPress={() => {
            Linking.openURL("https://www.greatschools.org/");
          }}
        >
          <Text style={styles.greatSchoolText}>{"GreatSchools.org"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _renderViewAllSchools() {
    return (
      <TextAndArrowImageCell
        text={"View All Schools"}
        onPressAction={this.props.viewAllSchoolPressAction}
      />
    );
  }

  render() {
    const { publicSchools } = this.props;
    if (publicSchools && publicSchools.length === 0) {
      return null;
    }
    return (
      <View style={styles.containerView}>
        <TouchableOpacity
          style={styles.touchView}
          onPress={() => {
            this.setState(previousValue => ({
              isCellExpand: !previousValue.isCellExpand
            }));
          }}
        >
          {this._renderCellView()}
          <Image
            style={styles.upAndDownArrowImage}
            source={
              this.state.isCellExpand
                ? require("../../../assets/image/upArrow.png")
                : require("../../../assets/image/downArrow.png")
            }
          />
        </TouchableOpacity>
        {this.state.isCellExpand && publicSchools.length > 0 ? (
          <SchoolCell dataSource={publicSchools.slice(0, 3)} />
        ) : null}
        {this.state.isCellExpand && publicSchools.length > 3
          ? this._renderViewAllSchools()
          : null}
        {this.state.isCellExpand ? this._renderViewDataProvider() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1
  },
  touchView: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20
  },

  upAndDownArrowImage: {
    width: 15,
    height: 10
  },

  cellView: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "stretch",
    justifyContent: "center",
    marginHorizontal: 12,
    marginVertical: 10,
    padding: 8
  },
  expandView: {
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  collapseView: {
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  schoolInfoView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  schoolInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },
  schoolInfoBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  schoolInfoBtnImg: {
    width: 25,
    height: 25
  },
  schoolTextView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  schoolText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "gray"
  },
  schoolRatingView: {
    marginLeft: 3,
    marginRight: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5
  },
  schoolRatingCircularView: {
    marginLeft: 3,
    backgroundColor: "#52BD81",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center"
  },
  schoolRatingName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black"
  },
  schoolRatingValue: {
    color: "white",
    fontSize: 12,
    fontWeight: "normal"
  },
  dataProviderView: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  dataProviderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black"
  },
  greatSchoolView: {
    alignItems: "stretch",
    justifyContent: "center"
  },
  greatSchoolText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#A8C7CB"
  }
});

export default SchoolView;
