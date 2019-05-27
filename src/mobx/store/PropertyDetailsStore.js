import { observable, decorate, action, computed, runInAction } from "mobx";
import api from "../../api/Api";
class PropertyDetailsStore {
  isLoading;
  data;
  ownersEstimate;
  error;
  schools;

  constructor() {
    this.isLoading = false;
    this.data = {};
    this.ownersEstimate = null;
    this.error = undefined;
    this.schools = [];
  }

  fetchPropertyDetails = url => {
    this.isLoading = true;
    api.Property.details(url)
      .then(({ data }) => {
        this.setPropertyData(data);
        this.fetchOwnersEstimate();
        this.fetchSchool();
      })
      .catch(({ error }) =>
        runInAction(() => {
          this.error = error;
        })
      );
  };

  setPropertyData = data => {
    this.data = data;
    this.isLoading = false;
  };

  fetchOwnersEstimate = () => {
    if(this.data.globalPropertyId !== undefined){
    api.Property.ownersEstimate(this.data.globalPropertyId)
      .then(({ ownersEstimatePrice }) => {
        runInAction(() => (this.ownersEstimate = ownersEstimatePrice));
      })
      .catch(({ error }) => {
        runInAction(() => (this.error = error));
      });
    }
  };

  fetchSchool = () => {
    api.Property.school(
      this.data.propertyAddress.latitude,
      this.data.propertyAddress.longitude,
      this.data.propertyAddress.state
    )
      .then(({ result }) => {
        this.setSchool(result.publicSchoolList);
      })
      .catch(({ error }) =>
        runInAction(() => {
          console.error(error.message);
        })
      );
  };

  setSchool = schools => {
    this.schools = schools;
  };

  get pdpImages() {
    let images = [];
    this.data !== undefined && this.data.images !== undefined &&
      this.data.images.map(image => {
        images.push(image.imageURL);
      });
    return images;
  }

  get proppertyAddress() {
    return this.propertyAddressLine1 + "\n" + this.propertyAddressLine2;
  }

  get propertyAddressLine1() {
    return (
      this.data.propertyAddress !== undefined &&
      this.data.propertyAddress.addressLine1
    );
  }

  get propertyAddressLine2() {
    return (
      this.data.propertyAddress !== undefined &&
      this.data.propertyAddress.city +
        ", " +
        `${this.data.propertyAddress.state} ${this.data.propertyAddress.zip}`
    );
  }

  get address() {
    return this.data.propertyAddress !== undefined && this.data.propertyAddress;
  }

  get propertyOverview() {
    return (
      this.data.bedRooms +
      " Beds" +
      " • " +
      this.data.bathRooms +
      " Baths" +
      " • " +
      this.data.size +
      " ft²"
    );
  }

  clear = () => {
    this.data = {};
    this.isLoading = false;
    this.error = undefined;
    this.schools = [];
    this.ownersEstimate = null;
  };
}
decorate(PropertyDetailsStore, {
  isLoading: observable,
  data: observable,
  schools: observable,
  setPropertyData: action,
  pdpImages: computed,
  proppertyAddress: computed,
  propertyAddressLine1: computed,
  propertyAddressLine2: computed,
  propertyOverview: computed
});

export default new PropertyDetailsStore();
