import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const profilePopup = document.querySelector(".popup-profile");
const cardPopup = document.querySelector(".popup-card");
export const imageViewPopup = document.querySelector(".popup-image");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-btn");
const imageViewPopupCloseBtn = imageViewPopup.querySelector(".popup__close-btn");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__text-name");
const profileAbout = document.querySelector(".profile__text-about");
const nameInput = profilePopup.querySelector("#name-input");
const aboutInput = profilePopup.querySelector("#speciality-input");
const profileForm = profilePopup.querySelector("form");
const newPlaceForm = cardPopup.querySelector("form");
const placeName = cardPopup.querySelector("#place-input");
const placeLink = cardPopup.querySelector("#url-input");
const body = document.querySelector("body");
const popupList = document.querySelectorAll(".popup");

const handleEscClose = (ev) => {
  const openedPopup = body.querySelector(".popup_visible");
  if (openedPopup && ev.key === "Escape") {
    closePopup(openedPopup);
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_visible");
  body.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  body.removeEventListener("keydown", handleEscClose);
}

function renderElements() {
  initialCards.forEach(function (card) {
    const newCard = new Card(card.name, card.link, "#image-card");
    const cardElement = newCard.generateCard();
    cardsContainer.append(cardElement);
  });
}

renderElements();

profilePopupCloseBtn.addEventListener("click", function (evt) {
  closePopup(profilePopup);
});

cardPopupCloseBtn.addEventListener("click", function (evt) {
  closePopup(cardPopup);
});

Array.from(popupList).forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup_visible")) {
      closePopup(evt.target);
    }
  });
});

const showEditProfilePopup = function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
  const submitBtn = profileForm.querySelector(".form__button");
  submitBtn.disabled = false;
  submitBtn.classList.remove("form__button_inactive");
};

profileEditButton.addEventListener("click", showEditProfilePopup);

profileAddButton.addEventListener("click", () => openPopup(cardPopup));

imageViewPopupCloseBtn.addEventListener("click", function (evt) {
  closePopup(imageViewPopup);
});

const editProfile = function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(profilePopup);
};
profileForm.addEventListener("submit", editProfile);

const addPlace = function (event) {
  event.preventDefault();

  const newCard = new Card(placeName.value, placeLink.value, "#image-card");
  const newCardHtml = newCard.generateCard();
  cardsContainer.prepend(newCardHtml);

  closePopup(cardPopup);
  newPlaceForm.reset();
  const submitBtn = newPlaceForm.querySelector(".form__button");
  submitBtn.disabled = true;
  submitBtn.classList.add("form__button_inactive");
};

newPlaceForm.addEventListener("submit", addPlace);

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
