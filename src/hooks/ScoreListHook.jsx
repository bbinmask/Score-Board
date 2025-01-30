class Node {
  constructor(state) {
    this.state = state;
    this.prev = null;
    this.next = null;
  }
}

export default class ScoringListHook {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  addState(state) {
    const newNode = new Node(state);
    console.log(this.current);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      this.current.next = newNode;
      newNode.prev = this.current;
      this.current = newNode;
      this.tail = newNode; // Update tail to the latest state
    }
  }

  undo() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.state;
    }
    return null; // No previous state
  }

  redo() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.state;
    }
    return null; // No next state
  }
}
