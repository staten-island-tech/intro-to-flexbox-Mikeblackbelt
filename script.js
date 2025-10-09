import card_list from './card_list.js';

const container = document.getElementsByClassName('container')[0];
const cart = document.getElementsByClassName('cart')[0];
const counter = document.getElementsByClassName('cart')[1];
const added = document.getElementById('item-list');

let items = [];
let cards = [];
let cost = 0;

let displays = {
    'Bagel': true,
    'misc': true,
}

let bagel_Filter = document.getElementById('bagels');
let misc_Filter = document.getElementById('misc');

console.log(container);


class card {
    constructor ({ttl, cat, img=null, desc=null, id=null, price='$4'}) {
        this.ttl = ttl;
        this.cat = cat;
        this.img = img;
        this.desc = desc;
        this.id = id || ttl;
        this.price = price;

        this.card = document.createElement('div');
        this.card.classList.add('card', cat);
        
        let filler = document.createElement('span');
        this.card.appendChild(filler);

        this.content = document.createElement('div');
        this.content.classList.add('content');
        
        this.h1 = document.createElement('h1');
        this.h1.textContent = ttl;
        this.content.appendChild(this.h1);

        this.button = document.createElement('button');
        this.button.textContent = this.price;
        this.content.appendChild(this.button);

        if (this.img) {
            if (this.img.endsWith('.mp4')) {
                this.mediaElement = document.createElement('video');
                this.mediaElement.src = this.img;
                this.mediaElement.controls = true;
            } else {
                this.mediaElement = document.createElement('img');
                this.mediaElement.src = this.img;
            }
            this.content.appendChild(this.mediaElement);
        }

        if (this.desc) {
            this.descElement = document.createElement('p');
            this.descElement.textContent = this.desc;
            this.content.appendChild(this.descElement);
        }
        
        this.card.appendChild(this.content);
        this.card.setAttribute('id', this.id);
    }
}

function createCards() {
    for (let i=0; i<card_list().length; i++) {
    let new_card = new card(card_list()[i]);
    if (!displays[new_card.cat]) {continue;}
    cards.push(new_card);
    new_card.button.onclick = function() {
        if (items.includes(new_card)) {
            items = items.filter(item => item !== new_card);
            cost -= parseInt(new_card.price.replace('$',''));
        }
        else {
          items.push(new_card);
        } 
        console.log(items);
    }

    container.appendChild(new_card.card);
    }     
}

createCards();

bagel_Filter.onclick = function() {
    displays['Bagel'] = !displays['Bagel'];

    if (!displays['Bagel'] & !displays['misc']) {displays['misc'] = true;}
    bagel_Filter.style.color = !displays['Bagel'] ? 'grey' : 'white';
    misc_Filter.style.color = !displays['misc'] ? 'grey' : 'white';
    container.innerHTML = '';
    cards = [];
    createCards();
}
misc_Filter.onclick = function() {
    displays['misc'] = !displays['misc'];
        if (!displays['Bagel'] & !displays['misc']) {
        displays['misc'] = true;
    }
    bagel_Filter.style.color = !displays['Bagel'] ? 'grey' : 'white';
    misc_Filter.style.color = !displays['misc'] ? 'grey' : 'white';
    container.innerHTML = '';
    cards = [];
    createCards();
}