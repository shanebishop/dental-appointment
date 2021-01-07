/* global localStorage */

export function genBasicAuth(email, password) {
  return btoa(`${email}:${password}`)
}

export function authTokenAxiosConfig() {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('user-token')}`,
    }
  };
}

export function basicAuthAxiosConfig(username, password) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${genBasicAuth(username, password)}`,
    }
  };
}
