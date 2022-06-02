export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _request = (url, method, body) => {
    return fetch(this._baseUrl + url, {
      headers: this._headers,
      method: method,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _get = (url) => {
    return this._request(url, 'GET');
  };

  _post = (url, body) => {
    return this._request(url, 'POST', body);
  };

  _patch = (url, body) => {
    return this._request(url, 'PATCH', body);
  };

  _put = (url, body) => {
    return this._request(url, 'PUT', body);
  };

  _delete = (url) => {
    return this._request(url, 'DELETE');
  };

  getUserInfo = () => {
    return this._get('/users/me');
  };

  getInitialCards = () => {
    return this._get('/cards');
  }
}
