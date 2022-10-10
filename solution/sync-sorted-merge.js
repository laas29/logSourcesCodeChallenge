"use strict";

const { logMerge } = require("./log-merge");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  logMerge(logSources, printer);
  return console.log("Sync sort complete.");
};
