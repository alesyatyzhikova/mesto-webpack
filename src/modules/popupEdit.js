import Popup from './popup';
//класс для формы редактирования профиля
export default class PopupEdit extends Popup {
    constructor(container) {
        super(container);
    }

    //Добавить данные в поля при открытии
    addInfo() {
            const userName = document.querySelector('.user-info__name').textContent;
            const userJob = document.querySelector('.user-info__job').textContent;

            this.form.name.value = userName;
            this.form.info.value = userJob;
    }

    //Отправка формы
    submit() {
        super.close();
    }
}