"use strict";

const { resolve } = require("bluebird");
const { asyncLogMerge } = require("./log-merge");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  return new Promise((resolve) => {
    asyncLogMerge(logSources, printer, () => resolve(console.log("Async sort complete.")));
  });
};
