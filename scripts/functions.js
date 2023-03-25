/* funcion que trae por si sola los past events */
function pastEvents(myData) {
  return myData.events.filter((event) => event.date < myData.currentDate);
}

/* funcion que trae por si sola los future events */
function futureEvents(myData) {
  return myData.events.filter((event) => event.date > myData.currentDate);
}

/* funcion que pinta las cartas en el html */
function drawCards(arr, container) {
  let fragment = document.createDocumentFragment();
  container.innerHTML = '';
  for (const item of arr) {
    let div = document.createElement('div');
    div.classList = 'col-12 col-md-6 col-lg-3 gap-4 mt-3';
    div.innerHTML = `
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top img-thumbnail p-3"
          alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text category">${item.category}</p>
          <p class="card-text">${item.date}</p>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center align-items-center">
            <h6 class="mx-2 pt-2">$${item.price}</h6>
            <a class="btn-more py-2 px-2 text-light mx-2" href="../pages/details.html?id=${item._id}">Details</a>
          </div>
        </div>
      </div>
    `;
    fragment.appendChild(div);
  }
  if (arr.length == 0) {
    container.innerHTML = `<h3>Oops! Nothing to see here.</h3>`;
  }
  container.appendChild(fragment);
}

/* detalle de las cartas pintadas */
function createDetailCard(arr, container) {
  let div = document.createElement("div");
  div.classList = "card mb-3 large-card";
  div.innerHTML = `
                <div class="row">
                            <div class="col-12 col-md-6 d-flex justify-content-center">
                                <img src="${arr.image}" class="img-fluid img-large pt-5" alt="Image large card">
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title pt-5 d-flex justify-content-center">${arr.name}</h5>
                                    <ul>
                                        <li class="list">Name: ${arr.name}</li>
                                        <li class="list">Date: ${arr.date}</li>
                                        <li class="list">Description: ${arr.description}</li>
                                        <li class="list">Category: ${arr.category}</li>
                                        <li class="list">Place: ${arr.place}</li>
                                        <li class="list">Capacity: ${arr.capacity}</li>
                                        <li class="list">${arr.assistance ? "Assistance" : "Estimate"}: ${arr.assistance ? arr.assistance : arr.estimate}</li>
                                        <li class="list">Price: $${arr.price}</li>
                                    </ul>
                                </div>
                                <div class="d-md-flex justify-content-md-end">
                                  <a href="javascript:history.back()" class="text-light btn-back py-2 px-2 m-1">Go Back</a>
                                </div>  
                              </div>
                        </div>
                `;
  return container.appendChild(div);
}

/* función que guarda las únicas categorias */
function uniqueCategories(events) {
  return events.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []);
}

/* funcion de dibujar checkboxs con la funcion de uniqueCategories*/
function drawCheckboxs(array, container) {
  const fragment = document.createDocumentFragment();
  let categories = uniqueCategories(array);
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList = "form-check form-check-inline";
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" for="${category}">${category}</label>
    `;
    fragment.appendChild(div);
  });
  container.appendChild(fragment);
}

/* funcion filtrar por categorias */
function filterByCategory(array) {
  let checkboxsCaptured = document.querySelectorAll('input[class="form-check-input"]');
  let checkboxsArray = Array.from(checkboxsCaptured);
  let checkboxsChecked = checkboxsArray.filter(checkes => checkes.checked);
  let checkboxsMap = checkboxsChecked.map(checkeds => checkeds.value);
  let checkboxsFiltered = array.filter(e => checkboxsMap.includes(e.category))
  if (checkboxsChecked.length > 0) {
    return checkboxsFiltered
  }
  return array
}

/* funcion filtrar por input */
function filterByInput(array, userText) {
  let arrayAux = array.filter(item => item.name.toLowerCase().includes(userText.toLowerCase().trim()));
  return arrayAux;
}

/* super filtro que utiliza filterByCategory y filterByInput*/
function superFilter(array, container, searchBar) {
  let filteredEvent = filterByCategory(array)
  filteredEvent = filterByInput(filteredEvent, searchBar.value)
  drawCards(filteredEvent, container)
}

/* funcion que muestra el evento con más asistencia */
function eventWithMostAssistance(events) {
  const sortedEvents = events.slice();
  sortedEvents.sort((eventA, eventB) => {
    let attendanceA = eventA.assistance || eventA.estimate || 0;
    let attendanceB = eventB.assistance || eventB.estimate || 0;
    let percentageA = (attendanceA / eventA.capacity) * 100;
    let percentageB = (attendanceB / eventB.capacity) * 100;
    return percentageB - percentageA;
  });
  return sortedEvents[0].name;
}

/* funcion que muestra el evento con menos asistencia */
function eventWithLowestAssistance(events) {
  const sortedEvents = events.slice();
  sortedEvents.sort((eventA, eventB) => {
    let attendanceA = eventA.assistance || eventA.estimate || 0;
    let attendanceB = eventB.assistance || eventB.estimate || 0;
    let percentageA = (attendanceA / eventA.capacity) * 100;
    let percentageB = (attendanceB / eventB.capacity) * 100;
    return percentageA - percentageB;
  });
  return sortedEvents[0].name;
}

/* funcion que muestra el evento con mayor capacidad */
function eventWithLargestCapacity(events) {
  let sortedEvents = events.slice();
  sortedEvents.sort((a, b) => {
    return b.capacity - a.capacity;
  });
  return sortedEvents[0].name;
}

/* funcion calcular ganancias totales */
function calculateRevenues(events) {
  let revenues = 0;
  events.forEach(event => {
    const revenue = event.price * (event.estimate || event.assistance);
    revenues += revenue;
  });
  return revenues;
}

/* funcion calcular el porcentaje de asistencia */
function calculateAttendancePercentage(events) {
  let totalAssistance = 0;
  let capacity = 0;
  for (let event of events) {
    totalAssistance += event.assistance ? event.assistance : (event.estimate ? event.estimate : 0);
    capacity += event.capacity ? event.capacity : 0;
  }
  return ((totalAssistance / capacity) * 100).toFixed(2);
}

function groupByCategory(events, container) {
  const groupedCategories = events.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {});

  let table = '';
  for (let category in groupedCategories) {
    let events = groupedCategories[category];
    let revenues = calculateRevenues(events);
    let percentageAttendance = calculateAttendancePercentage(events);
    table += `<tr>
      <td>${category}</td>
      <td>$${revenues}</td>
      <td>${percentageAttendance}%</td>
    </tr>`
  }

  container.innerHTML = table;
}

function drawStats(array, container) {
  const events = array.events;

  const mostAttendance = eventWithMostAssistance(events);
  const lowestAttendance = eventWithLowestAssistance(events);
  const largeCapacity = eventWithLargestCapacity(events);

  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${mostAttendance}</td>
                  <td>${lowestAttendance}</td>
                  <td>${largeCapacity}</td>`;
  container.appendChild(tr);

}

export {
  pastEvents,
  futureEvents,
  drawCards,
  drawCheckboxs,
  createDetailCard,
  groupByCategory,
  superFilter,
  drawStats
}
