const container = document.getElementsByClassName('container')[0];
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

const test_card = new card({
    ttl: 'test',
    cat: 'test',
    img: 'https://c8.alamy.com/comp/JXY4PY/abstract-blur-image-of-empty-walkway-to-the-green-garden-JXY4PY.jpg',
});

for (let i=0; i<7; i++) {
    let new_card = new card({
        ttl: `test ${i}`,
        cat: 'test',
        img: 'https://c8.alamy.com/comp/JXY4PY/abstract-blur-image-of-empty-walkway-to-the-green-garden-JXY4PY.jpg',
        price: `$${i+1}`,
    });
    container.appendChild(new_card.card);
}       
