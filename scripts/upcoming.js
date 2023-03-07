import data from "./amazing.js";

const upcomingCard = document.getElementById("upcoming");

let upcomingCards = [];

function upcoming() {
    let upcomingAux = [];
    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].date > data.currentDate) {
            upcomingAux.push(data.events[i]);
        }
    }
    return upcomingAux;
}
let fragment = document.createDocumentFragment();
upcomingCards = upcoming(upcomingCards);


for (const eventos of upcomingCards) {
    let div = document.createElement('div');
    div.classList = 'col-12 col-md-6 col-lg-3 gap-4 mt-3';
    div.innerHTML = `
    <div class="card h-100">
                <img src="${eventos.image}" class="card-img-top img-thumbnail p-3"
                    alt="Image card 1">
                <div class="card-body">
                    <h5 class="card-title">${eventos.name}</h5>
                    <p class="card-text">${eventos.description}</p>
                    <p class="card-text category">${eventos.category}</p>
                    <p class="card-text">${eventos.date}</p>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center align-items-center">
                        <h6 class="mx-2 pt-2">$${eventos.price}</h6>
                        <a class="btn-more py-2 px-2 text-light mx-2" href="../pages/details.html">Ver más</a>
                    </div>
                </div>
            </div>
    `
    fragment.appendChild(div);
}

upcomingCard.appendChild(fragment);