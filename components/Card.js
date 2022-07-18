export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
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
    return this._element;
  }

  _handleLikeClick(evt) {
    const btn = evt.target;
    btn.classList.toggle("element__like-btn_active");
  }

  _handleDeleteCard(ev) {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(".element__img");
    this._cardText = this._element.querySelector(".element__text");
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".element__trash-btn")
      .addEventListener("click", (ev) => this._handleDeleteCard(ev));

    this._cardImage.addEventListener("click", () => this._handleCardClick());
  }
}
