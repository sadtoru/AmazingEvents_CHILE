import { drawCards, drawCheckboxs, superFilter } from "./functions.js";

/* container de las cards seleccionado del index que toma de referencia */
  let container = document.getElementById('cards');

  /* container de las categorias seleccionado del index que toma de referencia */
  let containerCategories = document.getElementById('categories-container');

  /* container del search seleccionado del index que toma de referencia */
  let searchBar = document.getElementById('search')

async function getIndex(){
  await fetch ("../data/amazing.json")
  .then(response => response.json())
  .then(data => {
  
  /* guardando la data */
  let dataEvents = data.events

  /* funcion que pinta las cartas con sus respectivos parametros */
  drawCards(dataEvents, container);

  /* funcion que pinta los checkboxs con sus respectivos parametros */
  drawCheckboxs(dataEvents, containerCategories);

  /* evento que escucha el input con el superFilter*/
  searchBar.addEventListener('input', () => superFilter(dataEvents, container, searchBar));

  /* evento que escucha el contenedor de categorias con el superFilter*/
  containerCategories.addEventListener('change', () => superFilter(dataEvents, container, searchBar));

  }).catch(error => console.error(error))
}

getIndex();