"use strict";

const { resolve } = require("bluebird");
const logMerge = require("./log-merge");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  return new Promise((resolve) => {
    logMerge(logSources, printer);
    resolve(console.log("Async sort complete."));
  });
};
