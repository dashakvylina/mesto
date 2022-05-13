const editButton = document.querySelector(".profile__edit-button");
const wrapper = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close-btn");
const editName = document.querySelector(".profile__text-name");
const editAbout = document.querySelector(".profile__text-about");
const nameInput = document.querySelectorAll(".form__field")[0];
const aboutInput = document.querySelectorAll(".form__field")[1];
const form = document.querySelector(".form");

const showModal = function () {
  wrapper.classList.add("modal_visible");
  nameInput.value = editName.textContent;
  aboutInput.value = editAbout.textContent;
};

const closeModal = function () {
  wrapper.classList.remove("modal_visible");
};

const editProfile = function (event) {
  event.preventDefault();
  editName.textContent = nameInput.value;
  editAbout.textContent = aboutInput.value;
  wrapper.classList.remove("modal_visible");
};

editButton.addEventListener("click", showModal);

closeButton.addEventListener("click", closeModal);

form.addEventListener("submit", editProfile);
