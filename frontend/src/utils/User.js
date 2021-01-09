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
    // To avoid exception handling in call sites, return false if user is not
    // logged in
    if (!User.isLoggedIn()) {
      return false;
    }

    const userData = User.getRootData();
    return userData.user.is_staff;
  }

  static isLoggedIn() {
    // WARNING: This check is insecure, since it will grant users access if they manually
    // set user-token and user-data to any "truthy" values in localStorage
    return localStorage.getItem(User.USER_TOKEN_KEY) && localStorage.getItem(User.ROOT_USER_DATA_KEY);
  }

  static getDisplayName() {
    if (!User.isLoggedIn()) {
      return 'Not logged in';
    }

    const userData = User.getRootData();
    const firstName = userData.user.first_name;
    const surname = userData.user.last_name;

    return (firstName && surname) ? `${firstName} ${surname}` : userData.user.username;
  }
}

export default User;
