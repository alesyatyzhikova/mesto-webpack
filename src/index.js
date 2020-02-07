import './style.css';
import Api from './modules/api';
import Card from './modules/card';
import CardList from './modules/cardList';
import Popup from './modules/popup';
import PopupAdd from './modules/popupAdd';
import PopupEdit from './modules/popupEdit';
import {place, link, name, info, errors} from './modules/validation';
import * as valid from './modules/validation';


const cardContainer = document.querySelector('.places-list');
const popupContainer = document.querySelector('.popup__container');
const addForm = document.forms.new;
const editForm = document.forms.edit;

const cardList = new CardList(cardContainer);

//Создание попапов
const popupAdd = new PopupAdd(document.querySelector('.popup__add-card'));
const popupEdit = new PopupEdit(document.querySelector('.popup__edit-profile'));
const popupImage = new Popup(document.querySelector('.popup__open-image'));

//Лайк и удаление карточек из контейнера

const card = new Card();

const serverUrl =
    NODE_ENV === "development"
        ? "http://praktikum.tk/cohort6"
        : "https://praktikum.tk/cohort6";

const api = new Api({

    url: serverUrl,
    headers: {
        authorization: '7ceba2bd-b16c-4485-905f-e1584b27ca55',
        "Content-Type": "application/json"
    }
});

cardContainer.addEventListener('click', function(event) {

    if(event.target.classList.contains('place-card__like-icon')) {
        card.like(event);
    }

    if(event.target.classList.contains('place-card__delete-icon')) {
        card.remove(event);
    }

    if(event.target.classList.contains('place-card__image')) {
        if(event.target.classList.contains('place-card__delete-icon')) {
            return;
        }
        const popupImageBg = document.querySelector('.popup__image');
        popupImageBg.src = event.target.style.backgroundImage.slice(5, -2);
        document.querySelector('.popup__open-image').classList.add('popup_is-opened');
        popupImage.open(event);
    }
});

//Закрыть попап
popupContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup__close')) {

        if(event.target.closest('.popup').classList.contains('popup__add-card')) {
            popupAdd.close();
        }

        if(event.target.closest('.popup').classList.contains('popup__edit-profile')) {
            popupEdit.close();
        }

        if(event.target.closest('.popup').classList.contains('popup__open-image')) {
            popupImage.close();
        }
    }
});

//Открыть попап
document.addEventListener('click', function (event) {

    if (event.target.classList.contains('user-info__edit-button')) {
        popupEdit.open();
        popupEdit.addInfo();
    }
    if (event.target.classList.contains('user-info__button')) {
        popupAdd.open();
    }
});

//Отправка формы добавления карточки
popupAdd.form.addEventListener('submit', function (event) {
    event.preventDefault();
    popupAdd.submit(event);
});

//Отправка формы редактирования контактов
popupEdit.form.addEventListener('submit', function (event) {
    event.preventDefault();

    api.editProfile('/users/me', editForm)
        .then(res => {
            document.querySelector('.user-info__name').textContent = res.name;
            document.querySelector('.user-info__job').textContent = res.about;
            document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
            popupEdit.submit();
        });
});

api.getInitialCards('/cards');

//Загрузка профиля с сервера
api.loadProfile('/users/me');

