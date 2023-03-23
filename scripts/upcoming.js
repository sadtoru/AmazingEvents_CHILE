import { futureEvents, drawCards, drawCheckboxs, superFilter } from "./functions.js";

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
    let future = futureEvents(data);

    let dataEvents = data.events;
    
    /* funcion que pinta las cartas futuras con sus respectivos parametros */
    drawCards(future, container);

    /* funcion que pinta los checkboxs con sus respectivos parametros */
    drawCheckboxs(dataEvents, containerCategories);

    /* evento que escucha el input */
    searchBar.addEventListener('input', () => superFilter(future, container, searchBar));

    /* evento que escucha el contenedor de categorias */
    containerCategories.addEventListener('change', () => superFilter(future, container, searchBar));
  
    }).catch(error => console.error(error))
  }

getUpcoming();