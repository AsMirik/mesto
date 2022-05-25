import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners(event) {
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    })

    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}
