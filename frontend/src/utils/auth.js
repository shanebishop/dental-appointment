function genBasicAuth(email, password) {
  return btoa(`${email}:${password}`)
}

export default genBasicAuth;
