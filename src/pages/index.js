import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const buttonPlaceAdd = document.querySelector('.profile__add-button');
const popupPlaceAdd = document.querySelector('#popupAddPlace');
const popupPlaceAddForm = popupPlaceAdd.querySelector('.popup__form');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('#popupEditProfile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupNameInput = profilePopup.querySelector('#name');
const profilePopupWorkInput = profilePopup.querySelector('#work');

const popupPlaceAddFormValidator = new FormValidator(validationSettings, popupPlaceAddForm);
const profilePopupFormValidator = new FormValidator(validationSettings, profilePopupForm);

const popupAddPlace = new PopupWithForm('#popupAddPlace', submitPopupPlaceAdd);
popupAddPlace.setEventListeners();

const popupProfile = new PopupWithForm('#popupEditProfile', submitProfilePopup);
popupProfile.setEventListeners();

const popupPreview = new PopupWithImage('#popupPreview');
popupPreview.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = generateCard(item)
    cardsSection.addItem(card);
  }
}, '.elements');

const user = new UserInfo({nameSelector: '.profile__name-text', infoSelector: '.profile__activity'});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'f7ca521b-6071-408d-9596-93540c9b5ffb',
    'Content-Type': 'application/json'
  }
});

function handleCardClick(imageSrc, titleText) {
  popupPreview.open(imageSrc, titleText);
}

function startPage() {
  cardsSection.renderedItems();

  popupPlaceAddFormValidator.enableValidation();
  profilePopupFormValidator.enableValidation();

  api.getUserInfo().then((result) => {
    user.setUserInfo(result.name, result.about);
  });
}

function generateCard(data) {
  const card = new Card(data, '#newPost', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function openPopupPlaceAdd() {
  popupPlaceAddFormValidator.disableSubmitButton();
  popupPlaceAddFormValidator.resetErrors();

  popupAddPlace.open();
}

function submitPopupPlaceAdd(formData) {
  cardsSection.addItem(generateCard(formData));
  popupAddPlace.close();
}

function openProfilePopup() {
  profilePopupFormValidator.resetErrors();

  const userData = user.getUserInfo();

  profilePopupNameInput.value = userData.name;
  profilePopupWorkInput.value = userData.info;

  popupProfile.open();
}

function submitProfilePopup(formElements) {
  user.setUserInfo(formElements.name, formElements.work);

  popupProfile.close();
}

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);

profileEditButton.addEventListener('click', openProfilePopup);

startPage();
