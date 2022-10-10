"use strict";

module.exports = class HeapPriorityQuue {

    constructor(maxElements) {
        this.heap = Array(maxElements).fill(0);
        this.size = -1;
    }

    parent = (i) => Math.floor((i - 1) / 2)
    leftChild = (i) => Math.floor((2 * i) + 1)
    rightChild = (i) => Math.floor((2 * i) + 2)
    getMin = () => this.heap[0]

    shiftUp(i) {
        while (i > 0 && this.heap[this.parent(i)].priority > this.heap[i].priority) {
            this.swap(this.parent(i), i);
            i = this.parent(i);
        }
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    shiftDown(i) {
        let maxIndex = i;
        let l = this.leftChild(i);
        if (l <= this.size && this.heap[l].priority < this.heap[maxIndex].priority) {
            maxIndex = l;
        }
        let r = this.rightChild(i);
        if (r <= this.size && this.heap[r].priority < this.heap[maxIndex].priority) {
            maxIndex = r;
        }
        if (i != maxIndex) {
            this.swap(i, maxIndex);
            this.shiftDown(maxIndex);
        }
    }

    insert(p) {
        this.size = this.size + 1;
        this.heap[this.size] = p;
        this.shiftUp(this.size);
    }

    extractMin() {
        let result = this.heap[0];
        this.heap[0] = this.heap[this.size];
        this.size = this.size - 1;
        this.shiftDown(0);
        // console.table(this.heap);
        return result;
    }
};