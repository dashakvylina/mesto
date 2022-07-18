import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(src, name) {
    this._popup.querySelector(".popup__image-text").textContent = name;
    this._popup.querySelector(".popup__image").src = src;
    this._popup.querySelector(".popup__image").alt = name;
    super.open();
  }
}
