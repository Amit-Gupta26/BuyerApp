import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import SplashScreeen from "../screens/SplashScreen";
import OnBoardingSearchScreen from "../screens/onboarding/OnBoardingSearchScreen";
import OnBoardingPriceScreen from "../screens/onboarding/OnBoardingPriceScreen";
import OnBoardingOtherFiltersScreen from "../screens/onboarding/OnBoardingOtherFiltersScreen";
import HomeNavigator from "./homeNavigator";
import PropertyDetailsScreen from "../screens/pdp/PropetyDetailsScreen";
import KeyDetailsScreen from "../screens/pdp/KeyDetailsScreen";
import EstimateCalculatorScreen from "../screens/pdp/EstimateCalculatorScreen";
import OnBoardingPreferenceScreen from "../screens/onboarding/OnBoardingPreferenceScreen";
import OnBoardingSurveyScreen from "../screens/onboarding/OnBoardingSurveyScreen";
import OnBoardingSignInScreen from "../screens/onboarding/OnBoardingSignInScreen";
import AuthStack from "./authStack";
import MortgageCalculatorScreen from "../screens/pdp/MortgageCalculatorScreen";
import SearchAutoSuggest from "../components/SearchAutoSuggest";
import AdviceScreen from "../screens/discover/AdviceScreen";
import ViewAllSchoolScreen from "../screens/pdp/ViewAllSchoolScreen";
import PropertyTypeSelViewScreen from "../screens/onboarding/PropertyTypeSelView";
import ScheduleTourScreen from "../screens/tour/ScheduleTourScreen";
import FilterScreen from "../screens/filter/Filter";
import KeyFeatureAndDetails from "../screens/pdp/KeyFeatureAndDetails";

// console.disableYellowBox = true;
const Onboarding = createStackNavigator(
  {
    OnboardingSearch: OnBoardingSearchScreen,
    OnboardingPrice: OnBoardingPriceScreen,
    OnboardingOtherFilter: OnBoardingOtherFiltersScreen,
    OnboardingPreference : OnBoardingPreferenceScreen,
    OnboardingSignin : OnBoardingSignInScreen,
    SearchAutoSuggest: SearchAutoSuggest,
    Auth : AuthStack,
    PropertyTypeSelView: PropertyTypeSelViewScreen
  },
  {
    mode: "card",
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: HomeNavigator,
      navigationOptions: () => ({
        title: null,
        header: null,
        headerBackTitleVisible: false,
        headerBackTitle: null,
        headerBackImage: null
      })
    },
    Auth: AuthStack,
    PropertyDetails: PropertyDetailsScreen,
    MortgageCalculator: MortgageCalculatorScreen,
    KeyDetails: KeyDetailsScreen,
    AllSchool: ViewAllSchoolScreen,
    KeyFeatureAndDetails: KeyFeatureAndDetails,
    EstimateCalculator: EstimateCalculatorScreen,
    SearchAutoSuggest: SearchAutoSuggest,
    AdviceScreen: AdviceScreen,
    SearchAutoSuggest: SearchAutoSuggest,
    ScheduleTour: ScheduleTourScreen,
    Filter: FilterScreen,
    PropertyTypeSelView: PropertyTypeSelViewScreen
  },
  {
    mode: "card",
    headerMode: "screen"
  }
);

const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      SplashScreeen,
      Onboarding,
      Home: RootStack,
      OnBoardingSurvey: OnBoardingSurveyScreen
    },
    {
      initialRouteName: "SplashScreeen"
    }
  )
);
export default MainNavigator;
