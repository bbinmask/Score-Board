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

  showList() {
    return this.current.state;
  }

  prevList() {
    return this.current.prev.state;
  }

  addState(state) {
    const newNode = new Node(state);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      // Ensure next state is cleared if needed
      this.current.next = null; // Important to prevent redo issues

      // Link new state properly
      this.current.next = newNode;
      newNode.prev = this.current;
      this.current = newNode;
      this.tail = newNode;
    }
  }

  undo() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      console.log("New Current State:", this.current.state); // Now it logs the updated state
      console.log("Previous State:", this.current.prev.state); // Now it logs the updated state
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
