let csvToJson = require("convert-csv-to-json");

let fileInputName = "./webgreeks.csv";
let fileOutputName = "./webgreeks.json";

csvToJson
  .utf8Encoding()
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
