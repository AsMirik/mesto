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

const templateNewPost = document.querySelector('#newPost').content;
const elementsSection = document.querySelector('.elements');

const popupPreview = document.querySelector('#popupPreview');
const popupPreviewCloseButton = popupPreview.querySelector('.popup__close-button');
const popupPreviewOverlay = popupPreview.querySelector('.popup__overlay');
const popupPreviewImage = popupPreview.querySelector('.popup__preview-image');
const popupPreviewText = popupPreview.querySelector('.popup__preview-text');

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

function createPlace(name, srcPlace) {
  const element = templateNewPost.querySelector('.element').cloneNode(true);
  const buttonLike = element.querySelector('.element__footer-button');
  const buttonRemove = element.querySelector('.element__remove-button');
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__footer-text');

  elementImage.src = srcPlace;
  elementImage.alt = name;
  elementName.textContent = name;

  buttonLike.addEventListener('click', toggleLike);
  buttonRemove.addEventListener('click', removePlace);
  elementImage.addEventListener('click', openPopupPreview);

  return element;
}

function startPage() {
  initialCards.forEach(function (item) {
    const newPlace = createPlace(item.name, item.link);

    elementsSection.prepend(newPlace);
  });
}


function toggleLike(event) {
  event.target.classList.toggle('element__footer-button_active');
}

function removePlace(event) {
  const element = event.target.closest('.element');

  element.remove();
}

function openPopupPreview(event) {
  const src = event.target.src;
  const name = event.target.closest('.element').querySelector('.element__footer-text').textContent;
  const alt = event.target.alt;

  popupPreviewImage.alt = alt;
  popupPreviewImage.src = src;
  popupPreviewText.textContent = name;

  openPopup(popupPreview);
}

function closePopupPreview() {
  closePopup(popupPreview);
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

  const newPlace = createPlace(name, link);
  elementsSection.prepend(newPlace);

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

popupPreviewCloseButton.addEventListener('click', closePopupPreview);
popupPreviewOverlay.addEventListener('click', closePopupPreview);

buttonPlaceAdd.addEventListener('click', openPopupPlaceAdd);
popupPlaceAddCloseButton.addEventListener('click', closePopupPlaceAdd);
popupPlaceAddOverlay.addEventListener('click', closePopupPlaceAdd);
popupPlaceAddForm.addEventListener('submit', submitPopupPlaceAdd);

profilePopupForm.addEventListener('submit', submitProfilePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profilePopupOverlay.addEventListener('click', closeProfilePopup);
profileEditButton.addEventListener('click', openProfilePopup);

startPage();
