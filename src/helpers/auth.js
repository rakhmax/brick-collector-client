class AuthHelper {
  tokens = JSON.parse(localStorage.getItem('authData')) || {};

  decodedToken = this.tokens.accessToken && JSON.parse(atob(this.tokens.accessToken.split('.')[1]));

  getUserId() {
    return this.decodedToken.userId;
  }

  getUsername() {
    return this.decodedToken.username;
  }

  getAccessToken() {
    return this.tokens.accessToken;
  }

  getRefreshToken() {
    return this.tokens.refreshToken;
  }

  isAuthentificated() {
    return !!this.tokens.accessToken;
  }

  setTokens(tokens) {
    localStorage.setItem('authData', JSON.stringify(tokens));
    this.tokens = tokens;
  }

  removeTokens() {
    localStorage.removeItem('authData');
    this.tokens = null;
  }
}

export default AuthHelper;
