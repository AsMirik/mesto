export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._nameElement.textContent,
      info: this._infoElement.textContent
    };
  }

  setUserInfo(name, info, userId) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;

    if (userId) {
      this._id = userId;
    }
  }
}
