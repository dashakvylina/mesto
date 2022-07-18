import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import "../styles/index.css";

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

const cardsContainer = document.querySelector(".elements");
// const profilePopup = document.querySelector(".popup-profile");
const cardPopup = document.querySelector(".popup-card");
export const imageViewPopup = document.querySelector(".popup-image");
// const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-btn");
const imageViewPopupCloseBtn = imageViewPopup.querySelector(".popup__close-btn");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__text-name");
const profileAbout = document.querySelector(".profile__text-about");
const nameInput = document.querySelector("#name-input");
const aboutInput = document.querySelector("#speciality-input");
const profileForm = document.querySelector("form");
const newPlaceForm = cardPopup.querySelector("form");
const placeName = cardPopup.querySelector("#place-input");
const placeLink = cardPopup.querySelector("#url-input");
const body = document.querySelector("body");
const popupList = document.querySelectorAll(".popup");

const user = new UserInfo({
  userNameSelector: ".profile__text-name",
  userInfoSelector: ".profile__text-about",
});

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item.name, item.link, "#image-card", () => {
        const imagePopup = new PopupWithImage(".popup-image");
        imagePopup.setEventListeners();
        imagePopup.open(item.link, item.name);
      });
      const cardElement = newCard.generateCard();
      return cardElement;
    },
  },
  ".elements"
);

section.renderItems();

const newCardOnSubmit = (values) => {
  const newCard = new Card(values.title, values.picture, "#image-card", () => {
    const imagePopup = new PopupWithImage(".popup-image");
    imagePopup.setEventListeners();
    imagePopup.open(values.picture, values.title);
  });
  const cardElement = newCard.generateCard();

  section.addItem(cardElement);
};

const newCardPopup = new PopupWithForm(".popup-card", newCardOnSubmit);
newCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
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
