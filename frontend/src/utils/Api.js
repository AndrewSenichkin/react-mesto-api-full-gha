// Cоздание класса утилиты Api, для описания работы логики, обращения к Api
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  // Формирую запрос на сервер, если прошел не удачно, возвращаем ошибку!
  _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    // Если ошибка пришла, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод загрузки информации о пользователе с сервера
  getAboutUserInfo(forms) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
    },
      body: JSON.stringify(forms)
    })
    .then(res => this._handleSendingRequest(res)) 
  }

  // Метод загрузки карточек с сервера
    getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
    },
    })
    .then(res => this._handleSendingRequest(res)) 
  }

  // Метод редактирование профиля
  async editProfileUserInfo(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers:this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    return this._handleSendingRequest(response)
  }

  // Метод добавления новой карточки с сервера
  async addNewCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers:this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })

    return this._handleSendingRequest(response)
  }

  // Метод постановки лайка карточки
   async addLike(cardId) {
     const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
       method: "PUT",
       headers: this._headers,
     })
     return this._handleSendingRequest(response)
   }

  // Метод постановки и снятия лайка с карточки
  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    return this._handleSendingRequest(response)
  }

  // Метод удаления карточки
  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    return this._handleSendingRequest(response)
  }

  // Метод обновления аватара пользователя
  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._handleSendingRequest(response)
  }
}

const api = new Api({
   baseUrl: "https://api.kniws.nomoredomains.rocks",
   //baseUrl: "http://localhost:3000",
   headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
})

export default api;
