import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";
import {
  profileEditButton,
  profileAddButton,
  nameInput,
  aboutInput,
  profileForm,
  avatarForm,
  newPlaceForm,
  editAvatarBtn,
} from "./vars.js";

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

const confirmPopup = new PopupConfirm(".popup-confirm", (cardId) => api.deleteCard(cardId));
confirmPopup.setEventListeners();

const onConfirm = (data) => confirmPopup.open(data);

const createCard = (card) => {
  const cardId = card._id;
  const newCard = new Card(
    card, // данные
    "#image-card", // селектор шаблона
    () => imagePopup.open(card.link, card.name), // клик по картинке
    user.getUserId(), // id юзера
    onConfirm, // клик по корзине
    () => api.deleteLike(cardId), // клик лайк
    () => api.setLike(cardId) // клик лайк
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

const renderItems = () => {
  api
    .fetchCards()
    .then((cards) => {
      cards
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .forEach((card) => {
          const newCard = createCard(card);
          section.addItem(newCard);
        });
    })
    .catch((err) => console.log(err));
};

api
  .fetchUser()
  .then((userData) => {
    user.setUserInfo(userData);
    renderItems();
  })
  .catch((err) => console.log(err));

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

const newCardOnSubmit = (values, popup) => {
  popup._submitBtn.textContent = "Сохранение ...";
  return api
    .createCard(values.title, values.picture)
    .then((result) => {
      const cardElement = createCard(result);
      section.addItem(cardElement);
      popup.close();
    })
    .finally(() => (popup._submitBtn.textContent = "Сохранить"))
    .catch((err) => console.log(err));
};

const newAvatarOnSubmit = (values) => {
  return api
    .editAvatar(values.avatar)
    .then((res) => {
      user.setUserInfo(res);
    })
    .catch((err) => console.log(err));
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
  return api
    .editProfile(values.name, values.speciality)
    .then((result) => {
      user.setUserInfo(result);
    })
    .catch((err) => console.log(err));
};

const profilePopup = new PopupWithForm(".popup-profile", profileOnSubmit);
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = user.getUserInfo();

  nameInput.value = userData.userName;
  aboutInput.value = userData.userInfo;

  profilePopup.open();
});
