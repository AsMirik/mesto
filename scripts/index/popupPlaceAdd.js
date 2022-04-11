let addPlaceButton = document.querySelector('.profile__add-button');

let popupPlaceAdd = document.querySelector('#popupPlaceAdd');
let formPopupPlaceAdd = popupPlaceAdd.querySelector('.popup__form');
let closeButtonPlaceAdd = popupPlaceAdd.querySelector('.popup__close-button');
let placeNameInput = popupPlaceAdd.querySelector('#placeName');
let placeLinkInput = popupPlaceAdd.querySelector('#placeLink');

function openPopupPlaceAdd() {
  popupPlaceAdd.classList.add('popup_opened');
}

function closePopupPlaceAdd() {
  popupPlaceAdd.classList.remove('popup_opened');
}

function submitPopupPlaceAdd(event) {
  event.preventDefault();

  let name = placeNameInput.value;
  let link = placeLinkInput.value;

  createPlace(name, link);
  closePopupPlaceAdd();
}

addPlaceButton.addEventListener('click', openPopupPlaceAdd)
closeButtonPlaceAdd.addEventListener('click', closePopupPlaceAdd);
formPopupPlaceAdd.addEventListener('submit', submitPopupPlaceAdd);
