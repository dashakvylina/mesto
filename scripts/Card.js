import { openPopup } from "./index.js";
import { imageViewPopup } from "./index.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
    //     <img src="./Images/Group.png" class="element__trash-img" alt="Корзина" />
    //   </button>
    //   <img class="element__img" />
    //   <div class="element__group">
    //     <h2 class="element__text"></h2>
    //     <button class="element__like-btn" type="button"></button>
    //   </div>
    // </div>`
    this._setEventListeners();

    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__img").src = this._link;
    this._element.querySelector(".element__img").alt = this._name;
    return this._element;
  }

  _handleLikeClick(evt) {
    const btn = evt.target;
    btn.classList.toggle("element__like-btn_active");
  }

  _handleDeleteCard(ev) {
    const card = ev.target.closest(".element");
    card.remove();
    this._element = null;
  }

  _handleImgClick() {
    const imgPopup = document.querySelector(".popup__image");
    const imgPopupText = document.querySelector(".popup__image-text");
    imgPopup.src = this._link;
    imgPopup.alt = this._name;
    imgPopupText.textContent = this._name;
    openPopup(imageViewPopup);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", this._handleLikeClick);
    this._element
      .querySelector(".element__trash-btn")
      .addEventListener("click", (ev) => this._handleDeleteCard(ev));
    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => this._handleImgClick());
  }
}