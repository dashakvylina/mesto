export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //массив данных
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const el = this._renderer(item); // вызываем renderer, передав item
      this.addItem(el);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
