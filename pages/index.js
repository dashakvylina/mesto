import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";

const cardPopup = document.querySelector(".popup-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#speciality-input");
const profileForm = document.querySelector("#editProfileForm");
const avatarForm = document.querySelector("#editAvatarForm");
const newPlaceForm = cardPopup.querySelector("form");
const editAvatarBtn = document.querySelector(".profile__avatar-container");

const imagePopup = new PopupWithImage(".popup-image");
imagePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-45",
  headers: {
    authorization: "fbe58520-8678-4121-ac42-d1be94fdc956",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo({
  userNameSelector: ".profile__text-name",
  userInfoSelector: ".profile__text-about",
  imgSelector: ".profile__avatar",
});

const confirmPopup = new PopupConfirm(".popup-confirm");
confirmPopup.setEventListeners();

const handleDeleteCard = (cardId) => {
  confirmPopup.open();
  confirmPopup.onOk(() => api.deleteCard(cardId));
};

const createCard = (card) => {
  const cardId = card._id;
  const newCard = new Card(
    card,
    "#image-card",
    () => {
      imagePopup.open(card.link, card.name);
    },
    user.getUserId(),
    () => handleDeleteCard(cardId)
  );
  const cardElement = newCard.generateCard();
  return cardElement;
};

const section = new Section(
  {
    items: [],
    renderer: (item) => createCard(item),
  },
  ".elements"
);

section.renderItems();

api.fetchUser().then((userData) => {
  user.setUserInfo(userData);
});

api.fetchCards().then((cards) => {
  cards.forEach((card) => {
    const newCard = createCard(card);
    section.addItem(newCard);
  });
});

const newPlaceFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  },
  newPlaceForm
);

newPlaceFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  },
  profileForm
);

profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  },
  avatarForm
);

avatarFormValidator.enableValidation();

const newCardOnSubmit = (values) => {
  return api.createCard(values.title, values.picture).then((result) => {
    const cardElement = createCard(result);
    section.addItem(cardElement);
  });
};

const newAvatarOnSubmit = (values) => {
  return api.editAvatar(values.avatar).then((res) => user.setUserInfo(res));
};

const newCardPopup = new PopupWithForm(".popup-card", newCardOnSubmit);
newCardPopup.setEventListeners();

const newAvatarForm = new PopupWithForm(".popup-avatar", newAvatarOnSubmit);
newAvatarForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  newPlaceFormValidator.toggleButtonState();
  newCardPopup.open();
});

editAvatarBtn.addEventListener("click", () => {
  newAvatarForm.open();
});

const profileOnSubmit = (values) => {
  return api.editProfile(values.name, values.speciality).then((result) => {
    user.setUserInfo(result);
  });
};

const profilePopup = new PopupWithForm(".popup-profile", profileOnSubmit);
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = user.getUserInfo();

  nameInput.value = userData.userName;
  aboutInput.value = userData.userInfo;

  profilePopup.open();
});
