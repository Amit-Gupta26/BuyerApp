
export default  class FilterURLBuilder {
    constructor(){
        propertyTypes = [],
        beds = null,
        baths = null,
        minPrice = null,
        maxPrice = null,
        minSquareFeet = null,
        maxSquareFeet = null,
        minYearBuilt = null,
        maxYearBuilt = null,
        listingType = "MLS",
        isOpenHouse = false,
        isPriceReduced = false,
        daysOnOwners = null,
        preferences = []
    }
    

    setPropertyTypes(propertyTypes) {
        this.propertyTypes = propertyTypes;
        return this;
    }

    setBeds(beds) {
        this.beds = beds;
        return this;
    }

    setBaths(baths) {
        this.baths = baths;
        return this;
    }

    setMinPrice(minPrice) {
        this.minPrice = minPrice;
        return this;
    }

    setMaxPrice(maxPrice) {
        this.maxPrice = maxPrice;
        return this;
    }

    setMinSquareFeet(minSquareFeet) {
        this.minSquareFeet = minSquareFeet;
        return this;
    }

    setMaxSquareFeet(maxSquareFeet) {
        this.maxSquareFeet = maxSquareFeet;
        return this;
    }

    setMinYearBuilt(minYearBuilt) {
        this.minYearBuilt = minYearBuilt;
        return this;
    }

    setMaxYearBuilt(maxYearBuilt) {
        this.maxYearBuilt = maxYearBuilt;
        return this;
    }

    setListingType(listingType) {
        this.listingType = listingType;
        return this;
    }

    setIsOpenHouse(isOpenHouse) {
        this.isOpenHouse = isOpenHouse;
        return this;
    }

    setIsPriceReduced(isPriceReduced) {
        this.isPriceReduced = isPriceReduced;
        return this;
    }

    setDaysOnOwners(daysOnOwners) {
        this.daysOnOwners = daysOnOwners;
        return this;
    }

    setPreferences(preferences) {
        this.preferences = preferences;
        return this;
    }

    build(){
        var appliedFilter = [];
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
        if (this.minSquareFeet && this.maxSquareFeet) {
            appliedFilter.push({
                key: "squarefootage",
                value: `${this.minSquareFeet}-${this.maxSquareFeet}`
            });
        }
        if (this.minYearBuilt && this.maxYearBuilt) {
            appliedFilter.push({
                key: "yearbuilt",
                value: `${this.minYearBuilt}-${this.maxYearBuilt}`
            });
        }

        if (this.isOpenHouse === true) {
            appliedFilter.push({ key: "openHouse", value: "future" });
        }

        if (this.isPriceReduced === true) {
            appliedFilter.push({ key: "priceReduce", value: true });
        }

        if (this.daysOnOwners) {
            appliedFilter.push({ key: "newListings", value: this.daysOnOwners });
        }


        if (this.propertyTypes && this.propertyTypes.length > 0) {
            this.propertyTypes.forEach((propTypes, i) => {
                appliedFilter.push({ key: "proptype", value: propTypes });
            });
        }

        if (this.preferences && this.preferences.length > 0) {
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
        let filters = [];
        let stringFilters = null;
        appliedFilter.forEach(filter => {
            filters.push(`${filter["key"]}=${filter["value"]}`);
        });
        if (filters.length > 0) {
            stringFilters = filters.join("&");
        }
        return stringFilters;
    }
};

