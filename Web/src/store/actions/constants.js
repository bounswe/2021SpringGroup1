export const API_HEADERS_UNAUTHORIZED = {
  Accept: 'application/json',
};

export const LOGIN_API_HEADERS_UNAUTHORIZED = {
};

export const API_HEADERS_BEARER_TOKEN = authToken => {
  return {
    "Accept": 'application/json',
    "Authorization": `Bearer ${authToken}`,
  };
};


export const API_HEADERS_BEARER_TOKEN_MULTIPART = authToken => {
  return {
    "Accept": 'multipart/form-data',
    "Authorization": `Bearer ${authToken}`,
  };
};

export const API_HEADERS_COOKIE = authCookie => {
  return {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Cookie: `${authCookie}`,
  };
};

export const API_HEADERS_BEARER_TOKEN_AND_COOKIE = (authToken, authCookie) => {
  return {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${authToken}`,
    Cookie: `${authCookie}`,
  };
};

