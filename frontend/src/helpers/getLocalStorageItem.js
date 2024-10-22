export const getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);

    return item ? item : null
}