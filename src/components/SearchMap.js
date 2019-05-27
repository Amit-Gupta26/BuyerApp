import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Platform,
  PanResponder,
  Image
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker, GeoFencing } from "react-native-maps";
import ClusteredMapView from "react-native-maps-super-cluster";
import { observer, inject } from "mobx-react";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 10.4922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class SearchMap extends PureComponent {
  _panResponder = {};
  _polygonsCoordinates = [];
  _propertyTempArray = [];
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      isMapDraggedManually: false
    };

    this._renderMarker = this._renderMarker.bind(this);
    this._renderCluster = this._renderCluster.bind(this);
    this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder
      // onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      // onPanResponderGrant: this._handlePanResponderGrant,
      // onPanResponderMove: this._handlePanResponderMove,
      // onPanResponderRelease: this._handlePanResponderEnd,
      // onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _handleStartShouldSetPanResponder = (e, gestureState) => {
    // Should we become active when the user presses down on the circle?
    this.setState({
      isMapDraggedManually: true
    });
    return false;
  };

  // _handleMoveShouldSetPanResponder = (e, gestureState) => {
  //   // Should we become active when the user moves a touch over the circle?
  //   console.log("Test");
  //   return false;
  // };

  // _handlePanResponderGrant = (e, gestureState) => {
  //   console.log("Test");
  // };

  // _handlePanResponderMove = (e, gestureState) => {
  //   console.log("Test");
  // };

  // _handlePanResponderEnd = (e, gestureState) => {
  //   console.log("Test");
  // };

  render() {
    let propertiesArr = this.props.properties;
    let polygonCoordinates = this.props.polygonCoordinates
      ? this.props.polygonCoordinates
      : [];
    let isPropertyDetails = this.props.isPropertyDetails;
    var clusterFormatedLocations = [];
    var seggregatedArr = [];
    if (isPropertyDetails == true) {
      clusterFormatedLocations = [];
      propertiesArr.forEach(eachProp => {
        var foundProperty = false;
        let currentPropLatitude = eachProp.latitude;
        initialLat = parseFloat(eachProp.latitude);
        initialLong = parseFloat(eachProp.longitude);
        for (let i = 0; i < seggregatedArr.length; i++) {
          let segPropArr = seggregatedArr[i];
          if (segPropArr instanceof Array) {
            var subArr = segPropArr;
            if (subArr.length > 0) {
              let segProp = subArr[0];
              if (segProp.latitude == currentPropLatitude) {
                foundProperty = true;
                subArr.push(eachProp);
                break;
              }
            }
          }
        }
        if (foundProperty == false) {
          let newProprtyArr = [];
          newProprtyArr.push(eachProp);
          seggregatedArr.push(newProprtyArr);
        }
      });
    } else if (propertiesArr.length > 0) {
      propertiesArr.forEach(eachProp => {
        clusterFormatedLocations.push({
          id: `pin${Math.random()}`,
          location: {
            latitude: parseFloat(eachProp.latitude),
            longitude: parseFloat(eachProp.longitude)
          }
        });
      });
    }
    var polygonCoordinatesArr = [];
    allPolygonsCoordinates = [];
    polygonCoordinates.forEach(eachElement => {
      var coordinatesArr = [];
      eachElement.forEach(innerElement => {
        let coords = {
          latitude: parseFloat(innerElement.latitude),
          longitude: parseFloat(innerElement.longitude),
          LATITUDE_DELTA,
          LONGITUDE_DELTA
        };
        coordinatesArr.push(coords);
        allPolygonsCoordinates.push(coords);
      });
      polygonCoordinatesArr.push(coordinatesArr);
    });
    if (allPolygonsCoordinates.length == 0) {
      allPolygonsCoordinates.push({
        latitude: 47.0142,
        longitude: -47.9821,
        LATITUDE_DELTA,
        LONGITUDE_DELTA
      });
    }
    this._polygonsCoordinates = allPolygonsCoordinates;
    console.log(
      "_polygonsCoordinates length:" + this._polygonsCoordinates.length
    );
    if (this.mapRef != null && this.props.searchStore.isBoundaryCall == false) {
      this.mapRef.mapview.fitToCoordinates(allPolygonsCoordinates, {
        edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
        animated: false
      });
    }
    return (
      <View style={styles.mapListContainer}>
        {this.renderintialMapView(clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr)}
      </View>
    );
  }

  renderintialMapView = (clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr) => {
    if (this.props.searchStore.isMlsSearch) {
      return (
        this.renderMlsMapView(clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr)
      );
    } else {
      return (
        this.renderMapView(clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr)
      );
    }
  }

  renderFavourite() {
    return (
      <Image style={styles.favouriteTagContainer} source={require('../assets/image/fav.png')} >
      </Image>
    );
  }

  renderNewOpen(eachPropArr) {

    if (eachPropArr.openHouse != undefined && eachPropArr.openHouse.date != "") {
      return (
        <View style={[styles.newOpenContainer, { backgroundColor: "#BE70B2" }]}>
          <Text style={[styles.newOpenTextContainer, { backgroundColor: "transparent", bottom: Platform.OS == 'ios' ? -1.5 : 1 }]}>OPEN</Text>
        </View>

      );
    }
    else {
      if (eachPropArr.daysInMarket <= 7 && eachPropArr.daysInMarket != undefined) {
        return (
          <View style={[styles.newOpenContainer, { backgroundColor: "#52D288" }]}>
            <Text style={[styles.newOpenTextContainer, { backgroundColor: "transparent", bottom: Platform.OS == 'ios' ? -1.5 : 1 }]}> NEW</Text>
          </View>

        );
      }
    }
  }

  renderPriceReduced(eachPropArr) {
    if (eachPropArr.length > 0) {

      if (eachPropArr[0].priceChangeDetails != undefined) {
        let priceChangeDetails = eachPropArr[0].priceChangeDetails;
        let deltaValue = priceChangeDetails.deltaType;
        let isPriceIncresed = deltaValue == "Price Increase" ? true : false;

        return (
          <View style={{ width: 78.0, height: 45.0, backgroundColor: "transparent" }} >
            <ImageBackground source={require('../assets/image/pricepin.png')} style={{ width: 57.0, height: 28.0, top: 10, flexDirection: "row", alignSelf: "center" }}>
              <Text style={[Platform.OS == 'ios' ? styles.markerTextiOS : styles.markerTextAndroid, { fontSize: 11, left: Platform.OS == 'ios' ? 5 : 7 }]}>
                {this._calculatedPriceString(eachPropArr)}
              </Text>
              <Image style={{
                width: 10, height: 10, left: Platform.OS == 'ios' ? 6 : 8, backgroundColor: "transparent", top: 5.5, resizeMode: "contain"
              }} source={isPriceIncresed ? require('../assets/image/Increase-Big.png') : require('../assets/image/Decrease-Big.png')} >
              </Image>

              {this.renderFavourite(eachPropArr[0])}
              {this.renderNewOpen(eachPropArr[0])}
            </ImageBackground>
          </View>
        );
      } else {
        return (
          <View style={{ width: 78.0, height: 55.0, backgroundColor: "transparent" }} >
            <ImageBackground source={require('../assets/image/pricepin.png')} style={{ width: 57.0, height: 28.0, top: 10, alignSelf: "center" }}>
              <Text style={[Platform.OS == 'ios' ? styles.markerTextiOS : styles.markerTextAndroid, { textAlign: "center", fontSize: 11 }]}>
                {this._calculatedPriceString(eachPropArr)}
              </Text>
              {this.renderFavourite(eachPropArr[0])}
              {this.renderNewOpen(eachPropArr[0])}
            </ImageBackground>
          </View>

        );
      }
    }
  }

  renderMapView = (clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr) => {
    if (isPropertyDetails == true) {
      this._propertyTempArray = seggregatedArr;
    }

    return (
      <ClusteredMapView
        {...this._panResponder.panHandlers}
        ref={(ref) => { this.mapRef = ref }}
        style={styles.container}
        data={clusterFormatedLocations}
        clusteringEnabled={true}
        initialRegion={{ latitude: 47.0142, longitude: -47.9821, latitudeDelta: 0.0, longitudeDelta: 0.0 }}
        opacity={this.props.opacityVal == true ? 1.0 : 0.0}
        renderMarker={this._renderMarker}
        renderCluster={this._renderCluster}
        regionChanged={this._onRegionChangeComplete}
        showsUserLocation={true}
        onClusterPressed={this._onClusterClick}
        onPress={(e) => { e.stopPropagation(); this.props.quickViewDismiss() }}
        onLayout={() => this.mapRef.mapview.fitToCoordinates(allPolygonsCoordinates, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
      >
        {
          isPropertyDetails == true ?
            seggregatedArr.map((eachPropArr, index) => (
              <MapView.Marker
                key={index} coordinate={{ latitude: parseFloat(eachPropArr[0].latitude), longitude: parseFloat(eachPropArr[0].longitude) }}
                // onPress={this.onPressMarker}
                // onPress={this._onPressMarker(eachPropArr)}
                key={index}
                onPress={(e) => { e.stopPropagation(); this._onPressMarker(index) }
                }>

                {this.renderPriceReduced(eachPropArr)}

              </MapView.Marker>
            ))
            :
            <View></View>
        }
        {
          polygonCoordinatesArr.map(polygon =>
            (<MapView.Polygon
              coordinates={polygon}
              fillColor='rgba(0,0,0,0)'
              strokeColor='#8B8D99'
              strokeWidth={2.5}
            />),
          )
        }
      </ClusteredMapView>
    );
  }


  renderMlsMapView = (clusterFormatedLocations, isPropertyDetails, polygonCoordinatesArr, seggregatedArr) => {
    this._propertyTempArray = seggregatedArr;

    return (
      <MapView
        ref={map => this.map = map}
        style={styles.container}
        initialRegion={{
          latitude: 39.8333333,
          longitude: -98.585522,
          latitudeDelta: 50,
          longitudeDelta: 20,
        }}
        opacity={this.props.opacityVal == true ? 1.0 : 0.0}
        onPress={(e) => { e.stopPropagation(); this.props.quickViewDismiss() }}
      >
        {isPropertyDetails == true ? (
          seggregatedArr.map((eachPropArr, index, marker) => (
            <MapView.Marker
              coordinate={{ latitude: parseFloat(eachPropArr[0].latitude), longitude: parseFloat(eachPropArr[0].longitude) }}
              key={index}
              onPress={(e) => { e.stopPropagation(); this._onPressMarker(index) }}

            >
              {this.renderPriceReduced(eachPropArr)}

            </MapView.Marker>))) : (
            <View />
          )
        }
      </MapView>
    );
  }

  _renderCluster = (cluster, onPress) => {
    var pointCount = cluster.pointCount;
    const coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;
    if (cluster.pointCount <= 0) {
      pointCount = 1;
    }
    return (
      <Marker
        identifier={`cluster-${clusterId}`}
        coordinate={coordinate}
        onPress={onPress}
      >
        <View style={styles.clusterContainer}>
          <Text
            style={
              Platform.OS == "ios"
                ? styles.clusterTextiOS
                : styles.clusterTextAndroid
            }
          >
            {pointCount}
          </Text>
        </View>
      </Marker>
    );
  };

  _onClusterClick = () => {
    this.props.quickViewDismiss();
    this.setState({
      isMapDraggedManually: true
    });
  };

  _renderMarker = data => (
    <Marker identifier={`cluster-${data.id}`} coordinate={data.location}>
      {/* <View style={styles.clusterContainer}>
      <Text style={Platform.OS == 'ios' ? styles.clusterTextiOS : styles.clusterTextAndroid}>
        {1}
      </Text>
    </View> */}
    </Marker>
  );

  _onPressMarker = index => {
    this.props.markerClicked(this._propertyTempArray[index])
    this.setState({
      isMapDraggedManually: false
    });

  };

  _onMlsRegionChangeComplete = region => {
  }

  _onRegionChangeComplete = region => {
    if (this.state.isMapDraggedManually == true) {
      this.props.quickViewDismiss();
      if (this.props.searchURL != null && this.props.searchURL.length > 0) {
        let topLeftY = region.longitude - region.longitudeDelta / 2; // westLng - min lng
        let bottomRightX = region.latitude - region.latitudeDelta / 2; // southLat - min lat
        let bottomRightY = region.longitude + region.longitudeDelta / 2; // eastLng - max lng
        let topLeftX = region.latitude + region.latitudeDelta / 2; // northLat - max lat

        let centerPointLat = region.latitude;
        let centerPointLong = region.longitude;
        let boundarUrlStr =
          "?topLeftX=" +
          topLeftX +
          "&topLeftY=" +
          topLeftY +
          "&bottomRightX=" +
          bottomRightX +
          "&bottomRightY=" +
          bottomRightY +
          "&rect=true" +
          "&centerPoint=" +
          centerPointLat +
          "," +
          centerPointLong;
        this.props.searchStore.boundaryURL = boundarUrlStr;
        let mapSearchURLStr =
          this.props.searchURL + boundarUrlStr + "&ajaxsearch=true&view=map";
        let listSearchURLStr =
          this.props.searchURL + boundarUrlStr + "&ajaxsearch=true";

        var isPolygonSearch = false;
        for (let i = 0; i < this._polygonsCoordinates.length; i++) {
          let eachElement = this._polygonsCoordinates[i];
          if (
            topLeftX >= eachElement.latitude &&
            bottomRightX <= eachElement.latitude &&
            (topLeftY <= eachElement.longitude &&
              bottomRightY >= eachElement.longitude)
          ) {
            isPolygonSearch = true;
            break;
          }
        }
        this.setState({
          isMapDraggedManually: false
        });
        this.props.searchStore.fetchMapProperties(
          mapSearchURLStr,
          true,
          isPolygonSearch,
          false
        );
        this.props.searchStore.fetchListProperties(
          listSearchURLStr,
          true,
          isPolygonSearch
        );

        // this.fetchBoundaryMapCall(this.state.currentSearchURL, topleftX, topleftY, bottomRightX, bottomRightY, centreLat, centreLong);
        // this.fetchBoundaryListCall(this.state.currentSearchURL, topleftX, topleftY, bottomRightX, bottomRightY, centreLat, centreLong);
      }
    }
  };

  _calculatedPriceString = propsArr => {
    if (propsArr.length > 1) {
      return propsArr.length + " Units";
    }
    let priceStr = propsArr[0].listPrice;
    var format = 0;
    var suffix = "";
    var transformedValue = 0.0;
    let priceIntVal = parseInt(priceStr, 10);
    if (priceIntVal >= 1000000000) {
      format = priceIntVal % 1000000000 == 0 ? 0 : 1;
      suffix = "b";
      transformedValue = parseFloat(priceIntVal) / 1000000000.0;
    } else if (priceIntVal >= 1000000) {
      format = priceIntVal % 1000000 == 0 ? 0 : 1;
      suffix = "m";
      transformedValue = parseFloat(priceIntVal) / 1000000.0;
    } else if (priceIntVal >= 1000) {
      format = 0;
      suffix = "k";
      transformedValue = parseFloat(priceIntVal) / 1000.0;
    } else {
      format = 0;
      suffix = "";
      transformedValue = parseFloat(priceIntVal);
    }
    return "$" + transformedValue.toFixed(format) + suffix;
  };
}

SearchMap.propTypes = {
  properties: PropTypes.array.isRequired,
  polygonCoordinates: PropTypes.array.isRequired
};
export default inject("searchStore")(observer(SearchMap));

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  mapListContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  clusterContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C2D7F"
  },
  clusterTextiOS: {
    fontSize: 10,
    marginTop: 3,
    color: "#FFFFFF",
    fontFamily: "Graphik-Medium",
    textAlignVertical: "center",
    textAlign: "center"
  },
  clusterTextAndroid: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Graphik-Medium",
    textAlignVertical: "center",
    textAlign: "center"
  },
  markerTextiOS: {
    color: "white",
    fontWeight: "bold",
    marginTop: 4
  },
  markerTextAndroid: {
    color: "white",
    fontWeight: "bold",
    marginTop: 2.5,
    textAlign: "center"
  },
  mapListContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  newOpenTextContainer: {
    color: "white",
    fontSize: 7,
    fontFamily: "Graphik-Medium",
    textAlign: "center",
    backgroundColor: "red"
  },
  newOpenContainer: {
    borderRadius: 2,
    alignItems: "center",
    backgroundColor: "#52D288",
    width: 30,
    height: 10,
    left: -10,
    position: "absolute",
    top: -6
  },
  favouriteTagContainer: {
    width: 22,
    height: 22,
    right: -10,
    position: "absolute",
    top: -10
  }
});


