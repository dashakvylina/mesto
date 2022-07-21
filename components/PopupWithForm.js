import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector(selector).querySelector("form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    const values = {};
    Array.from(this._inputList).forEach((el) => (values[el.name] = el.value));

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
