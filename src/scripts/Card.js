class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _removeCard(event) {
    event.stopPropagation();
    this._element.remove();
  }

  _toggleLike(event) {
    event.stopPropagation();

    event.target.classList.toggle('element__footer-button_active');
  }

  _setEventListeners() {
    const buttonRemove = this._element.querySelector('.element__remove-button');
    const buttonLike = this._element.querySelector('.element__footer-button');

    this._element.addEventListener('click', () => this._handleCardClick(this._image, this._title));
    buttonLike.addEventListener('click', (event) => this._toggleLike(event));
    buttonRemove.addEventListener('click', (event) => this._removeCard(event));
  };

  generateCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector('.element__image');
    const elementName = this._element.querySelector('.element__footer-text');

    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementName.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
