import { createDetailCard, getData } from "./functions.js"

const getDetails = async () => {
    const data = await getData();
    if (!data) {
      console.log("Couldn't find any data");
      return;
    }

const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get('id');

const card = data.events.find(card => card._id == cardId);

let detailContainer = document.getElementById('detailContainer');

createDetailCard(card, detailContainer)

}

getDetails();