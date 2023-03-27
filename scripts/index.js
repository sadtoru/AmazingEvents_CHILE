import { drawCards, drawCheckboxs, superFilter } from "./functions.js";

/* container de las cards seleccionado del index que toma de referencia */
let container = document.getElementById('cards');

/* container de las categorias seleccionado del index que toma de referencia */
let containerCategories = document.getElementById('categories-container');

/* container del search seleccionado del index que toma de referencia */
let searchBar = document.getElementById('search')

/* función asincrónica que obtiene los datos del archivo JSON y los procesa */
async function getIndex() {
  // hacer una petición para obtener el archivo JSON con la data
  await fetch("../data/amazing.json")
    // convertir la respuesta a formato JSON
    .then(response => response.json())
    // procesar la data obtenida
    .then(data => {

      // guardando la data de los eventos
      let dataEvents = data.events

      // funcion que pinta las cards con sus respectivos parametros
      drawCards(dataEvents, container);

      // funcion que pinta los checkboxs con sus respectivos parametros
      drawCheckboxs(dataEvents, containerCategories);

      // evento que escucha el input con el superFilter
      searchBar.addEventListener('input', () => superFilter(dataEvents, container, searchBar));

      // evento que escucha el contenedor de categorias con el superFilter
      containerCategories.addEventListener('change', () => superFilter(dataEvents, container, searchBar));

    })
    // en caso de que ocurra un error durante la obtención de la data
    // se muestra un mensaje de error en la consola
    .catch(error => console.error(error))
}

/* llamamos a la función para la obtención y procesamiento de los datos */
getIndex();