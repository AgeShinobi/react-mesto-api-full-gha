export const BASE_URL = 'https://api.mesto.ageshinobi.nomoredomains.rocks';

function makeRequest(url, method, body, token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (token !== undefined) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }
  
  return fetch(`${BASE_URL}${url}`, config)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
      return res.json();
    });
}

// Параметры запроса для регистрации
export const register = (email, password) => {
  return makeRequest('/signup', 'POST', { email, password })
}
// Параметры запроса для авторизации
export const authorize = (email, password) => {
  return makeRequest('/signin', 'POST', { email, password })
}
//Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта
export const checkToken = (token) => {
  return makeRequest('/users/me', 'GET', undefined, token)
}