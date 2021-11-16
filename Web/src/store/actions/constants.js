export const ROOT_URL = 'http://3.249.82.166:4999/api/v1/protopost'

export const API_HEADERS_UNAUTHORIZED = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin":"*"
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