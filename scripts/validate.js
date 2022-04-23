function showInputError(inputElement, errorMessage, settings) {
  const errorElement = inputElement.closest(settings.fieldSelector).querySelector(settings.errorElementSelector);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorMessageActiveClass);
}

function hideInputError(inputElement, settings) {
  const errorElement = inputElement.closest(settings.fieldSelector).querySelector(settings.errorElementSelector);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorMessageActiveClass);
  errorElement.textContent = '';
}

function checkInputValidity(inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorElementSelector: '.popup__input-error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorMessageActiveClass: 'popup__input-error_active',
});
