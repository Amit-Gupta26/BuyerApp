import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/auth/SignInScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
export default createStackNavigator(
  {
    SignIn: SignInScreen,
    Register: RegisterScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
