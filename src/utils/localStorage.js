export class LocalStorage {
    static setItem(item, value) {
        localStorage.setItem(item, value);
    }

    static removeItem(item) {
        localStorage.removeItem(item);
    }

    static getItem(item) {
        return localStorage.getItem(item);
    }
}
