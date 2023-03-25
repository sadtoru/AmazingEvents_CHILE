import { pastEvents, futureEvents, groupByCategory, drawStats } from "./functions.js";

/* container de la tabla */
let table = document.getElementById("table")

/* container de la tabla de eventos pasados */
let pastEventsStats = document.getElementById("pastEventsByCategories")

/* container de la tabla de eventos futuros */
let upcomingEventsStats = document.getElementById("upcomingEventsByCategories")

async function getStats() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {

            let past = pastEvents(data);
            let future = futureEvents(data);

            drawStats(data, table);

            groupByCategory(future, upcomingEventsStats)
            groupByCategory(past, pastEventsStats)

        })
}

getStats();

