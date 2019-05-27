import { observable, decorate } from "mobx";
import api from "../../api/Api";

class TourStore {
  mapTimeSelected = new Map([['Antime', true]]);
  mapDateSelected = new Map([[0, true]]);

  getTimeSelectedData(time) {
    return this.mapTimeSelected.get(time)
  };

  getDateSelectedData(index) {
    return this.mapDateSelected.get(index)
  };

  clearTimeData() {
    return this.mapTimeSelected.clear();
  };

  clearDateData() {
    return this.mapDateSelected.clear();
  };
}

decorate(TourStore, {
  mapDateSelected: observable,
  mapTimeSelected: observable
});

export default new TourStore();