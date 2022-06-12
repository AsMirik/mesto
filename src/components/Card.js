class Card {
  constructor({data, templateSelector, handleCardClick, handleCardRemove, canRemove, isLiked, toggleCardLike}) {
    this._templateSelector = templateSelector;
    this._id = data._id;
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._canRemove = canRemove;
    this._isLiked = isLiked;
    this._toggleCardLike = toggleCardLike;

    this._buttonRemove = null;
    this._buttonLike = null;
    this._likesCounter = null;
  }

  _settings = {
    imageSelector: '.element__image',
    nameSelector: '.element__footer-text',
    buttonRemoveSelector: '.element__remove-button',
    buttonLikeSelector: '.element__footer-button',
    buttonLikeActiveClass: 'element__footer-button_active',
    likeCounterSelector: '.element__footer-counter',
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    if (!this._canRemove) {
      cardElement.querySelector(this._settings.buttonRemoveSelector).remove();
    }

    if (this._isLiked) {
      cardElement.querySelector(this._settings.buttonLikeSelector).classList.add(this._settings.buttonLikeActiveClass);
    }

    return cardElement;
  }

  _removeCard(event) {
    event.stopPropagation();
    this._handleCardRemove(this._id, this._removeCardElement);
  }

  _removeCardElement = () => {
    this._element.remove();
  }

  _toggleLike(event) {
    event.stopPropagation();

    this._toggleCardLike(this._id, this._isLiked, this._toggleLikeCard);
  }

  _toggleLikeCard = (result) => {
    if (this._isLiked) {
      this._buttonLike.classList.remove(this._settings.buttonLikeActiveClass);
    } else {
      this._buttonLike.classList.add(this._settings.buttonLikeActiveClass);
    }

    this._isLiked = !this._isLiked;
    this._likes = result.likes;

    this.renderLikesCounter();
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => this._handleCardClick(this._image, this._title));

    this._buttonLike.addEventListener('click', (event) => this._toggleLike(event));

    if (this._canRemove) {
      this._buttonRemove.addEventListener('click', (event) => this._removeCard(event));
    }
  };

  generateCard() {
    this._element = this._getTemplate();

    const elementImage = this._element.querySelector(this._settings.imageSelector);
    const elementName = this._element.querySelector(this._settings.nameSelector);

    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementName.textContent = this._title;

    // Сохраняем изменяемые элементы в this
    this._buttonRemove = this._element.querySelector(this._settings.buttonRemoveSelector);
    this._buttonLike = this._element.querySelector(this._settings.buttonLikeSelector);
    this._likesCounter = this._element.querySelector(this._settings.likeCounterSelector);

    // Для обновления изменяемых элементов используем отдельные методы
    this.renderLikesCounter();

    this._setEventListeners();

    return this._element;
  }

  renderLikesCounter() {
    this._likesCounter.textContent = this._likes.length;
  }
}

export { Card };
