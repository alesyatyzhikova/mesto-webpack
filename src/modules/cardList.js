import Card from './card';
 //Контейнер с карточками
export  default class CardList {
    constructor(container) {
        this.container = container;
    }

    //Добавить карточку в контейнер
    addCard(name, link) {
        const card = new Card();
        this.container.insertAdjacentHTML('beforeend', card.create(name, link));
    }
}
