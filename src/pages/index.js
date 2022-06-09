import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupCardRemove from '../components/PopupCardRemove.js';
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
const popupEditAvatar = document.querySelector('#popupEditAvatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form');
const avatarEditButton = document.querySelector('.profile__avatar-edit');

const popupPlaceAddFormValidator = new FormValidator(validationSettings, popupPlaceAddForm);
const profilePopupFormValidator = new FormValidator(validationSettings, profilePopupForm);
const popupEditAvatarFormValidator = new FormValidator(validationSettings, popupEditAvatarForm);

const popupAddPlace = new PopupWithForm('#popupAddPlace', submitPopupPlaceAdd);
popupAddPlace.setEventListeners();

const popupProfile = new PopupWithForm('#popupEditProfile', submitProfilePopup);
popupProfile.setEventListeners();

const popupPreview = new PopupWithImage('#popupPreview');
popupPreview.setEventListeners();

const popupRemoveCard = new PopupCardRemove('#popupRemoveCard', submitCardRemove);
popupRemoveCard.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popupEditAvatar', submitPopupAvatar);
popupChangeAvatar.setEventListeners();

const cardsSection = new Section('.elements');

const user = new UserInfo({
  nameSelector: '.profile__name-text',
  infoSelector: '.profile__activity',
  avatarSelector: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'f7ca521b-6071-408d-9596-93540c9b5ffb',
    'Content-Type': 'application/json'
  }
});

function startPage() {
  popupPlaceAddFormValidator.enableValidation();
  profilePopupFormValidator.enableValidation();
  popupEditAvatarFormValidator.enableValidation();

  // Получаем информацию о пользователе
  api.getUserInfo().then((result) => {
    user.setUserInfo(result.name, result.about, result._id);
    user.setAvatar(result.avatar);
    // Получаем карточки
    api.getInitialCards().then((result) => {
      const userData = user.getUserInfo();
      cardsSection.clear();

      result.forEach((cardData) => {
        const canRemove = userData.id === cardData.owner._id;

        const isLiked = cardData.likes.some((like) => {
          return userData.id === like._id;
        });

        const card = createCard(cardData, canRemove, isLiked);
        cardsSection.addItem(card);
      });
    });
  });
}

function createCard(data, canRemove, isLiked) {
  const card = new Card({
    data,
    templateSelector: '#newPost',
    handleCardClick,
    handleCardRemove: confirmCardRemove,
    canRemove,
    isLiked,
    toggleCardLike
  });

  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(imageSrc, titleText) {
  popupPreview.open(imageSrc, titleText);
}

function toggleCardLike(cardId, isLiked) {
  if (isLiked) {
    return api.deleteLike(cardId);
  } else {
    return api.addLike(cardId);
  }
}

function confirmCardRemove(cardId, cardElement) {
  popupRemoveCard.open(cardId, cardElement);
}

function openPopupAvatar() {
  popupChangeAvatar.open();
}

function submitPopupAvatar(formData) {
  api.changeAvatar(formData).then(() => {
    user.setAvatar(formData.avatar);
    popupChangeAvatar.close();
  })
}

function submitCardRemove(cardId, cardElement) {
  api.deleteCard(cardId).then(() => {
    cardElement.remove();
    popupRemoveCard.close();
  });
}

function openPopupPlaceAdd() {
  popupPlaceAddFormValidator.disableSubmitButton();
  popupPlaceAddFormValidator.resetErrors();

  popupAddPlace.open();
}

function submitPopupPlaceAdd(formData) {
  api.addNewCard(formData).then((result) => {
    cardsSection.addItem(createCard(result, true));

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

function submitProfilePopup(formData) {
  // Редактирование профиля
  api.editUserInfo({name: formData.name, about: formData.work})
    .then((result) => {
      user.setUserInfo(result.name, result.about)
      popupProfile.close();
    })
}

avatarEditButton.addEventListener('click', openPopupAvatar)

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);

profileEditButton.addEventListener('click', openProfilePopup);

startPage();
