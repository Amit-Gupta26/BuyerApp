import { observable, decorate, action, runInAction, computed, has } from "mobx";
import api from "../../api/Api";
import preference from "../../data/Preferences";
import UserData from "../../utils/UserData";
import { RECENT_SEARCH, KEY_HAS_APPLIED_PREFERENCES, storeJsonItem, storeItem } from "../../data/local";
import { Platform } from "react-native";
const iosStoreUrl =
  "https://itunes.apple.com/in/app/real-estate-by-owners.com/id1137858836?mt=8";
const androidStoreUrl =
  "https://play.google.com/store/apps/details?id=com.owners.buyer&hl=en";
import generateUUID from "../../utils/RandomIdGenerator";

class OnboardingStore {
  searchUrl = "";
  searchTerm = "";
  error = {};
  beds = null;
  baths = null;
  priceRange = null;
  preferences = [];
  applyPreferences = false;
  propertyTypes = [];
  propertyTypesLabel = null;
  minPrice = null;
  maxPrice = null;
  searchId = "";
  isMlsSearch = false;

  fetchSearchUrl = suggestion => {
    this.searchTerm = `${suggestion.level1Text}, ${suggestion.level2Text}`;
    this.searchId = suggestion.id;
    api.Search.getSearchUrl(suggestion)
      .then(({ url }) => this.setSearchUrl(url))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setMlsSearchUrl = (url, searchText) => {
    this.searchUrl = url;
    this.searchText = searchText;
    this.isMlsSearch = true;
  };

  updatePopertyTypes = (value, propertyTypesLabel) => {
    this.propertyTypes = value;
    this.propertyTypesLabel = propertyTypesLabel;
  };

  updatePriceRange = (minPrice, maxPrice, priceRangeLabel) => {
    if ((priceRangeLabel.localeCompare("0-9000001") == 0) || (priceRangeLabel.localeCompare("No Min - No Max") == 0)){
      this.priceRange = null;
      this.minPrice = null;
      this.maxPrice = null;
    }
    else{
      this.priceRange = priceRangeLabel;
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
    }
  };

  updateBeds = beds => {
    this.beds = beds;
  };

  updateBaths = baths => {
    this.baths = baths;
  };

  buildFilters = () => {
    let appliedFilter = [];
    if (this.beds) {
      appliedFilter.push({ key: "bed", value: this.beds });
    }
    if (this.baths) {
      appliedFilter.push({ key: "bath", value: this.baths });
    }
    if (this.minPrice && this.maxPrice) {
      appliedFilter.push({
        key: "price",
        value: `${this.minPrice}-${this.maxPrice}`
      });
    }
    if (this.propertyTypes && this.propertyTypes.length > 0) {
      this.propertyTypes.forEach(propTypes => {
        appliedFilter.push({ key: "proptype", value: propTypes["id"] });
      });
    }
    if (this.applyPreferences && this.preferences.length > 0) {
      // storeItem(KEY_HAS_APPLIED_PREFERENCES, "true").then(data => console.log("saved preference"))
      //   .then(error => console.log("Error"));
      appliedFilter.push({ key: "Sort", value: "MatchRank" });
      this.preferences.forEach(prefs => {
        let twins = prefs.split(",");
        if (twins.length > 1) {
          appliedFilter.push({ key: "mr", value: `${twins[0]}*2` });
          appliedFilter.push({ key: "mr", value: `${twins[1]}*2` });
        } else {
          appliedFilter.push({ key: "mr", value: `${prefs}*2` });
        }
      });
    }
    // appliedFilter.push({ key: "priceReduce", value: "true" });
    // appliedFilter.push({key:"openHouse", value:"future"})
    let filters = [];
    let stringFilters = null;
    appliedFilter.forEach(filter => {
      filters.push(`${filter["key"]}=${filter["value"]}`);
    });
    if (filters.length > 0) {
      stringFilters = filters.join("&");
    }
    return stringFilters;
  };

  updatePreferences = preference => {
    if (!preference) {
      this.preferences = [];
      return;
    }
    if (this.preferences.includes(preference)) {
      this.preferences = this.preferences.filter(data => data !== preference);
    } else {
      this.preferences = [...this.preferences, preference];
    }
  };

  applyMatchRank = hasPref => {
    this.applyPreferences = hasPref;
  };

  onSkip = () => {
    const recentSearchTobeSaved = {
      searchTerm: this.searchTerm,
      searchId: this.searchId,
      searchUrl: this.searchUrl,
      isMlsSearch: this.isMlsSearch,
      filters: this.buildFilters()
    };
    storeJsonItem(RECENT_SEARCH, recentSearchTobeSaved)
      .then(data => console.log("saved success"))
      .then(error => console.log("Error"));
  };

  setSearchUrl = url => {
    this.searchUrl = url;
  };

  get filterSummary() {
    let appliedFilter = [];
    let matchRanks = [];

    if (this.priceRange) {
      let twins = this.priceRange.split("-");
      var minValue = "";
      var maxValue = "";

      if (twins[0] == "0") {
        minValue = "No Min";
      } else {
        minValue = twins[0];
      }
      if (twins[1] == "9000001") {
        maxValue = "No Max";
      } else {
        maxValue = twins[1];
      }
      appliedFilter.push(minValue + " - " + maxValue);
    }

    if (this.propertyTypes && this.propertyTypes.length > 0) {
      appliedFilter.push(this.propertyTypesLabel);
    }

    if (this.beds) {
      var tempBeds = this.beds;

      if (this.beds == "0"){
        appliedFilter.push("Studio+");
      }
      else if (this.beds == "0e"){
        appliedFilter.push("Studio");
      }
      else{
        if (tempBeds.includes("e")){
          tempBeds = tempBeds.replace('e','');
          appliedFilter.push(`${tempBeds + (tempBeds == "1" ? " bed" : " beds")}`);
        }
        else{
          appliedFilter.push(`${tempBeds + (tempBeds == "1" ? "+ bed" : "+ beds")}`);
        }
      }
    }

    if (this.baths) {
      var tempBaths = this.baths;
      if (tempBaths.includes("e")){
        tempBaths = tempBaths.replace('e','');
        appliedFilter.push(`${tempBaths + (tempBaths == "1" ? " bath" : " baths")}`);
      }
      else{
        appliedFilter.push(`${tempBaths + (tempBaths == "1" ? "+ bath" : "+ baths")}`);
      }
    }

    if (this.applyPreferences && this.preferences.length > 0) {
      this.preferences.forEach(prefs => {
        let twins = prefs.split(",");
        if (twins.length > 1) {
          matchRanks.push(preference[twins[0]], preference[twins[1]]);
        } else {
          matchRanks.push(preference[prefs]);
        }
      });
      appliedFilter.push(matchRanks.join(" , "));
    }

    return appliedFilter.join(" , ");
  }

  _updateSurveyLeadDetails(
    isFSBO,
    preApprovedData,
    buyerTimeLineData,
    callBack,
    navigation,
    store
  ) {
    var offset = this.getTimeZone();
    var hourAndMinute = offset.split(":");
    let userData = UserData.getInstance();
    let storeUrl = "";

    if (Platform.OS == "ios") {
      storeUrl = iosStoreUrl;
    } else {
      storeUrl = androidStoreUrl;
    }

    let params = {
      buyerReadinessTimeline: buyerTimeLineData,
      email: userData.getEmail(),
      firstName: userData.getFirstName(),
      lastName: userData.getLastName(),
      leadSourceUrl: storeUrl,
      leadType: "BUYER",
      ownersVisitorId: "8f9b0dde-e275-487b-b584-cf736a724bf2",
      phone: userData.getPhoneNumber(),
      preApprovedForMortgage: preApprovedData,
      requestType: "OTHER",
      source: "App-Android-Owners.com Onboarding",
      state: "CA",
      userTimeZone: {
        hourOffset: hourAndMinute[0],
        minuteOffset: hourAndMinute[1]
      }
    };
    api.LeadApi.lead(isFSBO, params)
      .then(data => {
        callBack(true, navigation, store);
      })
      .catch(({ error }) => {
        runInAction(() => {
          this.error = error;
          callBack(false, navigation);
        });
      });
  }

  getTimeZone() {
    var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
    return (
      (offset < 0 ? "+" : "-") +
      ("00" + Math.floor(o / 60)).slice(-2) +
      ":" +
      ("00" + (o % 60)).slice(-2)
    );
  }

  getSearchFilter() {
    searchFilters: {
    }
    return this.searchFilters;
  }

  _saveSearch() {
    var autogeneratedUUID = generateUUID();
    var propertyTypeSavedSearchLabel = null
    var searchSortLabel = null
    var searchKeywordsLabel = null

    if (this.propertyTypes && this.propertyTypes.length > 0) {
      this.propertyTypes.forEach(propTypes => {
        if (propertyTypeSavedSearchLabel != null) {
          propertyTypeSavedSearchLabel = propertyTypeSavedSearchLabel + "," + propTypes["id"];
        } else {
          propertyTypeSavedSearchLabel = propTypes["id"];
        }
      });
    }

    if (this.applyPreferences && this.preferences.length > 0) {
      searchSortLabel = "MatchRank"
      this.preferences.forEach(prefs => {
        if (searchKeywordsLabel!=null) {
          searchKeywordsLabel = searchKeywordsLabel+","+`${prefs}*2`
        } else {
          searchKeywordsLabel = `${prefs}*2`
        }
      });
    }

    let params = {
      isNew: true,
      isNotify: "1",
      isSaved: true,
      newCount: 0,
      notificationFrequency: "instant",
      polygonLabel: this.searchTerm,
      polygonUiId: this.searchId,
      searchName: this.searchTerm,
      uuid: autogeneratedUUID,
      searchFilters: {
        propertySource: "MLS",
        notificationFrequency: "instant",
        bed: this.beds != "" ? this.beds + (this.beds.includes("e") ? "" : "p") : null,
        bath: this.baths != "" ? this.baths +(this.baths.includes("e") ? "" : "p") : null,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        propertyType: propertyTypeSavedSearchLabel !=null ? propertyTypeSavedSearchLabel : null,
        searchSort : searchSortLabel !=null ? searchSortLabel : null,
        searchKeywords : searchKeywordsLabel !=null ? searchKeywordsLabel : null
      }
    };

    api.Search.saveSearch(params)
      .then(({ url }) => console.log("saved"))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  }
}
decorate(OnboardingStore, {
  searchUrl: observable,
  error: observable,
  beds: observable,
  baths: observable,
  priceRange: observable,
  propertyTypes: observable,
  preferences: observable,
  fetchSearchUrl: action,
  updatePriceRange: action,
  updateBaths: action,
  updateBaths: action,
  updatePreferences: action,
  applyMatchRank: action,
  filterSummary: computed,
  minPrice: observable,
  maxPrice: observable
});

export default new OnboardingStore();
