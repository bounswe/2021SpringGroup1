export const ROOT_URL = 'http://3.249.82.166:8000/api/v1/protopost'

export const API_HEADERS_UNAUTHORIZED = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const API_HEADERS_BEARER_TOKEN = authToken => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `token ${authToken}`,
  };
};

export const API_HEADERS_UNAUTHORIZED_WITH_MULTIPART = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};
export const API_HEADERS_UNAUTHORIZED_WITH_SSR = (formData) => {
  return {
    Accept: 'application/json',
    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  }
};
export const LOGIN_API_HEADERS_UNAUTHORIZED = {
};