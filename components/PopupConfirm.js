import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(selector) {
    super(selector);
    console.log(document.querySelector(selector));
    this._confirmBtn = document.querySelector(selector).querySelector(".popup__button");
    // this._handleConfirmClick = handleConfirmClick;
  }

  onOk(callback) {
    this._confirmBtn.addEventListener("click", () => {
      callback().then(() => this.close());
    });
  }
}
