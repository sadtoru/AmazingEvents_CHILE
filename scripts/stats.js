import { getData, eventWithMostAssistance, eventWithLowestAssistance, eventWithLargestCapacity, groupByCategory, insertingData} from "./functions.js";

const getStats = async () => {
    const data = await getData();
    if (!data) {
        console.log("Couldn't find any data");
        return;
    }
    const currentDate = data.currentDate;
    const events = data.events;

    const upcomingEvents = events.filter((event) => {
        return event.date > currentDate;});
    const pastEvents = data.events.filter((event) => {
        return event.date < data.currentDate;});

    const highestPercentage = document.getElementById("eventHighest");
    const lowestPercentage = document.getElementById("eventLowest");
    const largestCapacity = document.getElementById("eventLargerCapacity");
    const upcomingEventsStats = document.getElementById("upcomingEventsByCategories")
    const pastEventsStats = document.getElementById("pastEventsByCategories")


    let eventWithHighestPercentageAssistance = eventWithMostAssistance(events);
    let eventLowestPercentageAssistance = eventWithLowestAssistance(events);
    let eventLargestCapacity = eventWithLargestCapacity(events);
    
    insertingData(eventWithHighestPercentageAssistance, highestPercentage); 
    insertingData(eventLowestPercentageAssistance, lowestPercentage);
    insertingData(eventLargestCapacity, largestCapacity);
    
    groupByCategory(upcomingEvents, upcomingEventsStats)
    groupByCategory(pastEvents, pastEventsStats)

}
getStats();

