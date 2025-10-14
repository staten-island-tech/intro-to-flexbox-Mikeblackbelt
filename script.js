import card_list from './card_list.js';

const container = document.getElementsByClassName('container')[0];
const cart = document.getElementsByClassName('cart')[0];
const counter = document.getElementById('count');
const added = document.getElementById('item-list');
const cart_container = document.getElementsByClassName('cart-container')[0];
const cart_img = document.getElementById('cart_img');
const total_price = document.getElementById('total-price');
const checkout_btn = document.getElementById('checkout-btn');

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
        updateCart();
        counter.textContent = items.length;
        console.log(items);
    }

    container.appendChild(new_card.card);
    }     
}

createCards();

bagel_Filter.onclick = function() {
    displays['Bagel'] = !displays['Bagel'];
    if (!displays['Bagel'] & !displays['misc']) {displays['misc'] = true;}
    bagel_Filter.style.borderColor = !displays['Bagel'] ? 'grey' : 'white';
    misc_Filter.style.borderColor = !displays['misc'] ? 'grey' : 'white';
    container.innerHTML = '';
    cards = [];
    createCards();
}

misc_Filter.onclick = function() {
    displays['misc'] = !displays['misc'];
    if (!displays['Bagel'] & !displays['misc']) {displays['Bagel'] = true; }
    bagel_Filter.style.bordeColor = !displays['Bagel'] ? 'grey' : 'white';
    misc_Filter.style.borderColor = !displays['misc'] ? 'grey' : 'white';
    container.innerHTML = '';
    cards = [];
    createCards();
}

function updateCart() {
    added.innerHTML = '';
    cost = 0;
    for (let i=0; i<items.length; i++) {
        let li = document.createElement('li');
        li.textContent = items[i].ttl + ' - ' + items[i].price;
        added.appendChild(li);
        cost += parseInt(items[i].price.replace('$',''));
    }
    total_price.textContent = cost.toFixed(2);
    added.innerHTML = added.innerHTML || '<li>No items in cart</li>';
    //this can be done in O(1) instead of O(n) but i dont feel like it, its effectively constant time bc worst case scenario is n=items.length which is < 100 regardless
}

cart.onclick = function() {
    if (cart_container.style.display === 'block') {
        cart_container.style.display = 'none';
        cart_img.style.filter = 'invert(0)';
    } else {
        cart_container.style.display = 'block';
        cart_img.style.filter = 'invert(1)';
        total_price.textContent = cost.toFixed(2);
    }
    console.log(cart_container.style.display);
}

checkout_btn.onclick = function() {
    window.close();
}