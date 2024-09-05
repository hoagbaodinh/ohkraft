// Lay du lieu tu local storage
export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Luu du lieu tu local storage
export const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
