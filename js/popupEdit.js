//класс для формы редактирования профиля
class PopupEdit extends Popup {
    constructor(container) {
        super(container);
    }

    //Добавить данные в поля при открытии
    addInfo() {
            const userName = document.querySelector('.user-info__name').textContent;
            const userJob = document.querySelector('.user-info__job').textContent;

            name.value = userName;
            info.value = userJob;
    }

    //Отправка формы
    submit() {
        super.close();
    }
}