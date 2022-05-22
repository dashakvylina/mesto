let initialCards = [
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
const elements = document.querySelector(".elements");
const modalImg = document.querySelector(".modal-image__pic");
const modalText = document.querySelector(".modal-image__text");
const modalImgView = document.querySelector(".modal-image");
const modelImgCloseBtn = document.querySelector(".modal-image__icon");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const wrapper = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close-btn");
const editName = document.querySelector(".profile__text-name");
const editAbout = document.querySelector(".profile__text-about");
const nameInput = document.querySelectorAll(".form__field")[0];
const aboutInput = document.querySelectorAll(".form__field")[1];
const editProfileForm = document.querySelector("#editProfileForm");
const editNewPlaceForm = document.querySelector("#editNewPlaceForm");
const editProfileModal = document.querySelector("#edit-profile");
const addPhotoProfileModal = document.querySelector("#add-photo");
const addLike = document.querySelector(".element__like-img");
const placeName = document.querySelectorAll(".form__field")[2];
const placeLink = document.querySelectorAll(".form__field")[3];
const modalImgContainer = document.querySelector(".modal-image__group");

const renderElements = function () {
  let content = "";

  for (let i = 0; i < initialCards.length; i++) {
    let str = `
    <div class="element">
      <button class="element__trash-btn" id="${i}">
        <img src="./Images/Group.png" class="element__trash-img" alt="Корзина" />
      </button>
      <img src="${initialCards[i].link}" id="img-${i}" class="element__img" alt="${initialCards[i].name}" />
      <div class="element__group">
        <h2 class="element__text">${initialCards[i].name}</h2>
        <button class="element__like-btn" type="button"></button>
      </div>
    </div>
    `;
    content = content + str;
  }

  elements.innerHTML = content;

  const likeElements = document.querySelectorAll(".element__like-btn");
  const trashButtons = document.querySelectorAll(".element__trash-btn");
  const imgElements = document.querySelectorAll(".element__img");

  imgElements.forEach((el) =>
    el.addEventListener("click", function (evt) {
      const img = evt.target;
      const index = img.id.substring(4);
      modalText.innerHTML = initialCards[index].name;
      const newImg = new Image();
      newImg.src = initialCards[index].link;
      newImg.alt = initialCards[index].name;
      newImg.classList.add("modal-image__pic");
      const oldImg = modalImgContainer.querySelector(".modal-image__pic");
      if (oldImg !== null) oldImg.remove();
      modalImgContainer.prepend(newImg);
      modalImgView.classList.add("modal-image_visible");
    })
  );

  likeElements.forEach((el) =>
    el.addEventListener("click", function (evt) {
      const btn = evt.target;
      btn.classList.toggle("element__like-btn_active");
    })
  );

  trashButtons.forEach((el) =>
    el.addEventListener("click", function (evt) {
      const trash = evt.currentTarget;
      console.log(trash.id);
      initialCards.splice(trash.id, 1);
      renderElements();
    })
  );
};

renderElements();

modelImgCloseBtn.addEventListener("click", function () {
  modalImgView.classList.remove("modal-image_visible");
});

const showEditProfileModal = function () {
  wrapper.classList.add("modal_visible");
  editProfileModal.classList.remove("unvisible");
  nameInput.value = editName.textContent;
  aboutInput.value = editAbout.textContent;
};

const showAddPhotoProfile = function () {
  wrapper.classList.add("modal_visible");
  addPhotoProfileModal.classList.remove("unvisible");
};

const closeEditModal = function () {
  wrapper.classList.remove("modal_visible");
  editProfileModal.classList.add("unvisible");
  addPhotoProfileModal.classList.add("unvisible");
};

const closeAddPhotoModal = function () {
  wrapper.classList.remove("modal_visible");
};

const editProfile = function (event) {
  event.preventDefault();
  editName.textContent = nameInput.value;
  editAbout.textContent = aboutInput.value;
  closeEditModal();
};

const addPlace = function (event) {
  event.preventDefault();
  const newPlace = {
    name: placeName.value,
    link: placeLink.value,
  };
  initialCards.unshift(newPlace);
  renderElements();
  placeName.value = "";
  placeLink.value = "";
  closeEditModal();
};

editButton.addEventListener("click", showEditProfileModal);

closeButton.addEventListener("click", closeEditModal);

addButton.addEventListener("click", showAddPhotoProfile);

editProfileForm.addEventListener("submit", editProfile);

editNewPlaceForm.addEventListener("submit", addPlace);
