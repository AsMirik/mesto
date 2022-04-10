let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name-text');
let profileActivity = document.querySelector('.profile__activity');

let popup = document.querySelector('#popupProfileEdit');
let formPopup = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('#name');
let jobInput = popup.querySelector('#work');

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileActivity.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function submitPopup(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileActivity.textContent = jobInput.value;

  closePopup();
}

formPopup.addEventListener('submit', submitPopup);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);

//Popup Добавления места
let addPlaceButton = document.querySelector('.profile__add-button');


let popupPlaceAdd = document.querySelector('#popupPlaceAdd');
let formPopupPlaceAdd = popupPlaceAdd.querySelector('.popup__form');
let closeButtonPlaceAdd = popupPlaceAdd.querySelector('.popup__close-button');

function openPopupPlaceAdd() {
  popupPlaceAdd.classList.add('popup_opened');
}

function closePopupPlaceAdd() {
  popupPlaceAdd.classList.remove('popup_opened');
}

function submitPopupPlaceAdd(event) {
  event.preventDefault();

  closePopupPlaceAdd();
}

addPlaceButton.addEventListener('click', openPopupPlaceAdd)
closeButtonPlaceAdd.addEventListener('click', closePopupPlaceAdd);
formPopupPlaceAdd.addEventListener('submit', submitPopupPlaceAdd);
