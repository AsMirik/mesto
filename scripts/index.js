import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  errorElementSelector: '.popup__input-error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorMessageActiveClass: 'popup__input-error_active',
};

const popupAddPlace = new PopupWithForm('#popupAddPlace', submitPopupPlaceAdd);
popupAddPlace.setEventListeners();

const popupProfile = new PopupWithForm('#popupEditProfile', submitProfilePopup);
popupProfile.setEventListeners();

const popupPreview = new PopupWithImage('#popupPreview');
popupPreview.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#newPost', handleCardClick);
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, '.elements');

const buttonPlaceAdd = document.querySelector('.profile__add-button');
const popupPlaceAdd = document.querySelector('#popupAddPlace');
const popupPlaceAddForm = popupPlaceAdd.querySelector('.popup__form');
const popupPlaceAddFormValidator = new FormValidator(validationSettings, popupPlaceAddForm);

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name-text');
const profileActivity = document.querySelector('.profile__activity');

const profilePopup = document.querySelector('#popupEditProfile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupFormValidator = new FormValidator(validationSettings, profilePopupForm);
const profilePopupNameInput = profilePopup.querySelector('#name');
const profilePopupWorkInput = profilePopup.querySelector('#work');

function handleCardClick(imageSrc, titleText) {
  popupPreview.open(imageSrc, titleText);
}

function startPage() {
  cardsSection.renderedItems();

  popupPlaceAddFormValidator.enableValidation();
  profilePopupFormValidator.enableValidation();
}

function openPopupPlaceAdd() {
  popupPlaceAddFormValidator.disableSubmitButton();
  popupPlaceAddFormValidator.resetErrors();

  popupAddPlace.open();
}

function submitPopupPlaceAdd(formElements, event) {
  event.preventDefault();
  const data = {
    name: formElements.placeName.value,
    link: formElements.placeLink.value
  };

  const card = new Card(data, '#newPost', handleCardClick);
  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
  popupAddPlace.close();
}

function openProfilePopup() {
  profilePopupFormValidator.resetErrors();

  profilePopupNameInput.value = profileName.textContent;
  profilePopupWorkInput.value = profileActivity.textContent;

  popupProfile.open();
}

function submitProfilePopup(formElements, event) {
  event.preventDefault();

  profileName.textContent = formElements.name.value;
  profileActivity.textContent = formElements.work.value;

  popupProfile.close();
}

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);

profileEditButton.addEventListener('click', openProfilePopup);

startPage();
