const BASE_URL = 'http://api.diploma-mainx.nomoredomainsicu.ru';

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

async function request(url, method = 'GET', body = null, token = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, options);
  return getResponseData(response);
}

export async function registration(username, email, password) {
  return request('/signup', 'POST', { name: username, email, password });
}

export async function authorization(email, password) {
  return request('/signin', 'POST', { email, password });
}

export async function getUserData(token) {
  return request('/users/me', 'GET', null, token);
}

export async function updateUserInfo(username, email, token) {
  return request('/users/me', 'PATCH', { name: username, email }, token);
}

export async function getMovies(token) {
  return request('/movies', 'GET', null, token);
}

export async function addMovie(data, token) {
  const body = {
    country: data.country,
    director: data.director,
    duration: data.duration,
    description: data.description,
    year: data.year,
    image: `https://api.nomoreparties.co${data.image.url}`,
    trailerLink: data.trailerLink,
    thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
    movieId: data.id,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
  };

  return request('/movies', 'POST', body, token);
}

export async function deleteMovie(movieId, token) {
  return request(`/movies/${movieId}`, 'DELETE', null, token);
}