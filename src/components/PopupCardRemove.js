import Popup from './Popup.js';

export default class PopupCardRemove extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__button');
    this._handleSubmit = handleSubmit;
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners(event) {
    this._submitButton.addEventListener('click', () => {
      this._handleSubmit(this._cardId, this._cardElement);
    });

    super.setEventListeners();
  }
}
