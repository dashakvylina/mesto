export default class Card {
  constructor(
    { name, link, _id, likes, owner },
    templateSelector,
    handleCardClick,
    userId,
    handleDelete,
    handleDeleteLike,
    handleLike
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
    this._handleDeleteLike = handleDeleteLike;
    this._handleLike = handleLike;
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
      this._handleDeleteLike(this._id)
        .then((card) => {
          this._likeBtn.classList.remove("element__like-btn_active");
          this._likes = card.likes;
          this._showCurrentLikes(card.likes.length);
        })
        .catch((err) => console.log(err));
    } else {
      this._handleLike(this._id)
        .then((card) => {
          this._likeBtn.classList.add("element__like-btn_active");
          this._likes = card.likes;
          this._showCurrentLikes(card.likes.length);
        })
        .catch((err) => console.log(err));
    }
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".element__img");
    this._cardText = this._element.querySelector(".element__text");
    this._likeSum = this._element.querySelector(".element__like-sum");
    this._likeBtn.addEventListener("click", (ev) => this._handleLikeClick(ev));
    this._trashBtn.addEventListener("click", (ev) => this._handleDelete(this));
    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }
}
