import { drawCards, drawCheckboxs, listCategories, filterByCategory, filterByInput } from "./functions.js";

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

    /* llamado a las categorias con su array */
  let categories = listCategories(dataEvents);

  /* funcion que pinta las cartas con sus respectivos parametros */
  drawCards(dataEvents, container);

  /* funcion que pinta los checkboxs con sus respectivos parametros */
  drawCheckboxs(categories, containerCategories);

  /* evento que escucha el input */
  searchBar.addEventListener('input', superFilter);

  /* evento que escucha el contenedor de categorias */
  containerCategories.addEventListener('change', superFilter);

  /* funcion que combina los filtros */
  function superFilter() {
    let firstFilter = filterByInput(dataEvents, searchBar.value);
    let secondFilter = filterByCategory(firstFilter);
    drawCards(secondFilter, container);
  }

  }).catch(error => console.error(error))
}

getIndex();