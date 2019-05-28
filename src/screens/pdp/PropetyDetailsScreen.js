import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform
} from "react-native";
import ActivityIndicator from "../../components/ActivityLoader";
import PDPImagePreview from "../../views/pdp/main/PDPImagePreview";
import AddressView from "../../views/pdp/main/AddressView";
import PropertyDescription from "../../views/pdp/main/PropertyDescriptionView";
import ErrorView from "../../components/ErrorView";
import ScheduleATourView from "../../views/pdp/tour/ScheduleATourView";
import SchoolView from "../../views/pdp/main/SchoolView";
import MonthlyPaymentView from '../../views/pdp/main/MonthlyPaymentView';
import CommuteCell from '../../views/pdp/main/CommuteCell';
import MakeAnOfferCell from '../../views/pdp/main/MakeAnOfferCell';
import AskAQuestionCell from '../../views/pdp/main/AskAQuestionCell';
import KeyDetailsView from '../../views/pdp/main/KeyDetailsView';
import PDPPriceHistoryCell from '../../views/pdp/main/PDPPriceHistoryCell';
import PriceChangeNotificationView from '../../views/pdp/main/PriceChangeNotificationView';
import PDPTaxDetailsCell from '../../views/pdp/main/PDPTaxDetailsCell';
import CallOwnersDotCom from '../../views/pdp/main/CallOwnersDotCom';
import GetDirectionDescriptionCell from '../../views/pdp/main/GetDirectionDescriptionCell';


import { observer, inject } from "mobx-react";
const barStyle = Platform.OS === 'ios' ? "dark-content" : "light-content" 
class PropertyDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("address", "Property Details"),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: { backgroundColor: "white" },
    headerTintColor: "#1F47AF",
    headerRight: (
      <Image
        source={require("../../assets/image/share.png")}
        style={{ marginHorizontal: 12 }}
      />
    )
  });

  componentDidMount() {
    let pdpUrl = `${this.props.navigation.getParam("pdpUrl")}?ajax=true`;
    this.props.propertyDetailsStore.fetchPropertyDetails(pdpUrl);
  }

  render() {
    const { propertyDetailsStore } = this.props;
    let content = this._renderPropertyDetails();
    if (propertyDetailsStore.isLoading) {
      content = <ActivityIndicator />;
    } else if (propertyDetailsStore.error !== undefined) {
      content = <ErrorView />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#0B2B80" barStyle={barStyle} />
        <View style={styles.container}>{content}</View>
      </SafeAreaView>
    );
  }

  _renderPropertyDetails() {
    const { propertyDetailsStore } = this.props;
    const { navigate, goBack } = this.props.navigation;
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <PDPImagePreview
          images={propertyDetailsStore.pdpImages}
          onPressAction={() => navigate("ImagePreview")}
        />
        <AddressView
          globalPropertyId = {propertyDetailsStore.data.globalPropertyId}
          price={propertyDetailsStore.data.price}
          ownerEstimatePrice={propertyDetailsStore.ownersEstimate}
          propertyDetails={propertyDetailsStore.propertyOverview}
          propertyAddressText={propertyDetailsStore.proppertyAddress}
          mortgageCalculatorText={"$56,460/mo"}
          mortgageCalculatorPressAction={() =>
            navigate("MortgageCalculator", {
              mortgageRate: "$56,460",
              dataSource: [
                { key: "Property Price", value: "1725000" },
                { key: "Down Payment", value: "20" },
                { key: "Loan Type", value: "30yr Fixed" },
                { key: "Interest Rate", value: "3.36" },
                { key: "Property Taxes", value: "1466" },
                { key: "HOA Dues", value: "1004" }
              ]
            })
          }
        />
        <PropertyDescription
          description={propertyDetailsStore.data.description}
        />
        <ScheduleATourView
          addressLine1={propertyDetailsStore.propertyAddressLine1}
          addressLine2={propertyDetailsStore.propertyAddressLine2}
          imageUrl={propertyDetailsStore.pdpImages[0]}
          isFromPdp={true}
        />
        <SchoolView
          publicSchools={
            propertyDetailsStore.schools === undefined
              ? []
              : propertyDetailsStore.schools
          }
          viewAllSchoolPressAction={() =>
            this.props.navigation.navigate("AllSchool", {
              schools: propertyDetailsStore.schools
            })
          }
        />
        <MonthlyPaymentView
          calculatorPressAction={() =>
            this.props.navigation.navigate("MortgageCalculator", {
              mortgageRate: "$56,460",
              dataSource: [
                { key: "Property Price", value: "1725000" },
                { key: "Down Payment", value: "20" },
                { key: "Loan Type", value: "30yr Fixed" },
                { key: "Interest Rate", value: "3.36" },
                { key: "Property Taxes", value: "1466" },
                { key: "HOA Dues", value: "1004" }
              ]
            })
          }
        />
        <CommuteCell
          onPressAction={() => {
            alert("open my commute");
          }}
          imagePath={require("../../assets/image/Icon-Commute.png")}
          title={"Estimate my Commute"}
          description={""}
        />
        <MakeAnOfferCell
          onPressAction={() => {
            alert("open make an offer");
          }}
          imagePath={require("../../assets/image/Icon-Make-an-Offer.png")}
          title={"Make an Offer"}
          description={"Start the process"}
        />
        <AskAQuestionCell
          onPressAction={() => {
            alert("open Ask a Question");
          }}
          imagePath={require("../../assets/image/Icon-Ask-Question.png")}
          title={"Ask a Question"}
          description={"via the Agent"}
        />
        <KeyDetailsView
          viewAllFeaturePressAction={() =>
            this.props.navigation.navigate("KeyFeatureAndDetails", {
              address: this.props.navigation.getParam("address", "")
            })
          }
        />
        <PDPPriceHistoryCell />
        <PriceChangeNotificationView />
        <PDPTaxDetailsCell />
        <CallOwnersDotCom
          onPressAction={() => {
            alert("Call OwnersDot Com");
          }}
          imagePath={require("../../assets/image/Icon-Call-Owners.png")}
          title={"Call Owners.com"}
          description={"(866) 874-8374"}
        />
        <GetDirectionDescriptionCell
          onPressAction={() => {
            alert("You'll see Get Direction Page later, till then enjoy with");
          }}
          imagePath={require("../../assets/image/location.png")}
          title={"Get Directions"}
          description={"1919 McGraw Ave Apt 11C"}
        />

        <View style={{ height: 50, width: "100%" }} />
      </ScrollView>
    );
  }

  componentWillUnmount() {
    this.props.propertyDetailsStore.clear();
  }
}
export default inject("propertyDetailsStore")(observer(PropertyDetailsScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F9"
  }
});
