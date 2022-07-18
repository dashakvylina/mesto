import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imgText = this._popup.querySelector(".popup__image-text");
    this._img = this._popup.querySelector(".popup__image");
  }

  open(src, name) {
    this._imgText.textContent = name;
    this._img.src = src;
    this._img.alt = name;
    super.open();
  }
}
