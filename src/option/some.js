class Some {
  #value

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }
}

export default Some;
