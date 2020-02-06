import Popup from './popup';
import CardList from './cardList';

const cardContainer = document.querySelector('.places-list');
const cardList = new CardList(cardContainer);

//класс для формы добавления карточки
export default class PopupAdd extends Popup {
    constructor(container) {
        super(container);
    }

    //Отправить форму
    submit(event) {
        cardList.addCard(event.target.elements.place.value, event.target.elements.link.value);
        super.resetForm();
        super.disabledButton();
        super.close();
    }
}