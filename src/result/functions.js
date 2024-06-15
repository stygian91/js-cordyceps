import Result from "./result";

/**
 * @param {Result[]} results
 * @returns {Result}
 */
export function flipResultList(results) {
  const out = [];

  for (const result of results) {
    if (result.isErr()) {
      return result;
    }

    out.push(result.unwrap());
  }

  return Result.makeOk(out);
}
