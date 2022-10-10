'use strict';
const HeapPriorityQueue = require('./heap-priority-queue');

let priorityQueue;
const createIndexedLogSource = (logSource, logSourcesIdx, priority) => ({ logSourcesIdx, logSource, priority });
const insertLogSourceHeadReferenceIntoPriorityQueue = (logSource, logSourcesIdx) =>
    priorityQueue.insert(createIndexedLogSource(logSource, logSourcesIdx, logSource.last.date.getTime()));
const sortLogSourcesQueuesHeads = (logSources) => {
    priorityQueue = new HeapPriorityQueue(logSources.length);
    logSources.forEach((logSource, logSourcesIdx) => {
        insertLogSourceHeadReferenceIntoPriorityQueue(logSource, logSourcesIdx);
    });
};

const merge = (logSources, printer, popFunction) => {
    sortLogSourcesQueuesHeads(logSources);
    let indexedLogSource;
    while (indexedLogSource = priorityQueue.extractMin()) {
        printer.print(indexedLogSource.logSource.last);
        const currentLogSource = logSources[indexedLogSource.logSourcesIdx];
        popFunction(currentLogSource, indexedLogSource);
    }
};

const logMerge = (logSources, printer) => {
    merge(logSources, printer, (ls, ils) => {
        if (ls.pop()) {
            insertLogSourceHeadReferenceIntoPriorityQueue(ls, ils.logSourcesIdx);
        }
    });
}

const asyncLogMerge = async (logSources, printer) => {
    merge(logSources, printer, async (ls, ils) => {
        if (await ls.popAsync()) {
            insertLogSourceHeadReferenceIntoPriorityQueue(ls, ils.logSourcesIdx);
        }
    });
};

module.exports = { logMerge, asyncLogMerge };
