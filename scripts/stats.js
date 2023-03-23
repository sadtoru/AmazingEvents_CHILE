import { eventWithMostAssistance, eventWithLowestAssistance, eventWithLargestCapacity, groupByCategory, insertingData } from "./functions.js";

async function getStats() {
    await fetch("../data/amazing.json")
        .then(response => response.json())
        .then(data => {
            let currentDate = data.currentDate;
            let events = data.events;

            let upcomingEvents = events.filter((event) => {
                return event.date > currentDate;
            });
            let pastEvents = data.events.filter((event) => {
                return event.date < data.currentDate;
            });

            let highestPercentage = document.getElementById("eventHighest");
            let lowestPercentage = document.getElementById("eventLowest");
            let largestCapacity = document.getElementById("eventLargerCapacity");
            let upcomingEventsStats = document.getElementById("upcomingEventsByCategories")
            let pastEventsStats = document.getElementById("pastEventsByCategories")


            let eventWithHighestPercentageAssistance = eventWithMostAssistance(events);
            let eventLowestPercentageAssistance = eventWithLowestAssistance(events);
            let eventLargestCapacity = eventWithLargestCapacity(events);

            insertingData(eventWithHighestPercentageAssistance, highestPercentage);
            insertingData(eventLowestPercentageAssistance, lowestPercentage);
            insertingData(eventLargestCapacity, largestCapacity);

            groupByCategory(upcomingEvents, upcomingEventsStats)
            groupByCategory(pastEvents, pastEventsStats)

        })
}

getStats();

