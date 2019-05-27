const searchUrlBody = suggestion => {
  let address = JSON.parse(suggestion.jsonResult);
  return {
    id: suggestion.id,
    assessorId: suggestion.assessorId || undefined,
    type: suggestion.type,
    polygonRequest: {
      name: address.name,
      state: address.state,
      streetName: address.streetName,
      city: address.city,
      zip: address.zip
    }
  };
};

const saveSearchBody = data => {};

const saveListingBody = data => {};

export default { searchUrlBody, saveSearchBody, saveListingBody };
