import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'ra-jwt';
export const EMAIL_KEY = 'ra-email';

export class Auth {
  constructor({ api, storage = window.localStorage }) {
    this.api = api;
    this.storage = storage;
    this.decoded = null;
  }

  getEmail = () => {
    return this.storage.getItem(EMAIL_KEY);
  };

  isLoggedIn = () => {
    return this.getToken() != null;
  };

  getToken = () => {
    // This method gets called multiple times so we cache the result
    // to avoid having to decode the same token multiple times
    if (this.decoded) {
      return this.decoded;
    }

    const apiToken = this.getRawToken();

    if (apiToken == null) {
      return null;
    }

    try {
      const decoded = jwtDecode(apiToken);

      if (decoded) {
        this.decoded = decoded;
        return decoded;
      }
    } catch (error) {
      console.error(`Cannot decode JWT`, error);
    }

    return null;
  };

  getRawToken = () => {
    return this.storage.getItem(TOKEN_KEY);
  };

  signup = payload => this.api.createNewUser(payload);

  login = async payload => {
    const { email } = payload;
    const { jwt } = await this.api.userToken(payload);
    this.storage.setItem(TOKEN_KEY, jwt);
    this.storage.setItem(EMAIL_KEY, email);
  };

  logout = () => {
    this.clearLocalStorage();
  };

  clearLocalStorage = () => {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(EMAIL_KEY);
  };
}
