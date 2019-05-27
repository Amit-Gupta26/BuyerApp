import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  Text,
  ScrollView,
  Animated,
  Image
} from "react-native";
import StringUtil from "../../../utils/StringUtil";


const { width, height } = Dimensions.get("window");

class PDPImagePreview extends Component {
  scrollX = new Animated.Value(0)

  constructor(props) {
    super(props);
    this.state = {
      yPos: 0,
      pageNumber: 1
    };
  }

  handleScroll(event) {
    // console.log(event.nativeEvent.contentOffset.x)
    // this.setState({
    //   yPos : event.nativeEvent.contentOffset.y,
    // });
  }

  handlePageChange(e) {
    var offset = e.nativeEvent.contentOffset;
    if (offset) {
      var page = Math.round(offset.x / width) + 1;
      console.log(page)
      if (this.state.page != page) {
        this.setState({ pageNumber: page });
      }
    }
  }

  render() {
    let position = Animated.divide(this.scrollX, width);
    let strUtilObj = new StringUtil();
    const { images } = this.props;
    var imageArray = strUtilObj.imageArray(images);

    return (
      <View style={styles.mainViewStyle}>
        <View style={styles.mainViewStyle}>
          <ScrollView style={styles.scrollView}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.handleScroll.bind(this)}
            scrollEventThrottle={1000}
            onScrollEndDrag={event => {
              this.handlePageChange(event);
            }}
          >
            {imageArray.map((source, i) => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    this.props.onPressAction();
                  }}
                  underlayColor="white"
                  style={styles.imageContainer}
                >

                  <ImageBackground
                    backgroundColor={"grey"}
                    source={{ uri: source }}
                    style={styles.previewImage}
                  >
                  </ImageBackground>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
          <View style={[styles.textContainerView, {}]}>
            {/* <View style={styles.textViewForInfoAndImageCount}>
                <Text style={styles.text}>
                  {" "}
                  {"Bay Area Real Estate Information Srevices, Inc."}{" "}
                </Text>
              </View> */}
            <View style={styles.textViewForInfoAndImageCount}>
              <Text style={styles.text}> {`1 of ${images.length}`} </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: width,
    height: height / 3.5
  },
  imageContainer: {
    backgroundColor: "white",
    alignSelf: "stretch",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1.0
  },
  containerView: {
    backgroundColor: "red",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: height / 3.5
  },
  previewImage: {
    width: width,
    height: height / 3.5,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  scrollView: {
    width: "100%",
    height: height / 3.5,
    position: 'absolute'
  },
  textContainerView: {
    backgroundColor: "transparent",
    width: null,
    top: (height / 3.5) - 40,
    marginLeft: 20,
    alignItems: "flex-start",
  },
  textViewForInfoAndImageCount: {
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: 4,
    width: null,
  },
  text: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 3
  }
});

export default PDPImagePreview;
