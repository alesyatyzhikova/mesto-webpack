//класс для формы добавления карточки
class PopupAdd extends Popup {
    constructor(container) {
        super(container);
    }

    //Отправить форму
    submit() {
        cardList.addCard(place.value, link.value);
        super.resetForm();
        super.disabledButton();
        super.close();
    }
}