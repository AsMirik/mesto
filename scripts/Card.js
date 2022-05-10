import { openPopup, closePopup } from './index.js';

const popupPreview = document.querySelector('#popupPreview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
const popupPreviewOverlay = popupPreview.querySelector('.popup__overlay');
const popupPreviewImage = popupPreview.querySelector('.popup__preview-image');
const popupPreviewText = popupPreview.querySelector('.popup__preview-text');

class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._title = data.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenPopup(event) {
    event.stopPropagation();

    popupPreviewImage.alt = this._title;
    popupPreviewImage.src = this._image;
    popupPreviewText.textContent = this._title;

    openPopup(popupPreview);
  }

  _handleClosePopup() {
    closePopup(popupPreview);
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

    this._element.addEventListener('click', (event) => this._handleOpenPopup(event));
    popupPreviewCloseButton.addEventListener('click', () => this._handleClosePopup());
    popupPreviewOverlay.addEventListener('click', () => this._handleClosePopup());
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
export { popupPreview };
