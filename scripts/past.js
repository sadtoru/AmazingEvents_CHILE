import { pastEvents, drawCards, drawCheckboxs, superFilter } from "./functions.js";

/* container de las cards de eventos pasados seleccionado del index que toma de referencia */
let container = document.getElementById("past");

/* container de las categorias seleccionado del index que toma de referencia*/
let containerCategories = document.getElementById('categories-container');

/* container del search seleccionado del index que toma de referencia */
let searchBar = document.getElementById('search');

async function getPast(){
    await fetch ("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
    
    /* guardando la data */
    let past = pastEvents(data);

    let dataEvents = data.events;
    
    /* funcion que pinta las cartas pasadas */
    drawCards(past, container);

    /* funcion que pinta los checkboxs con sus respectivos parametros */
    drawCheckboxs(dataEvents, containerCategories);

    /* evento que escucha el input */
    searchBar.addEventListener('input', () => superFilter(past, container, searchBar));

    /* evento que escucha el contenedor de categorias */
    containerCategories.addEventListener('change', () => superFilter(past, container, searchBar));
  
    }).catch(error => console.error(error))
  }

getPast();