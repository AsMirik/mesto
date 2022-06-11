export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderedItems(items) {
    this.clear();

    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
