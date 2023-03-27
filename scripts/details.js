import { createDetailCard } from "./functions.js"

/* función asincrónica que obtiene los datos del archivo JSON y los procesa */
async function getDetails() {
  // hacer una petición para obtener el archivo JSON con la data
  await fetch("../data/amazing.json")
    // convertir la respuesta a formato JSON
    .then(response => response.json())
    // procesar la data obtenida
    .then(data => {

      // obtener el id del evento de la URL
      const queryString = location.search;
      const params = new URLSearchParams(queryString);
      let cardId = params.get('id');

      // buscar el evento en la data 
      let card = data.events.find(card => card._id == cardId);

      // container del detalle seleccionado
      let detailContainer = document.getElementById('detailContainer');

      // funcion que dibuja el detalle del evento
      createDetailCard(card, detailContainer)

    })
}

/* llamamos a la función para la obtención y procesamiento de los datos */
getDetails();