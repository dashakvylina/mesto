export default class FormValidator {
  constructor(options, formElement) {
    this._options = options; // { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._options;
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._options;
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _isValid(input) {
    if (!input.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(input);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const { submitButtonSelector, inactiveButtonClass } = this._options;

    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    const { inputSelector } = this._options;
    this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));

    this._toggleButtonState();

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
