import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._confirmBtn = document.querySelector(selector).querySelector(".popup__button");
    this._form = document.querySelector(selector).querySelector("form");
    this._handleConfirmClick = callback;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      if (this._card) {
        this._handleConfirmClick(this._card._id)
          .then(() => {
            this._card.remove();
            this.close();
          })
          .catch((err) => console.log(err));
      }
    });
  }
}
