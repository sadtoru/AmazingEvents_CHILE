import data from "./amazing.js";
import { createDetailCard } from "./functions.js"


const queryString = location.search;
const params = new URLSearchParams(queryString);
const cardId = params.get('id');

const card = data.events.find(card => card._id == cardId);

let detailContainer = document.getElementById('detailContainer');

createDetailCard(card, detailContainer)

