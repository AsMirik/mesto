import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const cardsSection = new Section('.elements');

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
  popupPlaceAddFormValidator.enableValidation();
  profilePopupFormValidator.enableValidation();

  // Получаем карточки
  api.getInitialCards().then((result) => {
    cardsSection.clear();

    result.forEach((item) => {
      const card = generateCard(item);
      cardsSection.addItem(card);
    });
  });

  // Получаем информацию о пользователе
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
  api.addNewCard(formData).then((result) => {
    cardsSection.addItem(generateCard(result));

    popupAddPlace.close();
  })
}

function openProfilePopup() {
  profilePopupFormValidator.resetErrors();

  const userData = user.getUserInfo();

  profilePopupNameInput.value = userData.name;
  profilePopupWorkInput.value = userData.info;

  popupProfile.open();
}

function submitProfilePopup(formElements) {
  // Редактирование профиля
  api.editUserInfo({name: formElements.name, about: formElements.work})
    .then((result) => {
      user.setUserInfo(result.name, result.about)
      popupProfile.close();
    })
}

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);

profileEditButton.addEventListener('click', openProfilePopup);

startPage();
