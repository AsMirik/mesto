import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__preview-image');
    this._title = this._popup.querySelector('.popup__preview-text');
  }

  open(imageSrc, titleText) {
    this._image.src = imageSrc;
    this._image.alt = titleText;
    this._title.textContent = titleText;

    super.open();
  }
}
