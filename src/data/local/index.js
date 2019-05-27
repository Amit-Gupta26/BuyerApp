import { AsyncStorage } from "react-native";

export const KEY_HAS_SEEN_ONBOARDING = "has_seen_onboarding";
export const KEY_HAS_APPLIED_PREFERENCES = "has_applied_preferences";
export const RECENT_SEARCH = "recent_search";

export const onVisitedOnboarding = async () => {
  try {
    const callback = await AsyncStorage.setItem(
      KEY_HAS_SEEN_ONBOARDING,
      "true"
    );
    return callback;
  } catch (error) {
    console.log(error.message);
  }
};

export const hasVisitedOnboarding = async () => {
  try {
    const result = await AsyncStorage.getItem(KEY_HAS_SEEN_ONBOARDING);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const storeItem = async (key, item) => {
  try {
    var callback = await AsyncStorage.setItem(key, item);
    return callback;
  } catch (error) {
    alert("Saved Preferences");
  }
};

export const retrieveItem = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result;
  } catch (error) {
    alert("Failed to get Preferences");
  }
};

export const storeJsonItem = async (key, item) => {
  try {
    var callback = await AsyncStorage.setItem(key, JSON.stringify(item));
    return callback;
  } catch (error) {
    console.log(error.message);
  }
};

export const retrieveJsonItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    console.log(error.message);
  }
  return;
};
