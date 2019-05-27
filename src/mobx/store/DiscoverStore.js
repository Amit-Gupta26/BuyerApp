import { observable, decorate, action } from "mobx";
import api from "../../api/Api";

class DiscoverStore {
  dataNewListings = {};
  dataOpenHouses = {};
  dataRecommended = [];

  fetchDetailsNewListings = url => {
    api.Discover.details(url)
      .then(({ data }) => this.setDiscoverNewListingsData(data))
      .catch(({ error }) =>
        runInAction(() => {
        })
      );
  };
  // fetchDetailsRecommendedListings = url => {
  //   api.Discover.details(url)
  //     .then(({ savedListingDetailsList }) => this.setDiscoverRecommendedListingsData(savedListingDetailsList))
  //     .catch(({ error }) =>
  //       runInAction(() => {
  //       })
  //     );
      
  //     fetch(url, {
  //       credentials: "same-origin",
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'OwnersVisitorID': '62e9a4fb-43e2-40b3-9b2a-a388ba67464a',
  //         'recentSearchUrlForOpenHouse': 'https%3A%2F%2Fwww.owners.com%2Fhomes-for-sale%2Fcity%2F1256356%2Fny%2Fnew-york%3Flistingstatus%3DActive',
  //         'recentSearchUrl': '/homes-for-sale/city/1256356/ny/new-york',
  //       }
  //     })
  //     .then(({ savedListingDetailsList }) => this.setDiscoverRecommendedListingsData(savedListingDetailsList))
  //     .catch(({ error }) =>
  //       runInAction(() => {
  //       })
  //     );
  // };
  fetchDetailsOpenHouses = url => {
    api.Discover.details(url)
      .then(({ data }) => this.setDiscoverOpenHouseData(data))
      .catch(({ error }) =>
        runInAction(() => {
        })
      );
  };
  setDiscoverNewListingsData = data => {
    this.dataNewListings = data;
  };
  setDiscoverRecommendedListingsData = savedListingDetailsList => {
    this.dataRecommended = savedListingDetailsList;
  };
  setDiscoverOpenHouseData = data => {
    this.dataOpenHouses = data;
  };
}
decorate(DiscoverStore, {
  dataNewListings: observable,
  dataOpenHouses: observable,
  dataRecommended: observable,
  setDiscoverData: action
});
export default new DiscoverStore();