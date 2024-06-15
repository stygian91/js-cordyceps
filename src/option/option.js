import None from './none';
import Some from './some';

class Maybe {
  #wrapped;

  /**
   * @param {Some|None} inner
   */
  constructor(inner) {
    this.#wrapped = inner;
  }

  /**
   * @returns {Maybe}
   */
  static make(value) {
    const isNil = (typeof value === 'undefined' || value === null)
    return isNil ? Maybe.makeNone() : Maybe.makeSome(value);
  }

  /**
   * @returns {Maybe}
   */
  static makeSome(value) {
    return new Maybe(new Some(value))
  }

  /**
   * @returns {Maybe}
   */
  static makeNone() {
    return new Maybe(new None);
  }

  isNone() {
    return this.#wrapped instanceof None;
  }

  isSome() {
    return this.#wrapped instanceof Some;
  }

  unwrap() {
    return this.#wrapped.getValue();
  }

  unwrapOr(other) {
    return this.isSome() ? this.#wrapped.getValue() : other;
  }

  unwrapOrElse(otherCb) {
    return this.isSome() ? this.#wrapped.getValue() : otherCb();
  }

  /**
   * @returns {Maybe}
   */
  map(mapCb) {
    if (this.isNone()) {
      return this;
    }

    return Maybe.make(mapCb(this.#wrapped.getValue()));
  }

  /**
   * @param {Maybe} other 
   */
  or(other) {
    return this.isSome() ? this : other;
  }

  /**
   * @returns {Maybe}
   */
  orElse(otherCb) {
    return this.isSome() ? this : otherCb();
  }

  /**
   * @param {Maybe} other 
   */
  and(other) {
    return this.isNone() ? this : other;
  }

  /**
   * @returns {Maybe}
   */
  andThen(andCb) {
    if (this.isNone()) {
      return this;
    }

    return andCb(this.#wrapped.getValue());
  }

  match(onSome, onNone) {
    return this.isSome() ? onSome(this.unwrap()) : onNone();
  }
}

export default Maybe;
