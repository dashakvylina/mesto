export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameEl = document.querySelector(userNameSelector);
    this._userInfoEl = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return { userName: this._userNameEl.textContent, userInfo: this._userInfoEl.textContent };
  }

  setUserInfo(name, info) {
    this._userNameEl.textContent = name;
    this._userInfoEl.textContent = info;
  }
}
