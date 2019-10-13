import { auth } from './auth';

export const post = async (path, payload) => {
  const url = `${auth.api.apiRoot}/api/${path}`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'auth-token': auth.getRawToken()
    }
  });

  if (!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`);
  }

  return await response.json();
};

export const get = async path => {
  const url = `${auth.api.apiRoot}/api/${path}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': auth.getRawToken()
    }
  });

  if (!response.ok) {
    throw new Error(`API ERROR: ${response.statusText}`);
  }

  return await response.json();
};
