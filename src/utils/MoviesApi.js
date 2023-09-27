const ApiMovies = (options) => {
  const { baseUrl } = options;

  const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
  };

  const request = (url, options) => {
    return fetch(`${baseUrl}${url}`, options)
      .then(checkResponse);
  };

  const getMovies = () => {
    return request('/');
  };

  return {
    getMovies
  };
};

const apiMovies = ApiMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default apiMovies;