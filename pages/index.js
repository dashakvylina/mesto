import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardPopup = document.querySelector(".popup-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#speciality-input");
const profileForm = document.querySelector("form");
const newPlaceForm = cardPopup.querySelector("form");

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

const user = new UserInfo({
  userNameSelector: ".profile__text-name",
  userInfoSelector: ".profile__text-about",
});

const imagePopup = new PopupWithImage(".popup-image");
imagePopup.setEventListeners();

const createCard = (name, link) => {
  const newCard = new Card(name, link, "#image-card", () => {
    imagePopup.open(link, name);
  });
  const cardElement = newCard.generateCard();
  return cardElement;
};

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => createCard(item.name, item.link),
  },
  ".elements"
);

section.renderItems();

const newCardOnSubmit = (values) => {
  const cardElement = createCard(values.title, values.picture);

  section.addItem(cardElement);
};

const newCardPopup = new PopupWithForm(".popup-card", newCardOnSubmit);
newCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  newPlaceFormValidator.toggleButtonState();
  newCardPopup.open();
});

const profileOnSubmit = (values) => {
  user.setUserInfo(values.name, values.speciality);
};

const profilePopup = new PopupWithForm(".popup-profile", profileOnSubmit);
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = user.getUserInfo();

  nameInput.value = userData.userName;
  aboutInput.value = userData.userInfo;

  profilePopup.open();
});
