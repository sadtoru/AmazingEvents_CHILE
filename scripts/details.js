import { createDetailCard } from "./functions.js"

async function getDetails() {
  await fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {

      const queryString = location.search;
      const params = new URLSearchParams(queryString);
      let cardId = params.get('id');

      let card = data.events.find(card => card._id == cardId);

      /* container del detalle seleccionado */
      let detailContainer = document.getElementById('detailContainer');

      /* funcion que dibuja el detalle del evento */
      createDetailCard(card, detailContainer)

    })
}

getDetails();