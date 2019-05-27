import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import SchoolCell from "../../views/pdp/main/SchoolCell";
class ViewAllSchoolScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "School Information",
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: { backgroundColor: "white" },
    headerTintColor: "#1F47AF",
    headerLeft: (
      <TouchableOpacity
        style={[
          styles.headerButton,
          {
            marginLeft: 8
          }
        ]}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../assets/image/clear.png")}
          style={styles.headerButtonImage}
        />
      </TouchableOpacity>
    )
  });
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <SchoolCell
          dataSource={this.props.navigation.getParam("schools", [])}
        />
      </SafeAreaView>
    );
  }
}

export default ViewAllSchoolScreen;

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40
  },
  headerButtonImage: {
    width: 18,
    height: 18,
    resizeMode: "cover"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  }
});
