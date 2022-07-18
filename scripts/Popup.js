export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._body = document.querySelector("body");
  }

  open() {
    this._popup.classList.add("popup_visible");
    this._body.addEventListener("keydown", (ev) => this._handleEscClose(ev));
  }

  close() {
    this._popup.classList.remove("popup_visible");
    this._body.removeEventListener("keydown", (ev) => this._handleEscClose(ev));
  }

  _handleEscClose(ev) {
    const isOpen = this._popup.classList.contains("popup_visible");
    if (isOpen && ev.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close-btn").addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_visible")) {
        this.close();
      }
    });
  }
}
