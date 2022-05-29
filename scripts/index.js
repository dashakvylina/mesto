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
const imageViewPopup = document.querySelector(".popup-image");
const profilePopupCloseBtn = profilePopup.querySelector(".popup__close-btn");
const cardPopupCloseBtn = cardPopup.querySelector(".popup__close-btn");
const imageViewPopupCloseBtn = imageViewPopup.querySelector(".popup__close-btn");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__text-name");
const profileAbout = document.querySelector(".profile__text-about");
const nameInput = profilePopup.querySelectorAll(".form__field")[0];
const aboutInput = profilePopup.querySelectorAll(".form__field")[1];
const profileForm = profilePopup.querySelector("form");
const newPlaceForm = cardPopup.querySelector("form");
const placeName = cardPopup.querySelectorAll(".form__field")[0];
const placeLink = cardPopup.querySelectorAll(".form__field")[1];
const cardTemplate = document.querySelector("#image-card").content;
const popupImgCont = document.querySelector(".popup__image-group");
const imgPopup = document.querySelector(".popup__image");
const imgPopupText = document.querySelector(".popup__image-text");

function openPopup(popup) {
  popup.classList.add("popup_visible");
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
}

function createCard(data) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const likeBtn = cardElement.querySelector(".element__like-btn");
  const trashButton = cardElement.querySelector(".element__trash-btn");
  const imgButton = cardElement.querySelector(".element__img");

  imgButton.src = data.link;
  imgButton.alt = data.name;
  cardElement.querySelector(".element__text").textContent = data.name;

  trashButton.addEventListener("click", function (evt) {
    cardsContainer.removeChild(cardElement);
  });

  imgButton.addEventListener("click", function (evt) {
    openPopup(imageViewPopup);
    imgPopup.src = data.link;
    imgPopup.alt = data.name;
    imgPopupText.textContent = data.name;
  });

  likeBtn.addEventListener("click", function (evt) {
    const btn = evt.target;
    btn.classList.toggle("element__like-btn_active");
  });

  return cardElement;
}

function renderElements() {
  initialCards.forEach(function (card) {
    const newCard = createCard(card);
    cardsContainer.prepend(newCard);
  });
}
renderElements();

profilePopupCloseBtn.addEventListener("click", function (evt) {
  closePopup(profilePopup);
});

cardPopupCloseBtn.addEventListener("click", function (evt) {
  closePopup(cardPopup);
});

const showEditProfilePopup = function () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
};

profileEditButton.addEventListener("click", showEditProfilePopup);

const showAddCardPopup = function () {
  openPopup(cardPopup);
};

profileAddButton.addEventListener("click", showAddCardPopup);

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
  const newCardInfo = { name: placeName.value, link: placeLink.value };
  const newCard = createCard(newCardInfo);
  cardsContainer.prepend(newCard);
  closePopup(cardPopup);
  newPlaceForm.reset();
};

newPlaceForm.addEventListener("submit", addPlace);
