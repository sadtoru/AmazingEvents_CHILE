import { pastEvents, futureEvents, groupByCategory, drawStats } from "./functions.js";

/* container de la tabla */
let table = document.getElementById("table")

/* container de la tabla de eventos pasados */
let pastEventsStats = document.getElementById("pastEventsByCategories")

/* container de la tabla de eventos futuros */
let upcomingEventsStats = document.getElementById("upcomingEventsByCategories")

/* función asincrónica que obtiene los datos del archivo JSON y los procesa */
async function getStats() {
    // hacer una petición para obtener el archivo JSON con la data
    await fetch("../data/amazing.json")
        // convertir la respuesta a formato JSON
        .then(response => response.json())
        // procesar la data obtenida
        .then(data => {

            // obtener eventos pasados y futuros
            let past = pastEvents(data);
            let future = futureEvents(data);
            // dibujar estadísticas en la tabla
            drawStats(data, table);
            // agrupar eventos futuros y pasados por categoría y dibujar estadísticas
            groupByCategory(future, upcomingEventsStats)
            groupByCategory(past, pastEventsStats)

        })
}

/* llamamos a la función para la obtención y procesamiento de los datos */
getStats();

