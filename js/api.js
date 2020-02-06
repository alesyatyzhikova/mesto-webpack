class Api {
    constructor(options) {
        this.url = options.url;
        this.headers = options.headers;
    }

    getInitialCards(path) {
       return fetch(`${this.url}${path}`, {
           headers: this.headers
       })
           .then(res => {
               if (res.ok) {
                   return res.json();
               }
               return Promise.reject(`Ошибка: ${res.status}`);
           })
           .then(res => {
                res.forEach(card => {
                    cardList.addCard(card.name, card.link);
                })
            })
           .catch(err => {
               console.log(`Ошибка: ${err.status}`)
           })
    }

    loadProfile(path) {
        return fetch(`${this.url}${path}`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(res => {
                document.querySelector('.user-info__name').textContent = res.name;
                document.querySelector('.user-info__job').textContent = res.about;
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
            })
            .catch(err => {
                console.log(`Ошибка: ${err.status}`)
            })
    }

    editProfile(path) {
        return fetch(`${this.url}${path}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: popupEdit.form.elements.name.value,
                about: popupEdit.form.elements.info.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.log(`Ошибка: ${err.status}`)
            })
    }
}