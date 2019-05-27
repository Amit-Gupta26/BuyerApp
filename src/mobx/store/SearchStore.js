import { observable, action, computed, runInAction, decorate, get, has } from "mobx";
import api from "../../api/Api";
import { RECENT_SEARCH } from "../../data/local";
class SearchStore {
  isLoading = false;
  isPropertyDetails = false;
  isSuggestionsEmpty = false;
  listProperties = [];
  mapProperties = [];
  polygonCoordinates = [];
  suggestions = [];
  searchTitle = "";
  page = 0;
  resultCount = 0;
  data = {};
  error = "";
  searchUrl = "";
  hasFilter = false;
  isBoundaryCall = false;
  isPolygonSearch = false;
  currentListPageIndex = 1;
  boundaryURL = "";
  searchText = 'Search by city, state, ZIP, school';
  pdpUrl = "";
  isMlsSearch = false;
  isClearData = false;
  showList = false;
  sectionFirstItem = null;

  //filter Data
  
  propertyTypes = [];
  beds = null;
  baths = null;
  minPrice = null;
  maxPrice = null;
  minSquareFeet = null;
  maxSquareFeet = null;
  minYearBuilt = null;
  maxYearBuilt = null;
  listingType = "MLS"
  isOpenHouse = false;
  isPriceReduced = false;
  daysOnOwners = null;

  updatePopertyTypes = (value, propertyTypesLabel) => {
    this.propertyTypes = value;
    this.propertyTypesLabel = propertyTypesLabel;
  };

  updateBeds = beds => {
    this.beds = beds;
  };

  updateBaths = baths => {
    this.baths = baths;
  };

  updatePriceRange = (minPrice, maxPrice) => {
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  };

  updateSquareFeetArea = (minSquareFeet, maxSquareFeet) => {
    this.minSquareFeet = minSquareFeet;
    this.maxSquareFeet = maxSquareFeet;
  };

  updateYearBuilt = (minYearBuilt, maxYearBuilt) => {
    this.minYearBuilt = minYearBuilt;
    this.maxYearBuilt = maxYearBuilt;
  };

  updateListingType = (listingType) => {
    this.listingType = listingType;
  };

  updateOpenHouse = isOpenHouse => {
    this.isOpenHouse = isOpenHouse;
  };

  updatePriceReduced = isPricereduced => {
    this.isPriceReduced = isPricereduced;
  };

  updateDaysOnowners = daysOnOwners => {
    this.daysOnOwners = daysOnOwners;
  };

  fetchSuggestions = query => {
    // this.isLoading = true;
    api.Search.suggestion(query)
      .then(({ suggestions, errorMessage }) =>
        this.setSuggestionsData(suggestions, errorMessage)
      )
      .catch(({ error }) =>
        runInAction(() => {
          this.suggestions = [];
          this.error = error;
        })
      );
  };

  setSuggestionsData = (suggestions, errorMessage) => {
    var suggestionsArr = [];
    if (errorMessage != "system.error") {
      var placesArr = [];
      suggestions.Place.STATE.forEach(element => {
        placesArr.push(element);
      });
      suggestions.Place.CITY.forEach(element => {
        placesArr.push(element);
      });
      suggestions.Place.PLACE.forEach(element => {
        placesArr.push(element);
      });
      suggestions.Place.NEIGHBORHOOD.forEach(element => {
        placesArr.push(element);
      });
      suggestions.Place.COUNTY.forEach(element => {
        placesArr.push(element);
      });
      suggestions.Place.ZIP.forEach(element => {
        placesArr.push(element);
      });
      if (placesArr.length > 0) {
        suggestionsArr.push({
          title: "Place",
          data: placesArr,
          key: "Place",
          index: suggestionsArr.length
        });
      }

      var schoolsArr = [];
      suggestions.Schools.SCHOOL_DISTRICT.forEach(element => {
        schoolsArr.push(element);
      });
      suggestions.Schools.PRIVATE_SCHOOL.forEach(element => {
        schoolsArr.push(element);
      });
      suggestions.Schools.PUBLIC_SCHOOL.forEach(element => {
        schoolsArr.push(element);
      });
      if (schoolsArr.length > 0) {
        suggestionsArr.push({
          title: "Schools",
          data: schoolsArr,
          key: "Schools",
          index: suggestionsArr.length
        });
      }

      var listingsArr = [];
      suggestions.Listings.MLS_ID.forEach(element => {
        listingsArr.push(element);
      });
      suggestions.Listings.LISTING_ID.forEach(element => {
        listingsArr.push(element);
      });
      if (listingsArr.length > 0) {
        suggestionsArr.push({
          title: "Listings",
          data: listingsArr,
          key: "Listings",
          index: suggestionsArr.length
        });
      }

      var addresesArr = [];
      suggestions.Address.ADDRESS.forEach(element => {
        addresesArr.push(element);
      });
      if (addresesArr.length > 0) {
        suggestionsArr.push({
          title: "Address",
          data: addresesArr,
          key: "Address",
          index: suggestionsArr.length
        });
      }
    }
    this.suggestions = suggestionsArr;
    if (!this.isClearData) {
      if (
        errorMessage ==
        "We couldn't figure out where you want to search. Please check the spelling. You can search by city, county, neighborhood, school, zip code and MLS ID."
      ) {
        this.isSuggestionsEmpty = true;
      } else {
        this.isSuggestionsEmpty = false;
      }
    }
  };

  fetchCentroid = polygonId => {
    // this.isLoading = true;
    api.Search.centroid(polygonId)
      .then(({ boundingPolygonCoordinates }) =>
        this.setCentroidData(boundingPolygonCoordinates)
      )
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setCentroidData = boundingPolygonCoordinates => {
    this.polygonCoordinates = boundingPolygonCoordinates;
  };

  fetchSearchURL = suggestion => {
    // this.isLoading = true;
    api.Search.getSearchUrl(suggestion)
      .then(({ url }) => this.setSearchURLData(url, false, false))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  fetchSearchURLForAddress = ({ navigation, params }, suggestionItem,callback) => {
    api.Search.getSearchUrl(suggestionItem)
      .then(({ url }) => this.setAddressSearchUrl(navigation, url, callback))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setAddressSearchUrl = (navigation, url, callback) => {
    callback(url, navigation, true);
  }

  fetchSearchURLForMls = ({ navigation, params }, suggestionItem, type, callback) => {
    api.Search.getSearchUrlMls("/getSearchUrl?id=" + suggestionItem.id + "&type=" + type)
      .then(({ url }) => this.setMlsSearchUrl(navigation, params, url, callback, suggestionItem))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setMlsSearchUrl = (navigation, params, url, callback, suggestionItem) => {
    if (url.indexOf("searchbyid") > -1) {
      this.searchUrl = url;
      this.searchText = suggestionItem.id;
      this.isMlsSearch = true;
      let symbol = "?";
      this.fetchListProperties(`${url}${symbol}ajaxsearch=true`, false, false);
      this.fetchMapProperties(
        `${url}${symbol}ajaxsearch=true&view=map`,
        false,
        false,
        true
      );
      callback(this.pdpUrl, navigation, false, params, suggestionItem);
    } else {
      this.pdpUrl =  url;
      callback(this.pdpUrl, navigation, true, params, suggestionItem);
    }
  };

  setSearchURLData = (url, hasFilter, isMlsSearch) => {
    this.isMlsSearch = isMlsSearch;
    this.hasFilter = hasFilter;
    let symbol = hasFilter ? "&" : "?";
    this.searchUrl = url;
    this.currentListPageIndex = 1;
    this.boundaryURL = "";
    this.isBoundaryCall = false;
    this.listProperties = [];
    this.fetchListProperties(`${url}${symbol}ajaxsearch=true`, false, false);
    this.fetchMapProperties(
      `${url}${symbol}ajaxsearch=true&view=map`,
      false,
      false,
      false
    );
  };

  fetchListProperties = (url, isBoundaryCall, isPolygonSearch) => {
    console.log(`new :${url}`)
    this.isLoading = true;
    this.isBoundaryCall = isBoundaryCall;
    this.isPolygonSearch = isPolygonSearch;
    var urlWithPolygon = url;
    if (isBoundaryCall == true) {
      urlWithPolygon = urlWithPolygon + "&polygon=" + isPolygonSearch;
    } else {
      urlWithPolygon = urlWithPolygon + "&polygon=true";
    }
    api.Search.search(urlWithPolygon)
      .then(({ data }) => this.setListSearchData(data))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setListSearchData = data => {
    this.data = data;
    var propertiesArr = [];
    if (data.property != null) {
      propertiesArr = data.property ? data.property : [];
    }
    if (this.currentListPageIndex > 1) {
      this.listProperties = [...this.listProperties, ...propertiesArr];
    } else {
      this.listProperties = data.property;
    }
    this.searchTitle = data.searchText;
    this.isLoading = false;
    this.resultCount = data.resultCount;
  };

  fetchMapProperties = (url, isBoundaryCall, isPolygonSearch, isMlsSearch) => {
    this.isLoading = true;
    this.isBoundaryCall = isBoundaryCall;
    this.isPolygonSearch = isPolygonSearch;
    var urlWithPolygon = url;
    if (!isMlsSearch) {
      if (isBoundaryCall == true) {
        urlWithPolygon = urlWithPolygon + "&polygon=" + isPolygonSearch;
      } else {
        urlWithPolygon = urlWithPolygon + "&polygon=true";
      }
    }
    api.Search.search(urlWithPolygon)
      .then(({ data }) => this.setMapSearchData(data))
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setMapSearchData = data => {
    this.isPropertyDetails = data.propertyDetails;
    this.data = data;
    this.mapProperties = data.property;
    this.isLoading = false;
  };

  get searchName() {
    return this.data.searchTitle;
  }
}
decorate(SearchStore, {
  isLoading: observable,
  searchTitle: observable,
  resultCount: observable,
  data: observable,
  mapProperties: observable,
  suggestions: observable,
  pdpUrl: observable,
  setListSearchData: action,
  setMapSearchData: action,
  setCentroidData: action,
  setSearchURLData: action,
  setSuggestionsData: action,
  searchName: computed,
  isSuggestionsEmpty: observable
});

export default new SearchStore();
