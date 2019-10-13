export class Api {
  constructor({ apiRoot }) {
    this.apiRoot = apiRoot;
  }

  async createNewUser(payload) {
    const url = `${this.apiRoot}/api/user/register`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API ERROR: ${response.statusText}`);
    }

    return await response.json();
  }

  async userToken(payload) {
    console.log('userToken in API');
    const url = `${this.apiRoot}/api/user/login`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API ERROR: ${response.statusText}`);
    }

    return await response.json();
  }
}
