import { futureEvents, drawCards, drawCheckboxs, listCategories, filterByCategory, filterByInput, selectedCategory } from "./functions.js";

/* container de las cards de eventos futuros seleccionado del index que toma de referencia */
let container = document.getElementById("upcoming");

/* container de las categorias seleccionado del index que toma de referencia*/
let containerCategories = document.getElementById('categories-container');

/* container del search seleccionado del index que toma de referencia */
let searchBar = document.getElementById('search');

async function getUpcoming(){
    await fetch ("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
    
    /* guardando la data */
    let dataEvents = data.events

    /* llamado a las categorias con su array*/
    let categories = listCategories(dataEvents);
  
    /* funcion que pinta las cartas futuras con sus respectivos parametros */
    drawCards(futureEvents(data), container);

    /* funcion que pinta los checkboxs con sus respectivos parametros */
    drawCheckboxs(categories, containerCategories);

    /* evento que escucha el input */
    searchBar.addEventListener('input', superFilter);

    /* evento que escucha el contenedor de categorias */
    containerCategories.addEventListener('change', superFilter);

    /* funcion que combina los filtros y tiene en cuenta las categorias seleccionadas */
    function superFilter() {
        let filteredEvents = filterByInput(dataEvents, searchBar.value);
        let selectedCategories = selectedCategory();
        if (selectedCategories.length > 0) {
            filteredEvents = filterByCategory(filteredEvents, selectedCategories);
        }
        let pastEventsArray = futureEvents({ events: filteredEvents, currentDate: data.currentDate });
        if (pastEventsArray.length > 0) {
            drawCards(pastEventsArray, container);
        } else {
            container.innerHTML = "<p>Oops nothing to see here!</p>";
        }
    }
  
    }).catch(error => console.error(error))
  }

getUpcoming();