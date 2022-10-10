'use strict';
const HeapPriorityQueue = require('./heap-priority-queue');

let priorityQueue;

const insertLogSourceHeadReferenceIntoPriorityQueue = (logSource) =>
    priorityQueue.insert({ logSource, priority: logSource.last.date.getTime() });

const sortLogSourcesQueuesHeads = (logSources) => {
    priorityQueue = new HeapPriorityQueue(logSources.length);
    logSources.forEach((logSource) => {
        insertLogSourceHeadReferenceIntoPriorityQueue(logSource);
    });
};

const logMerge = (logSources, printer) => {
    sortLogSourcesQueuesHeads(logSources);
    let prioritizedLogSource;
    while (prioritizedLogSource = priorityQueue.extractMin()) {
        printer.print(prioritizedLogSource.logSource.last);
        if (prioritizedLogSource.logSource.pop()) {
            insertLogSourceHeadReferenceIntoPriorityQueue(prioritizedLogSource.logSource, prioritizedLogSource.logSourcesIdx);
        }
    }
}

const asyncLogMerge = async (logSources, printer, resolve) => {
    sortLogSourcesQueuesHeads(logSources);
    let prioritizedLogSource;
    while (prioritizedLogSource = priorityQueue.extractMin()) {
        printer.print(prioritizedLogSource.logSource.last);
        if (await prioritizedLogSource.logSource.popAsync()) {
            insertLogSourceHeadReferenceIntoPriorityQueue(prioritizedLogSource.logSource, prioritizedLogSource.logSourcesIdx);
        }
    }
    resolve();
}

module.exports = { logMerge, asyncLogMerge };
