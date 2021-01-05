/* global localStorage */

class User {
  static ROOT_USER_DATA_KEY = 'user-data';
  static USER_TOKEN_KEY = 'user-token';

  static getRootData() {
    if (!Object.prototype.hasOwnProperty.call(localStorage, User.ROOT_USER_DATA_KEY)) {
      throw new Error(`${User.ROOT_USER_DATA_KEY} not found in localStorage`);
    }

    return JSON.parse(localStorage.getItem(User.ROOT_USER_DATA_KEY));
  }

  static isStaff() {
    const userData = User.getRootData();
    return userData.user.is_staff;
  }

  static isLoggedIn() {
    // TODO This is insecure
    return localStorage.getItem(User.USER_TOKEN_KEY) && localStorage.getItem(User.ROOT_USER_DATA_KEY);
  }
}

export default User;
