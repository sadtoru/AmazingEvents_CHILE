import data from "./amazing.js";
import { pastEvents, drawCards, drawCheckboxs, listCategories, filterByCategory, filterByInput, selectedCategory } from "./functions.js";

/* container de las cards de eventos pasados seleccionado del index que toma de referencia */
let container = document.getElementById("past");

/* container de las categorias seleccionado del index que toma de referencia*/
let containerCategories = document.getElementById('categories-container');

/* container del search seleccionado del index que toma de referencia */
let searchBar = document.getElementById('search')

/* llamado a las categorias con su array*/
let categories = listCategories(data.events);

/* funcion que pinta las cartas pasadas */
drawCards(pastEvents(data), container);

/* funcion que pinta los checkboxs con sus respectivos parametros */
drawCheckboxs(categories, containerCategories);

/* evento que escucha el input */
searchBar.addEventListener('input', superFilter);

/* evento que escucha el contenedor de categorias */
containerCategories.addEventListener('change', superFilter);

/* funcion que combina los filtros y tiene en cuenta las categorias seleccionadas */
function superFilter() {
    let filteredEvents = filterByInput(data.events, searchBar.value);
    let selectedCategories = selectedCategory();
    if (selectedCategories.length > 0) {
        filteredEvents = filterByCategory(filteredEvents, selectedCategories);
    }
    let pastEventsArray = pastEvents({ events: filteredEvents, currentDate: data.currentDate });
    if (pastEventsArray.length > 0) {
        drawCards(pastEventsArray, container);
    } else {
        container.innerHTML = "<p>Oops nothing to see here!</p>";
    }
}

