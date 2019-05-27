import { observable, decorate } from "mobx";
import api from "../../api/Api";
import UserData from '../../utils/UserData';
import {
  Platform
} from 'react-native';

const iosStoreUrl = "https://itunes.apple.com/in/app/real-estate-by-owners.com/id1137858836?mt=8"
const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.owners.buyer&hl=en"

class AuthStore {
  isLoggedIn = false;
  isLoading = false;
  uuid = "";
  firstName = "";
  lastName = "";
  navigateToPreviousScreen = 'Search';

  getRegister({ firstName, lastName, password, email, authStore, navigation, onboardingStore}, callback, isFromRegister) {
    this.isLoading = true;
    api.Profile.register(firstName, lastName, password, email)
      .then(({ uuid, circleId, email, registered, softLogin, firstName, lastName }) => {
        this.isLoading = false;
        if (uuid != undefined) {
          this.registerUserResponse(uuid, circleId, email, registered, softLogin, firstName, lastName);
          this.getSignIn({ email, password, authStore, navigation, onboardingStore}, callback, isFromRegister)
        }
        else {
          this.getSignIn({ email, password, authStore, navigation, onboardingStore}, callback, isFromRegister)
        }
      })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
        })
        this.isLoading = false;
        callback(false, authStore, navigation, onboardingStore, uuid);
      }
      );
  };

  getSignIn({ email, password, authStore, navigation, onboardingStore}, callback, isFromRegister) {
    this.isLoading = true;
    api.Profile.login(email, password)
      .then(({ uuid, circleId, email, registered, softLogin, firstName, lastName }) => {
        this.isLoading = false;
        if (uuid != undefined) {
          if(isFromRegister){
          this.registerUserResponse(uuid, circleId, email, registered, softLogin, firstName, lastName);
          }
          callback(true, authStore, navigation, onboardingStore, uuid);
        }
        else {
          callback(false, authStore, navigation, onboardingStore);
        }
      })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
        })
        this.isLoading = false;
        callback(false, authStore, navigation, onboardingStore);
      }
      );
  };

  updatePhone({ phone, authStore, navigation }, callback) {
    this.isLoading = true;

    let userData = UserData.getInstance();
    let params = {
      firstName: userData.getFirstName(),
      lastName: userData.getLastName(),
      email: userData.getEmail(),
      phones: [{ "type": "H", "number": phone }],
      preferences: [{ "type": "BUYER_READINESS_TIMELINE", "value": "" }, { "type": "PREAPPROVED_FOR_MORTGAGE", "value": "" }],
      interestedInFinancing: false,
      notificationPreferences: [{
        "contactType": "EmailAddress", "contactValue": userData.getEmail(), "preferences": [
          { "type": "MARKETING", "value": true },
          { "type": "SAVESEARCH", "value": true },
          { "type": "SAVELISTING", "value": true },
          { "type": "EMAILBOUNCE", "value": false },
          { "type": "NEARBYLISTINGS", "value": true },
          { "type": "NEARBYOPENHOUSE", "value": true },
          { "type": "TOURREPORT", "value": true }]
      }]
    }

    api.Profile.updateUserQualifications(params)
      .then((data) => {
        userData.setPhoneNumber(phone)
        this.isLoading = false;
        callback(true, authStore, navigation);
      })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
        })
        this.isLoading = false;
        callback(false, authStore, navigation);
      }
      );
  };

  sendLink({ email, authStore, navigation }, callback) {
    this.isLoading = true;
    api.Profile.forgotPassword(email)
      .then((data) => {
        this.isLoading = false;
        callback(true, authStore, navigation);
      })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
        })
        this.isLoading = false;
        callback(false, authStore, navigation);
      }
      );
  };

  updateLead(isFSBO) {
    var offset = this.getTimeZone();
    var hourAndMinute = offset.split(":")
    let userData = UserData.getInstance();
    let storeUrl = ""

    if (Platform.OS == 'ios') {
      storeUrl = iosStoreUrl;
    }
    else {
      storeUrl = androidStoreUrl;
    }

    let params = {
      firstName: userData.getFirstName(),
      lastName: userData.getLastName(),
      email: userData.getEmail(),
      phones: userData.getPhoneNumber(),
      source: "App-iOS-Owners.com Registration",
      leadSourceUrl: storeUrl,
      leadType: "BUYER",
      requestType: "OTHER",
      ownersVisitorId: "8f9b0dde-e275-487b-b584-cf736a724bf2",
      state: "CA",
      userTimeZone: {
        "hourOffset": hourAndMinute[0], "minuteOffset": hourAndMinute[1]
      }
    }
    api.LeadApi.lead(isFSBO, params)
      .then((data) => { })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
        })
      }
      );
  };

  getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  };

  registerUserResponse = (uuid, circleId, email, registered, softLogin, firstName, lastName) => {
    if (uuid != undefined) {
      this.isLoggedIn = true;
      let userData = UserData.getInstance();
      userData.setUuid(uuid);
      userData.setCircleId(circleId);
      userData.setEmail(email);
      userData.setFirstName(firstName);
      userData.setLastName(lastName);
      userData.setRegistered(registered);
      userData.setSoftLogin(softLogin);
    }
    else {
      this.isLoggedIn = false;
    }
  };

}
decorate(AuthStore, {
  isLoggedIn: observable,
  isLoading: observable
});

export default new AuthStore();
