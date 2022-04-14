function createPlace(name, srcPlace) {
  let template = document.querySelector('#newPost').content;
  let sectionElements = document.querySelector('.elements');
  let element = template.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = srcPlace;
  element.querySelector('.element__footer-text').textContent = name;

  sectionElements.prepend(element);
}

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

for (let i = 0; i < initialCards.length; i++) {
  createPlace(initialCards[i].name, initialCards[i].link);
}


let elements = document.querySelector('.elements');

function elementsMainClick(event) {
  if (event.target.classList.contains('element__footer-button')) {
    toggleLike(event.target);
  } else if (event.target.classList.contains('element__remove-button')) {
    removePlace(event.target);
  } else if (event.target.classList.contains('element__image')) {
    previewPlace(event.target);
  }
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('element__footer-button_active');
}

function removePlace(removeButton) {
  removeButton.parentElement.remove();
}

let popupPlacePreview = document.querySelector('#popupPreview');
let closePreviewButton = popupPlacePreview.querySelector('.popup__close-button');

function previewPlace(image) {
  let src = image.src;
  let name = image.parentElement.querySelector('.element__footer-text').textContent;
  let previewImage = popupPlacePreview.querySelector('.popup__preview-image');
  let previewText = popupPlacePreview.querySelector('.popup__preview-text');

  previewImage.src = src;
  previewText.textContent = name;

  popupPlacePreview.classList.add('popup_opened')
}

function closePopupPreview() {
  popupPlacePreview.classList.remove('popup_opened');
}

closePreviewButton.addEventListener('click', closePopupPreview);
elements.addEventListener('click', elementsMainClick);
