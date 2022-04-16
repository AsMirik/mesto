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

const newPostTemplate = document.querySelector('#newPost').content;
const elementsSection = document.querySelector('.elements');
const previewPopup = document.querySelector('#previewPopup');
const closePreviewButton = previewPopup.querySelector('.popup__close-button');

const addPlaceButton = document.querySelector('.profile__add-button');
const popupPlaceAdd = document.querySelector('#addPlacePopup');
const formPopupPlaceAdd = popupPlaceAdd.querySelector('.popup__form');
const closeButtonPlaceAdd = popupPlaceAdd.querySelector('.popup__close-button');
const placeNameInput = popupPlaceAdd.querySelector('#placeName');
const placeLinkInput = popupPlaceAdd.querySelector('#placeLink');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name-text');
const profileActivity = document.querySelector('.profile__activity');

const profilePopup = document.querySelector('#editProfilePopup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');
const profilePopupNameInput = profilePopup.querySelector('#name');
const profilePopupWorkInput = profilePopup.querySelector('#work');

function createPlace(name, srcPlace) {
  const element = newPostTemplate.querySelector('.element').cloneNode(true);
  const likeButton = element.querySelector('.element__footer-button');
  const removeButton = element.querySelector('.element__remove-button');
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__footer-text');

  elementImage.src = srcPlace;
  elementName.textContent = name;

  likeButton.addEventListener('click', toggleLike);
  removeButton.addEventListener('click', removePlace);
  elementImage.addEventListener('click', openPopupPreview);

  return element;
}

function startPage() {
  for (let i = 0; i < initialCards.length; i++) {
    const newPlace = createPlace(initialCards[i].name, initialCards[i].link);

    elementsSection.prepend(newPlace);
  }
}


function toggleLike(event) {
  event.target.classList.toggle('element__footer-button_active');
}

function removePlace(event) {
  event.target.closest('.element').remove();
}

function openPopupPreview(event) {
  const src = event.target.src;
  const name = event.target.closest('.element').querySelector('.element__footer-text').textContent;
  const previewImage = previewPopup.querySelector('.popup__preview-image');
  const previewText = previewPopup.querySelector('.popup__preview-text');

  previewImage.src = src;
  previewText.textContent = name;

  openPopup(previewPopup);
}

function closePopupPreview() {
  closePopup(previewPopup);
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function openPopupPlaceAdd() {
  // Очищаем инпуты при открытии, т.к. при закрытии из-за transition видно как поля очищаются.
  placeNameInput.value = '';
  placeLinkInput.value = '';

  openPopup(popupPlaceAdd);
}

function closePopupPlaceAdd() {
  closePopup(popupPlaceAdd);
}

function submitPopupPlaceAdd(event) {
  event.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const newPlace = createPlace(name, link);
  elementsSection.prepend(newPlace);

  closePopupPlaceAdd();
}


function openProfilePopup() {
  openPopup(profilePopup);

  profilePopupNameInput.value = profileName.textContent;
  profilePopupWorkInput.value = profileActivity.textContent;
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

closePreviewButton.addEventListener('click', closePopupPreview);

addPlaceButton.addEventListener('click', openPopupPlaceAdd);
closeButtonPlaceAdd.addEventListener('click', closePopupPlaceAdd);
formPopupPlaceAdd.addEventListener('submit', submitPopupPlaceAdd);

profilePopupForm.addEventListener('submit', submitProfilePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profileEditButton.addEventListener('click', openProfilePopup);

startPage();
