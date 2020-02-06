const addForm = document.forms.new;
const editForm = document.forms.edit;

const { place, link } = addForm.elements;
const { name, info} = editForm.elements;

//Объект с ошибками
const errors = {
    symbolError: 'Должно содержать от 2 до 30 знаков',
    emptyError: 'Это обязательное поле',
    urlError: 'Здесь должна быть ссылка',
};

export {place, link, name, info, errors};

//Добавить ошибку
function activateError(event) {
    event.target.nextElementSibling.classList.remove('popup__error_hidden');
}

//Убрать ошибку
function removeError(event) {
    event.target.nextElementSibling.classList.add('popup__error_hidden');
}

//Валидация полей формы при фокусе
function handleValidate(event) {
    validate(event.target);
}


//Валидация формы
function formValidate(event) {
    const [input1, input2] = event.currentTarget.elements;
    const submitButton = event.currentTarget.querySelector('.popup__button');

    if ((input1.checkValidity() && isEnoughSymbols(input1))
        &&
        (input2.checkValidity() && isEnoughSymbols(input2) && isUrl(input2))) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
    }
}

//Валидация полей формы
function validate(element) {

    const error = document.querySelector(`#${element.name}`);
    const { symbolError, emptyError, urlError } = errors;
//Можно лучше: Если в функции используется event лучше передавать его, как аргулемт этой функции. Иначе код становится не явным и используется глобальный объект эвента.
    if (!element.checkValidity()) {
        error.textContent = emptyError;
        activateError(event);

        return false;

    }
    if (!isUrl(element)) {
        error.textContent = urlError;
        activateError(event);

        return false;

    }
    if (!isEnoughSymbols(element)) {
        error.textContent = symbolError;
        activateError(event);

        return false;

    }
        removeError(event);
        return true;

}

//Проверка на количество символов
function isEnoughSymbols(element) {
    if (element.type !== 'text' || element.name === 'link') {
        return true;
    }
    if (element.value.length >= 2 && element.value.length <= 30) {
        return true;
    }

    return false;
}

//Проверка на ссылку
function isUrl(element) {
    if (element.name !== 'link') {
        return true;
    }
    if (element.value.startsWith('https://')) {
        return true;
    }

    return false;
}

export {activateError, removeError, handleValidate, validate, formValidate, isEnoughSymbols, isUrl};

//проверяем ошибки в полях формы
link.addEventListener('input', handleValidate);
place.addEventListener('input', handleValidate);
name.addEventListener('input', handleValidate);
info.addEventListener('input', handleValidate);

//Cлушатели валидации форм
addForm.addEventListener('input', formValidate);
editForm.addEventListener('input', formValidate);
