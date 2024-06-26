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

  /**
   * @returns {Result}
   */
  static try(fn, args = []) {
    try {
      const fnRes = fn(...args);
      return Result.makeOk(fnRes);
    } catch (error) {
      return Result.makeErr(error);
    }
  }

  /**
   * @returns {Result}
   */
  static makeErr(err) {
    return new Result(new Err(err));
  }

  /**
   * @returns {Result}
   */
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

  /**
   * @returns {Result}
   */
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

  /**
   * @returns {Result}
   */
  orElse(otherCb) {
    return this.isOk() ? this : otherCb();
  }

  /**
   * @returns {Result}
   */
  and(other) {
    return this.isErr() ? this : other;
  }

  /**
   * @returns {Result}
   */
  andThen(otherCb) {
    return this.isErr() ? this : otherCb(this.unwrap());
  }

  match(onOk, onErr) {
    return this.isOk() ? onOk(this.unwrap()) : onErr(this.unwrap());
  }
}

export default Result;
