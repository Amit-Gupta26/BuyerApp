import axios from "axios";
import NetworklUtil from "../utils/NetworkUtil";

const responseBody = res => res.data;
const response = res => res;
const handleErrors = error => error;
const requests = {
  get: url =>
    axios
      .get(url)
      .then(responseBody)
      .catch(handleErrors),
  getWithParams: (url, params) =>
    axios
      .get(url, params)
      .then(responseBody)
      .catch(handleErrors),
  post: (url, body) =>
    axios
      .post(url, body)
      .then(responseBody)
      .catch(handleErrors),
  put: (url, body) =>
    axios
      .put(url, body)
      .then(responseBody)
      .catch(handleErrors),
  delete: url =>
    axios
      .delete(url)
      .then(responseBody)
      .catch(handleErrors)
};

const Profile = {
  profile: () => requests.get("/user/profile/"),
  login: (email, password) =>
    requests.post("/user/login", {
      email: email,
      password: password,
      keepMeLoggedIn: 1
    }),
  register: (firstName, lastName, password, email) =>
    requests.post("user/register", {
      firstName,
      lastName,
      email,
      password,
      keepMeLoggedIn: 1
    }),
  update: (uuid, firstName, lastName, email) =>
    requests.put("/user/profile/", {
      uuid: uuid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }),
  forgotPassword: email =>
    requests.post("/user/forgotPassword/", { email: email }),
  logout: () => requests.get("/user/signout"),
  updateUserQualifications: params =>
    requests.put("/user/updateUserQualification/", params)
};

const Search = {
  suggestion: query =>
    requests.getWithParams("/suggest", { params: { query: query } }),
  search: url => requests.get(url),
  centroid: polygonId =>
    requests.getWithParams("/centroidlocation", { params: { id: polygonId } }),
  getSearchUrl: suggestion =>
    requests.post("/getSearchUrl", NetworklUtil.searchUrlBody(suggestion)),
  recommendedProperties: id =>
    requests.getWithParams(`/api/recomendProperties/user/${id}`, {
      params: { preferenceSort: true }
    }),
  saveSearch: params =>
    requests.post("user/savedSearch/", params),
  getSearchUrlMls: (url) => requests.get(url)
};

const LeadApi = {
  lead: (isFSBO, params) =>
    requests.post(
      isFSBO ? "updateContactUser" : "user/updateLeadDetails",
      params
    )
};

const Property = {
  details: url => requests.get(url),
  ownersEstimate: globalPropertyId =>
    requests.get(`/api/listingdata/globalpropertydata/${globalPropertyId}`),
  school: (latitude, longitude, state) =>
    requests.getWithParams("/api/school/pdp", {
      params: { latitude, longitude, state }
    })
};

const Discover = {
  details: url => requests.get(url),
};

export default {
  Search,
  Profile,
  Property,
  Discover,
  LeadApi
};
