import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    return this._popupForm.elements;
  }

  setEventListeners(event) {
    this._popupForm.addEventListener('submit', (event) => {
      const values = this._getInputValues();
      this._handleFormSubmit(values, event);
    })

    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}
