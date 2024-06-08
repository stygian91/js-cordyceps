class Err {
  #value

  constructor(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }
}

export default Err;
