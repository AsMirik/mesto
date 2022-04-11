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
