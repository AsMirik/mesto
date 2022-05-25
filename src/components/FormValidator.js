class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.closest(this._settings.fieldSelector).querySelector(this._settings.errorElementSelector);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorMessageActiveClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.closest(this._settings.fieldSelector).querySelector(this._settings.errorElementSelector);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorMessageActiveClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _setEventListeners() {
    this.disableSubmitButton();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        if (this._hasInvalidInput()) {
          this.disableSubmitButton();
        } else {
          this.enableSubmitButton();
        }
      });
    });
  }

  disableSubmitButton = () => {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  enableSubmitButton = () => {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  resetErrors() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
