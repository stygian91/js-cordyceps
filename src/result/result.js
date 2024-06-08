import Ok from './ok';
import Err from './err';

class Result {

  #wrapped

  /**
   * @param {Ok|Err} value 
   */
  constructor(value) {
    this.#wrapped = value;
  }

  static try(fn, args = []) {
    try {
      const fnRes = fn(...args);
      return Result.makeOk(fnRes);
    } catch (error) {
      return Result.makeErr(error);
    }
  }

  static makeErr(err) {
    return new Result(new Err(err));
  }

  static makeOk(value = null) {
    return new Result(new Ok(value));
  }

  isOk() {
    return this.#wrapped instanceof Ok;
  }

  isErr() {
    return this.#wrapped instanceof Err;
  }

  unwrap() {
    return this.#wrapped.getValue();
  }

  unwrapOr(other) {
    return this.isOk() ? this.unwrap() : other;
  }

  unwrapOrElse(otherCb) {
    return this.isOk() ? this.unwrap() : otherCb();
  }

  map(mapCb) {
    if (this.isOk()) {
      return Result.makeOk(mapCb(this.unwrap()));
    }

    return this;
  }

  /**
   * @returns {Result}
   */
  or(other) {
    return this.isOk() ? this : other;
  }

  orElse(otherCb) {
    return this.isOk() ? this : otherCb();
  }

  /**
   * @returns {Result}
   */
  and(other) {
    return this.isErr() ? this : other;
  }

  andThen(otherCb) {
    return this.isErr() ? this : otherCb();
  }
}

export default Result;
