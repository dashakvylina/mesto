import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = document.querySelector(selector).querySelector("form");
  }

  _getInputValues() {
    const values = {};
    Array.from(this._form.querySelectorAll(".form__input")).forEach(
      (el) => (values[el.name] = el.value)
    );

    return values;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      this._callback(this._getInputValues());
      this.close();
    });
  }
}
