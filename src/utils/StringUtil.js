export default class StringUtil {

    constructor(string) {
        this.string = string;
    }

    _stringUtil(string) {

        if (string.includes("minutes") || string.includes("minute")) {
            return this._getTheNumFromString(string) + "M AGO";
        }
        else if (string.includes("hours") || string.includes("hour")) {
            return this._getTheNumFromString(string) + "H AGO";
        }
        else if (string.includes("days") || string.includes("day")) {
            return this._getTheNumFromString(string) + "D AGO";
        }
    }

    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
        } catch (e) {
            console.log(e)
        }
    };

    imageArray(arrayData) {
        imageNewArray = [];
        if (arrayData != undefined) {
            imageNewArray = [];
            for (i = 0; i <= 4; i++) {
                imageNewArray.push(arrayData[i])
            }
        }
        return imageNewArray
    }

    _getTheNumFromString(string) {
        var num = parseInt(string);
        return num;
    }
}