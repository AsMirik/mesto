class Card {
  constructor(data, templateSelector, handleCardClick, handleCardRemove, canRemove) {
    this._templateSelector = templateSelector;
    this._id = data._id;
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._canRemove = canRemove;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    if (!this._canRemove) {
      cardElement.querySelector('.element__remove-button').remove();
    }

    return cardElement;
  }

  _removeCard(event) {
    event.stopPropagation();
    this._handleCardRemove(this._id, this._element);
  }

  _toggleLike(event) {
    event.stopPropagation();

    event.target.classList.toggle('element__footer-button_active');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => this._handleCardClick(this._image, this._title));

    const buttonLike = this._element.querySelector('.element__footer-button');
    buttonLike.addEventListener('click', (event) => this._toggleLike(event));

    if (this._canRemove) {
      const buttonRemove = this._element.querySelector('.element__remove-button');
      buttonRemove.addEventListener('click', (event) => this._removeCard(event));
    }
  };

  generateCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector('.element__image');
    const elementName = this._element.querySelector('.element__footer-text');
    const elementLike = this._element.querySelector('.element__footer-counter');

    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementName.textContent = this._title;
    elementLike.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
