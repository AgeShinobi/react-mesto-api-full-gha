class Api {
  constructor({ serverURL, headers }) {
    this.serverURL = serverURL;
    this.headers = headers;
    // this.headers.authorization = `Bearer ${localStorage.jwt}`;
  }


  _getResVerify(res) {
    if (!res.ok) {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
    return res.json()
  }

  _request(url, options) {
    options.headers.authorization = `Bearer ${localStorage.jwt}`;
    return fetch(url, options).then(this._getResVerify)
  }

  // 1. Загрузка информации о пользователе с сервера
  getUserData() {
    return this._request(this.serverURL + "/users/me", {
      headers: this.headers,
    })
  }

  // 2. Загрузка карточек с сервера
  getInitialCards() {
    return this._request(this.serverURL + "/cards", {
      headers: this.headers,
    })
  }

  // 3. Редактирование профиля
  profileEdit = (values) => {
    return this._request(this.serverURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    })
  }

  // 3.1 Смена аватара профиля
  changeAvatar = (data) => {
    return this._request(this.serverURL + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
  }

  // 4. Добавление новой карточки
  createCard = (values) => {
    return this._request(this.serverURL + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        link: values.link,
      })
    })
  }

  // 4.1 Удаление карточки
  deleteCard = (id) => {
    return this._request(this.serverURL + "/cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  // 5. Добавление лайка
  like = (id) => {
    return this._request(this.serverURL + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: this.headers,
    })
  }
  // 5.1 Снятие лайка
  removeLike = (id) => {
    return this._request(this.serverURL + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: this.headers,
    })
  }

  // changeLikeCardStatus(id, isLiked) {
  //   if (!isLiked) {
  //     this.like(id);
  //   } else {
  //     this.removeLike(id);
  //   }
  // }
  
}

//API с персональными данными входа
const api = new Api({
  serverURL: "https://api.mesto.ageshinobi.nomoredomains.rocks",
  // serverURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  }
});

export default api