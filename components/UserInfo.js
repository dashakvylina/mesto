export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, imgSelector }) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userInfoEl = document.querySelector(userInfoSelector);
    this._userImg = document.querySelector(imgSelector);
  }

  getUserInfo() {
    return { userName: this._userNameEl.textContent, userInfo: this._userInfoEl.textContent };
  }

  setUserInfo(userData) {
    this._userNameEl.textContent = userData.name;
    this._userInfoEl.textContent = userData.about;
    this._userImg.src = userData.avatar;
    this._userId = userData._id;
  }

  getUserId() {
    return this._userId;
  }
}
