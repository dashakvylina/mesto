let editButton = document.querySelector(".profile__edit-button");
let wrapper = document.querySelector(".modal");
let closeButton = document.querySelector(".modal__close-icon");
let editName = document.querySelector(".profile__text-name");
let editAbout = document.querySelector(".profile__text-about");
let nameInput = document.querySelectorAll(".form__field")[0];
let aboutInput = document.querySelectorAll(".form__field")[1];
let form = document.querySelector(".form");

editButton.addEventListener("click", function () {
  wrapper.classList.add("modal_visible");
  nameInput.value = editName.textContent;
  aboutInput.value = editAbout.textContent;
});

closeButton.addEventListener("click", function () {
  wrapper.classList.remove("modal_visible");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  editName.textContent = nameInput.value;
  editAbout.textContent = aboutInput.value;
  wrapper.classList.remove("modal_visible");
});
