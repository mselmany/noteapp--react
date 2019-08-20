import { error } from "commons/utils";
export function state(prefix) {
  let asObject = {};
  let asArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.indexOf(prefix) === 0 || !prefix) {
      const value = JSON.parse(localStorage.getItem(key));
      asObject[key] = value;
      asArray.push({ key, value });
    }
  }

  asArray.sort((p, n) => p.date < n.date);

  return {
    asObject,
    asArray
  };
}

export function add(key = error("'key' is missing!"), value = error("'value' is missing!")) {
  const isKeyExist = localStorage.getItem(key);
  if (!isKeyExist) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  return false;
}

export function update(key = error("'key' is missing!"), value = error("'value' is missing!")) {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}

export function remove(key = error("'key' is missing!")) {
  const removableItem = localStorage.getItem(key);
  if (removableItem) {
    localStorage.removeItem(key);
    return { key, value: removableItem };
  }
  return null;
}
export function removeByGroup(group = error("'group key' is missing!")) {
  const removedItems = state()
    .asArray.filter(({ key }) => key.indexOf(group) === 0)
    .map(({ key, value }) => {
      localStorage.removeItem(key);
      return { key, value };
    });

  return removedItems.length ? removedItems : null;
}

export function clear() {
  localStorage.clear();
}
