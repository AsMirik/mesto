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
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
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
  console.log(event.target);
  if (event.target.classList.contains('element__footer-button')) {
    toggleLike(event.target);
  } else if (event.target.classList.contains('element__remove-button')) {
    removePlace();
  } else if (event.target.classList.contains('element__image')) {
    previewPlace();
  }
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('element__footer-button_active');
}

function removePlace() {
  console.log('remove');
}

function previewPlace() {
  console.log('preview');
}

elements.addEventListener('click', elementsMainClick);
