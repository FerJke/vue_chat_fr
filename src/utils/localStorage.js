/**
 *
 * @param { String } name
 */
function readLocalStorageItem(name) {
  return localStorage.getItem(name);
}

/**
 *
 * @param { String } name
 * @param { String } data
 */
function setItemToLocalStorage(name, data) {
  localStorage.setItem(name, data);
}

/**
 *
 * @param { String } name
 */
function removeLocalStorageItem(name) {
  localStorage.removeItem(name);
}

export {
  readLocalStorageItem,
  setItemToLocalStorage,
  removeLocalStorageItem,
};
