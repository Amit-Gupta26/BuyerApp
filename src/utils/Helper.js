export const SchoolRatingColor = school => {
  let ratingColor = "#000000";
  if (school.rating) {
    let rating = parseInt(school.rating);
    if (rating < 8 && rating > 3) {
      ratingColor = "#EFAC42";
    } else if (rating <= 3) {
      ratingColor = "#D83E3B";
    } else {
      ratingColor = "#51BF7F";
    }
  }
  return ratingColor;
};

export const SchoolDescription = school => {
  let schoolsInfo = [];
  if (school.assigned) {
    schoolsInfo.push("Assigned");
  }
  if (school.totalStudents) {
    schoolsInfo.push(`${school.totalStudents} students`);
  }
  if (school.studentTeacherRatio) {
    schoolsInfo.push(`${school.studentTeacherRatio} student/teacher`);
  }
  return schoolsInfo.join(" • ");
};

export const NewBadgeTime = daysStr => {
  return daysStr.substring(0, daysStr.indexOf(" ") + 2).replace(/\s/g, "").toUpperCase() + " AGO";
}

export const priceFormatter = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
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

export const MatchRankDetails = matchRankScore => {
  let matchText = "EXCELLENT";
  let bgColor = "#4BD385";
  let imagePath = require("../assets/image/poor.png");
  if (matchRankScore >= 0 && matchRankScore < 3) {
    matchText = "POOR";
    bgColor = "#8C8E9A";
    imagePath = require("../assets/image/poor.png");
  } else if (matchRankScore >= 3 && matchRankScore < 6) {
    matchText = "GOOD";
    bgColor = "#5EA1C5";
    imagePath = require("../assets/image/good.png");
  } else if (matchRankScore >= 6 && matchRankScore < 9) {
    matchText = "VERY GOOD";
    bgColor = "#DAA119";
    imagePath = require("../assets/image/very_good.png");
  } else if (matchRankScore >= 9) {
    matchText = "EXCELLENT";
    bgColor = "#4BD385";
    imagePath = require("../assets/image/excellent.png");
  }
  return { matchText, bgColor, imagePath };
}

export default { SchoolRatingColor, SchoolDescription, NewBadgeTime, priceFormatter };
