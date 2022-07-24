export default class Api {
  constructor(options) {
    this._options = options;
  }

  _fetch(url, method, body) {
    return fetch(`${this._options.baseUrl}${url}`, {
      headers: this._options.headers,
      method: method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => res)
      .catch((error) => {
        console.log(error);
      });
  }

  fetchUser() {
    return this._fetch("/users/me", "GET");
  }

  fetchCards() {
    return this._fetch("/cards", "GET");
  }

  setLike(id) {
    return this._fetch(`/cards/${id}/likes`, "PUT");
  }

  deleteLike(id) {
    return this._fetch(`/cards/${id}/likes`, "DELETE");
  }

  deleteCard(id) {
    return this._fetch(`/cards/${id}`, "DELETE");
  }

  editAvatar(link) {
    return this._fetch(`/users/me/avatar`, "PATCH", {
      avatar: link,
    });
  }

  editProfile(name, about) {
    return this._fetch(`/users/me`, "PATCH", {
      name,
      about,
    });
  }

  createCard(name, link) {
    return this._fetch(`/cards`, "POST", {
      name,
      link,
    });
  }
}
