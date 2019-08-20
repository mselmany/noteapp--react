export function uuid(prefix = "") {
  if (prefix) {
    prefix = prefix + "@";
  }
  return (
    prefix +
    Math.random()
      .toString(16)
      .substring(2, 9)
  );
}

export function error(message) {
  throw new Error(message);
}
