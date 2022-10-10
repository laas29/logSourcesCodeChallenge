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

const logMerge = (logSources, printer) => {
    sortLogSourcesQueuesHeads(logSources);
    let indexedLogSource;
    while (indexedLogSource = priorityQueue.extractMin()) {
        printer.print(indexedLogSource.logSource.last);
        const currentLogSource = logSources[indexedLogSource.logSourcesIdx];
        if (currentLogSource.pop()) {
            insertLogSourceHeadReferenceIntoPriorityQueue(currentLogSource, indexedLogSource.logSourcesIdx);
        }
    }
};

module.exports = logMerge;
