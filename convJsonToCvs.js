import fs from "fs"; // import the file system module for reading and writing files
import path from "path"; // import the path module for handling file paths

/**
 * Converts JSON data to CSV format.
 * @param {Array<Object>} json - The JSON data as an array of objects.
 * @returns {string} - The CSV representation of the JSON data.
 */

const jsonToCsv = (json) => {
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error("JSON data must be an array of objects.");
  }

  // extract headers from the first object
  const headers = Object.keys(json[0]);

  // convert headers and rows to CSV format
  const csvRows = [
    headers.join(","), // join headers with commas
    ...json.map((row) =>
      headers.map((fieldName) => JSON.stringify(row[fieldName] ?? "")).join(",")
    ),
  ];

  return csvRows.join("\n"); // join all rows with newlines
};

/**
 * Reads a JSON file, converts it to CSV, and writes it to a new file.
 * @param {string} inputFilePath - Path to the input JSON file.
 * @param {string} outputFilePath - Path to the output CSV file.
 */
const convertJsonToCsv = (inputFilePath, outputFilePath) => {
  // read JSON file asynchronously
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading JSON file: ${err.message}`);
      return;
    }

    try {
      // parse JSON data
      const jsonData = JSON.parse(data);

      // convert JSON to CSV format
      const csvData = jsonToCsv(jsonData);

      // write CSV data to output file
      fs.writeFile(outputFilePath, csvData, "utf8", (err) => {
        if (err) {
          console.error(`Error writing CSV file: ${err.message}`);
        } else {
          console.log(`CSV file has been saved to ${outputFilePath}`);
        }
      });
    } catch (e) {
      console.error(`Error processing JSON: ${e.message}`);
    }
  });
};

// define paths for input JSON file and output CSV file
const inputFilePath = path.resolve("input.json"); // change 'input.json' to your JSON file name
const outputFilePath = path.resolve("output.csv"); // change 'output.csv' to your desired CSV file name

// Perform the conversion
convertJsonToCsv(inputFilePath, outputFilePath);
