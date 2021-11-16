export const ROOT_URL = 'http://54.217.117.68:8000/api/v1/protopost'


export const API_HEADERS_UNAUTHORIZED = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
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