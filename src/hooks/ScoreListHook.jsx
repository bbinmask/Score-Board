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
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      newNode.prev = this.current;
      this.current = newNode;
      this.tail = newNode;
    }
  }

  undo() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.state;
    }
    return null; // No previous state
  }
}
