import Result from '../../src/result/result'
import { expect, test, describe } from 'vitest';

describe('result', () => {
  const thrower = () => {
    throw new Error('example');
  };

  const expectError = res => {
    expect(res.isErr()).toEqual(true);
    expect(res.unwrap() instanceof Error).toEqual(true);
    expect(res.unwrap().message).toEqual('example');
  };

  test('try', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);

    expectError(res);

    expect(res2.unwrap()).toEqual(42);
  });

  test('map', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);

    const mapRes = res.map(x => x + 1);
    expectError(mapRes);

    expect(res2.map(x => x + 1).unwrap()).toEqual(43);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
  });

  test('and', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);
    const res3 = Result.try(() => 69);

    expectError(res.and(res2));
    expectError(res2.and(res));

    expect(res2.and(res3).unwrap()).toEqual(69);
    expect(res3.and(res2).unwrap()).toEqual(42);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
    expect(res3.unwrap()).toEqual(69);
  });

  test('andThen', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);
    const res3 = Result.try(() => 69);

    expectError(res.andThen(() => res2));
    expectError(res2.andThen(() => res));

    expect(res2.andThen(() => res3).unwrap()).toEqual(69);
    expect(res3.andThen(() => res2).unwrap()).toEqual(42);

    let outside = 1;
    res.andThen(() => {
      outside++;
      return res2;
    });

    expect(outside).toEqual(1);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
    expect(res3.unwrap()).toEqual(69);
  });

  test('or', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);
    const res3 = Result.try(() => 69);

    expect(res.or(res2).unwrap()).toEqual(42);
    expect(res2.or(res).unwrap()).toEqual(42);

    expect(res2.or(res3).unwrap()).toEqual(42);
    expect(res3.or(res2).unwrap()).toEqual(69);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
    expect(res3.unwrap()).toEqual(69);
  });

  test('orElse', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);
    const res3 = Result.try(() => 69);

    expect(res.orElse(() => res2).unwrap()).toEqual(42);
    expect(res2.orElse(() => res).unwrap()).toEqual(42);

    expect(res2.orElse(() => res3).unwrap()).toEqual(42);
    expect(res3.orElse(() => res2).unwrap()).toEqual(69);

    let outside = 1;
    res2.orElse(() => {
      outside++;
      return res3;
    });

    expect(outside).toEqual(1);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
    expect(res3.unwrap()).toEqual(69);
  });

  test('unwrapOr', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);

    expect(res.unwrapOr(420)).toEqual(420);
    expect(res2.unwrapOr(69)).toEqual(42);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
  });

  test('unwrapOrElse', () => {
    const res = Result.try(thrower);
    const res2 = Result.try(() => 42);

    expect(res.unwrapOrElse(() => 420)).toEqual(420);
    expect(res2.unwrapOr(() => 69)).toEqual(42);

    let outside = 1;
    res2.unwrapOrElse(() => {
      outside++;
      return 69;
    });
    expect(outside).toEqual(1);

    expectError(res);
    expect(res2.unwrap()).toEqual(42);
  });
});
