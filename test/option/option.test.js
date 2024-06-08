import Option from '../../src/option/option'
import { expect, test, describe } from 'vitest';

describe("option", () => {
  test("map", () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);

    expect(opt.isNone()).toEqual(true);
    expect(opt.isSome()).toEqual(false);

    expect(opt2.isNone()).toEqual(false);
    expect(opt2.isSome()).toEqual(true);

    expect(opt.map(a => a + 1).isNone()).toEqual(true)
    expect(opt2.map(a => a + 1).isSome()).toEqual(true)
    expect(opt2.map(a => a + 1).unwrap()).toEqual(2)

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
  });

  test('and', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);
    const opt3 = Option.make(2);

    expect(opt.and(opt2).isNone()).toEqual(true);
    expect(opt2.and(opt).isNone()).toEqual(true);

    expect(opt2.and(opt3).unwrap()).toEqual(2);
    expect(opt3.and(opt2).unwrap()).toEqual(1);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
    expect(opt3.unwrap()).toEqual(2);
  });

  test('option', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);

    expect(opt.andThen(() => Option.makeNone()).isNone()).toEqual(true);
    expect(opt.andThen(() => Option.make(2)).isNone()).toEqual(true);

    expect(opt2.andThen(() => Option.makeNone()).isNone()).toEqual(true);
    expect(opt2.andThen(() => Option.make(2)).isSome()).toEqual(true);
    expect(opt2.andThen(() => Option.make(2)).unwrap()).toEqual(2);

    // check if the cb is only called if the option is some
    let outside = 1;
    opt.andThen(() => {
      outside++;
      return Option.make(2);
    });
    expect(outside).toEqual(1);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
  });

  test('or', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);
    const opt3 = Option.make(2);

    expect(opt.or(opt2).unwrap()).toEqual(1);
    expect(opt2.or(opt).unwrap()).toEqual(1);
    expect(opt2.or(opt3).unwrap()).toEqual(1);
    expect(opt3.or(opt2).unwrap()).toEqual(2);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
    expect(opt3.unwrap()).toEqual(2);
  });

  test('orElse', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);

    expect(opt.orElse(() => Option.make(1)).unwrap()).toEqual(1);
    expect(opt2.orElse(() => Option.make(2)).unwrap()).toEqual(1);
    expect(opt.orElse(() => Option.makeNone()).isNone()).toEqual(true);
    expect(opt2.orElse(() => Option.makeNone()).unwrap()).toEqual(1);

    // check if the cb is only invoked if the option is none
    let outside = 1;
    opt2.orElse(() => {
      outside++;
      return Option.make(2);
    });
    expect(outside).toEqual(1);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
  });

  test('unwrapOr', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);

    expect(opt.unwrapOr(2)).toEqual(2);
    expect(opt2.unwrapOr(2)).toEqual(1);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
  });

  test('unwrapOrElse', () => {
    const opt = Option.make(null);
    const opt2 = Option.make(1);

    expect(opt.unwrapOrElse(() => 2)).toEqual(2);
    expect(opt2.unwrapOrElse(() => 2)).toEqual(1);

    // check if the cb is only invoked if the option is none
    let outside = 1;
    opt2.unwrapOrElse(() => {
      outside++;
      return 2;
    });
    expect(outside).toEqual(1);

    expect(opt.unwrap()).toEqual(null);
    expect(opt2.unwrap()).toEqual(1);
  });
});

