class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers['authorization'];
  }

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getData() {
    return Promise.all([ this.getUserInfo(), this.getCards()]);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: {authorization: this._token},
    })
      .then(this._getResponse);
  }

  editAvatar(avatar) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatar})
    })
      .then(this._getResponse);
  }

  editUserInfo(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._getResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {authorization: this._token},
    })
      .then(this._getResponse);
  }

  setLike(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._getResponse);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._getResponse);
    }
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
    }).then(this._getResponse);
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._getResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '6a959611-dfd2-455f-b813-ecc56a298ccb',
    'Content-Type': 'application/json'
  }
});

export default api;


