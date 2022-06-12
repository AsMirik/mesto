import Api from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupCardRemove from '../components/PopupCardRemove.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { validationSettings } from '../utils/constants.js';
import './index.css';


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

const cardsSection = new Section('.elements', renderCard);

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
  api.getUserInfo()
    .then((result) => {
      user.setUserInfo(result.name, result.about, result._id);
      user.setAvatar(result.avatar);
      // Получаем карточки
      api.getInitialCards()
        .then((result) => {
          cardsSection.renderedItems(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderCard(cardData) {
  const userData = user.getUserInfo();
  const canRemove = userData.id === cardData.owner._id;

  const isLiked = cardData.likes.some((like) => {
    return userData.id === like._id;
  });

  const card = createCard(cardData, canRemove, isLiked);
  cardsSection.addItem(card);
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

function toggleCardLike(cardId, isLiked, toggleLike) {
  if (isLiked) {
    api.deleteLike(cardId).then((result) => {
      toggleLike(result);
    })
  } else {
    api.addLike(cardId).then((result) => {
      toggleLike(result);
    })
  }
}

function confirmCardRemove(cardId, cardElement) {
  popupRemoveCard.open(cardId, cardElement);
}

function openPopupAvatar() {
  popupChangeAvatar.open();
}

function submitPopupAvatar(formData) {
  popupChangeAvatar.toggleLoading(true);

  api.changeAvatar(formData).then(() => {
    user.setAvatar(formData.avatar);
    popupChangeAvatar.close();
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatar.toggleLoading(false);
    });
}

function submitCardRemove(cardId, removeCardElement) {
  return api.deleteCard(cardId).then(() => {
    removeCardElement();

    popupRemoveCard.close();
  })
    .catch((err) => {
      console.log(err);
    });
}

function openPopupPlaceAdd() {
  popupPlaceAddFormValidator.disableSubmitButton();
  popupPlaceAddFormValidator.resetErrors();

  popupAddPlace.open();
}

function submitPopupPlaceAdd(formData) {
  popupAddPlace.toggleLoading(true);

  api.addNewCard(formData).then((result) => {
    cardsSection.addItem(createCard(result, true));

    popupAddPlace.close();
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddPlace.toggleLoading(false);
    });
}

function openProfilePopup() {
  profilePopupFormValidator.resetErrors();

  const userData = user.getUserInfo();

  profilePopupNameInput.value = userData.name;
  profilePopupWorkInput.value = userData.info;

  popupProfile.open();
}

function submitProfilePopup(formData) {
  popupProfile.toggleLoading(true);
  // Редактирование профиля
  api.editUserInfo({name: formData.name, about: formData.work})
    .then((result) => {
      user.setUserInfo(result.name, result.about)

      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.toggleLoading(false);
    });
}

avatarEditButton.addEventListener('click', openPopupAvatar)

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);

profileEditButton.addEventListener('click', openProfilePopup);

startPage();
