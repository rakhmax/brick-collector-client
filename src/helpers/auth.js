function isAuthentificated() {
  return !!localStorage.getItem('accessString');
}

export default isAuthentificated;
