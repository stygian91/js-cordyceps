import Option from "./option";

/**
 * @param {Option[]} options
 * @returns {Option}
 */
export function flipOptionList(options) {
  const out = [];

  for (const opt of options) {
    if (opt.isNone()) {
      return opt;
    }

    out.push(opt.unwrap());
  }

  return Option.make(out);
}
