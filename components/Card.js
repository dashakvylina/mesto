import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "fbe58520-8678-4121-ac42-d1be94fdc956",
    "Content-Type": "application/json",
  },
});

export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    templateSelector,
    handleCardClick,
    userId,
    handleDelete
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._id = _id;
    this._userId = userId;
    this._owner = owner;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _showCurrentLikes(count) {
    this._likeSum.textContent = count;
  }

  generateCard() {
    const isLiked = this._likes.some((like) => like._id === this._userId);
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".element__like-btn");
    this._trashBtn = this._element.querySelector(".element__trash-btn");
    const isOwnerCard = this._owner._id === this._userId;

    if (!isOwnerCard) {
      this._trashBtn.remove();
    }
    //   ` <div class="element">
    //   <button class="element__trash-btn">
    //     <img src="./images/Group.png" class="element__trash-img" alt="Корзина" />
    //   </button>
    //   <img class="element__img" />
    //   <div class="element__group">
    //     <h2 class="element__text"></h2>
    //     <button class="element__like-btn" type="button"></button>
    //   </div>
    // </div>`
    this._setEventListeners();

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._showCurrentLikes(this._likes.length);

    if (isLiked) {
      this._likeBtn.classList.add("element__like-btn_active");
    } else {
      this._likeBtn.classList.remove("element__like-btn_active");
    }
    return this._element;
  }

  _handleLikeClick(evt) {
    const isLiked = this._likes.some((like) => like._id === this._userId);

    if (isLiked) {
      api.deleteLike(this._id).then((card) => {
        this._likeBtn.classList.remove("element__like-btn_active");
        this._likes = card.likes;
        this._showCurrentLikes(card.likes.length);
      });
    } else {
      api.setLike(this._id).then((card) => {
        this._likeBtn.classList.add("element__like-btn_active");
        this._likes = card.likes;
        this._showCurrentLikes(card.likes.length);
      });
    }
  }

  _handleDeleteCard() {
    this._handleDelete(this._id);
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".element__img");
    this._cardText = this._element.querySelector(".element__text");
    this._likeSum = this._element.querySelector(".element__like-sum");
    this._likeBtn.addEventListener("click", (ev) => this._handleLikeClick(ev));
    this._trashBtn.addEventListener("click", (ev) => this._handleDeleteCard(ev));
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }
}
