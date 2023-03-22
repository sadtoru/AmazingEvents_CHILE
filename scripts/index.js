import { drawCards, drawCheckboxs, listCategories, filterByCategory, filterByInput, getData } from "./functions.js";

const getIndex = async () => {
  const data = await getData();
  if (!data) {
    console.log("Couldn't find any data");
    return;
  }

  /* container de las cards seleccionado del index que toma de referencia */
  let container = document.getElementById('cards');

  /* container de las categorias seleccionado del index que toma de referencia*/
  let containerCategories = document.getElementById('categories-container');

  /* container del search seleccionado del index que toma de referencia */
  let searchBar = document.getElementById('search')

  /* llamado a las categorias con su array*/
  let categories = listCategories(data.events);

  /* funcion que pinta las cartas con sus respectivos parametros*/
  drawCards(data.events, container);

  /* funcion que pinta los checkboxs con sus respectivos parametros */
  drawCheckboxs(categories, containerCategories);

  /* evento que escucha el input */
  searchBar.addEventListener('input', superFilter);

  /* evento que escucha el contenedor de categorias */
  containerCategories.addEventListener('change', superFilter);

  /* funcion que combina los filtros */
  function superFilter() {
    let firstFilter = filterByInput(data.events, searchBar.value);
    let secondFilter = filterByCategory(firstFilter);
    drawCards(secondFilter, container);
  }
}

getIndex();