//Общий класс для попапов
export default class Popup {
    constructor(container) {
        this.container = container;
        this.form = container.querySelector('.popup__form');
    }

    //Закрыть попап
    close() {
        this.container.classList.remove('popup_is-opened');
    }

    open() {
        this.container.classList.add('popup_is-opened');
    }

    //Заблокировать кнопку
    disabledButton() {
        const button = this.form.querySelector('.popup__button');

        button.setAttribute('disabled', true);
    }

    //Сбросить форму
    resetForm() {
        this.form.reset();
    }
}