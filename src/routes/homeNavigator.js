import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import React from "react";
import { Platform } from "react-native";
import TabBarIocn from "../components/TabBarIcon";
import FavoritesScreen from "../screens/favorite/FavoritesScreen";
import DiscoverScreen from "../screens/discover/DiscoverScreen";
import AlertsScreen from "../screens/alerts/AlertsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SearchScreen from "../screens/search/SearchScreen";
import MultipleUnitsScreen from "../screens/search/MultipleUnitsScreen";
import UpdateProfileScreen from "../screens/profile/UpdateProfileScreen";
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";
import Register from "../screens/auth/RegisterScreen";
import SignIn from "../screens/auth/SignInScreen";
import PhoneNumber from "../screens/auth/PhoneNumber";

const imagePadding = Platform.OS === "ios" ? 8 : 5;
const tabSelection = false

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    MultipleUnit: MultipleUnitsScreen
  },
  {
    mode: "modal",
    headerMode: "screen"
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    UpdateProfile: UpdateProfileScreen,
    ChangePassword: ChangePasswordScreen
  },
  {
    mode: "modal",
    headerMode: "screen"
  }
);

const RegisterStack = createStackNavigator(
  {
    RegisterScreen: Register,
    SignInScreen: SignIn,
    ChangePassword: ChangePasswordScreen,
    PhoneNumberScreen: PhoneNumber,
    Profile: ProfileScreen
  },
  {
    mode: "card",
    headerMode: "none"
  }
);

export default createBottomTabNavigator(
  {
    Search: {
      screen: SearchStack,
      navigationOptions: {
        title: "Search",
        tabBarIcon: ({ tintColor }) => (
          <TabBarIocn
            image={require("../assets/image/search.png")}
            tintColor={tintColor}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        title: "Favorites",
        tabBarIcon: ({ tintColor }) => (
          <TabBarIocn
            image={require("../assets/image/favorites.png")}
            tintColor={tintColor}
          />
        )
      }
    },
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        title: "Discover",
        tabBarIcon: ({ tintColor }) => (
          <TabBarIocn
            image={require("../assets/image/discover.png")}
            tintColor={tintColor}
          />
        )
      }
    },
    Alerts: {
      screen: AlertsScreen,
      navigationOptions: {
        title: "Alerts",
        tabBarIcon: ({ tintColor }) => (
          <TabBarIocn
            image={require("../assets/image/alerts.png")}
            tintColor={tintColor}
          />
        )
      }
    },
    Profile: {
      screen: tabSelection ? ProfileStack : RegisterStack,
      navigationOptions: {
        title: tabSelection ? 'Me' : 'Sign In',
        tabBarIcon: ({ tintColor }) => (
          <TabBarIocn
            image={require("../assets/image/profile.png")}
            tintColor={tintColor}
          />
        ),
        tabBarVisible: tabSelection ? true : false
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#041B44",
      inactiveTintColor: "#9EABCD",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        padding: imagePadding,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);
