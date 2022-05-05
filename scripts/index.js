import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Даргавс',
    link: 'https://images.unsplash.com/photo-1631915639186-a136649ec6e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Осетия',
    link: 'https://images.unsplash.com/photo-1612256502976-77709d071cf8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationSettings = {
  formSelector: '.popup__form',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorElementSelector: '.popup__input-error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorMessageActiveClass: 'popup__input-error_active',
};

const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));

const elementsSection = document.querySelector('.elements');

const buttonPlaceAdd = document.querySelector('.profile__add-button');
const popupPlaceAdd = document.querySelector('#popupAddPlace');
const popupPlaceAddForm = popupPlaceAdd.querySelector('.popup__form');
const popupPlaceSubmitButton = popupPlaceAddForm.querySelector('.popup__button');
const popupPlaceAddCloseButton = popupPlaceAdd.querySelector('.popup__close-button');
const popupPlaceAddOverlay = popupPlaceAdd.querySelector('.popup__overlay');
const popupPlaceAddNameInput = popupPlaceAdd.querySelector('#placeName');
const popupPlaceAddLinkInput = popupPlaceAdd.querySelector('#placeLink');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name-text');
const profileActivity = document.querySelector('.profile__activity');

const profilePopup = document.querySelector('#popupEditProfile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profilePopupOverlay = profilePopup.querySelector('.popup__overlay');
const profilePopupNameInput = profilePopup.querySelector('#name');
const profilePopupWorkInput = profilePopup.querySelector('#work');

function startPage() {
  initialCards.forEach((item) => {
    const card = new Card(item, '#newPost');
    const cardElement = card.generateCard();

    elementsSection.prepend(cardElement);
  });

  formsList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    validator.enableValidation();
  });
}

function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEsc);

  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEsc);

  popup.classList.remove('popup_opened');
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
  }
}

function openPopupPlaceAdd() {
  // Очищаем инпуты и блокируем кнопку при открытии,
  // т.к. при закрытии из-за transition видно как поля очищаются.
  popupPlaceAddForm.reset();
  popupPlaceSubmitButton.classList.add('popup__button_disabled');
  popupPlaceSubmitButton.setAttribute('disabled', true);

  openPopup(popupPlaceAdd);
}

function closePopupPlaceAdd() {
  closePopup(popupPlaceAdd);
}

function submitPopupPlaceAdd(event) {
  event.preventDefault();

  const name = popupPlaceAddNameInput.value;
  const link = popupPlaceAddLinkInput.value;
  const data = {
    name: name,
    link: link
  };

  const card = new Card(data, '#newPost');
  const cardElement = card.generateCard();

  elementsSection.prepend(cardElement);

  closePopupPlaceAdd();
}

function openProfilePopup() {
  profilePopupNameInput.value = profileName.textContent;
  profilePopupWorkInput.value = profileActivity.textContent;

  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function submitProfilePopup(event) {
  event.preventDefault();

  profileName.textContent = profilePopupNameInput.value;
  profileActivity.textContent = profilePopupWorkInput.value;

  closeProfilePopup();
}

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);
popupPlaceAddCloseButton.addEventListener('click', closePopupPlaceAdd);
popupPlaceAddOverlay.addEventListener('click', closePopupPlaceAdd);
popupPlaceAddForm.addEventListener('submit', submitPopupPlaceAdd);

profilePopupForm.addEventListener('submit', submitProfilePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profilePopupOverlay.addEventListener('click', closeProfilePopup);
profileEditButton.addEventListener('click', openProfilePopup);

startPage();
