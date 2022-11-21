const fs = require("fs");
const insertRow = require("./insertData.js");
const parser = require("csv-parser");

fs.createReadStream("../SRC/csvs/Division.csv")
  .pipe(parser({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    insertRow(row, "Division");
  })
  .on("end", function () {
    console.log("Complete adding to Division");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
