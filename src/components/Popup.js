export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
    this._submitButton = this._popup.querySelector('.popup__button');
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  toggleLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popupOverlay.addEventListener('click', () => this.close());
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}
