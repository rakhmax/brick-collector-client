function isAuthentificated() {
  return !!localStorage.getItem('creds');
}

export default isAuthentificated;
