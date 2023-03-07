import data from "./amazing.js";

const allCardsElement = document.getElementById("cards")

let cards = [];

function allCards() {
    let cardAux = [];
    for (let i = 0; i < data.events.length; i++) {
        cardAux.push(data.events[i])
    }
    return cardAux;
}
let fragment = document.createDocumentFragment();
cards = allCards(cards);

for (const card of cards) {
    let div = document.createElement('div');
    div.classList = 'col-12 col-md-6 col-lg-3 gap-4 mt-3';
    div.innerHTML = `
    <div class="card h-100">
                <img src="${card.image}" class="card-img-top img-thumbnail p-3"
                    alt="Image card 1">
                <div class="card-body">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <p class="card-text category">${card.category}</p>
                    <p class="card-text">${card.date}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center align-items-center">
                        <h6 class="mx-2 pt-2">$${card.price}</h6>
                        <a class="btn-more py-2 px-2 text-light mx-2" href="../pages/details.html">Ver más</a>
                    </div>
                </div>
            </div>
    `
    fragment.appendChild(div);
}

allCardsElement.appendChild(fragment);

