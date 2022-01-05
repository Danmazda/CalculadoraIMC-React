export function imc(h, w) {
  let res = (w / (h * h)).toFixed(2);
  if (res === "NaN") {
    return "";
  }
  return res;
}
