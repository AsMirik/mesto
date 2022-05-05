const popupPreview = document.querySelector('#popupPreview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
const popupPreviewImage = popupPreview.querySelector('.popup__preview-image');
const popupPreviewText = popupPreview.querySelector('.popup__preview-text');
const popupPreviewOverlay = popupPreview.querySelector('.popup__overlay');

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

    document.addEventListener('keydown', this._handleClosePopupByEsc);

    popupPreviewImage.alt = this._title;
    popupPreviewImage.src = this._image;
    popupPreviewText.textContent = this._title;
    popupPreview.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupPreview.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleClosePopupByEsc);
  }

  // Используем стрелочную функцию, чтобы не терялся this при addEventListener
  _handleClosePopupByEsc = (event) => {
    if (event.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _removeCard(event) {
    event.stopPropagation();

    const element = event.target.closest('.element');

    element.remove();
  }

  _toggleLike(event) {
    event.stopPropagation();

    event.target.classList.toggle('element__footer-button_active');
  }

  _setEventListeners() {
    const buttonRemove = this._element.querySelector('.element__remove-button');
    const buttonLike = this._element.querySelector('.element__footer-button');

    this._element.addEventListener('click', (event) => this._handleOpenPopup(event));
    buttonLike.addEventListener('click', (event) => this._toggleLike(event));
    buttonRemove.addEventListener('click', (event) => this._removeCard(event));
    popupPreviewOverlay.addEventListener('click', () => this._handleClosePopup());

    popupPreviewCloseButton.addEventListener('click', () => this._handleClosePopup());
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
