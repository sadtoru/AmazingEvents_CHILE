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
    container.innerHTML = `<h1>Oops! Nothing to see here.</h1>`;
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
let uniqueCategories = (events) => {
  return events.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
          acc.push(curr.category);
      }
      return acc;
  }, []);
};

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
function superFilter(array, container, searchBar){
  let filteredEvent = filterByCategory(array)
  filteredEvent = filterByInput(filteredEvent, searchBar.value)
  drawCards(filteredEvent, container)
}

/* funcion que muestra el evento con más asistencia */
function eventWithMostAssistance(events) {
  let highestAttendancePercentage = -1;
  let eventWithHighestAttendance = "";
  events.forEach(function (event) {
    const attendance = event.assistance ? event.assistance : event.estimate;
    const capacity = event.capacity;
    const percentage = (attendance / capacity) * 100;
    if (percentage > highestAttendancePercentage) {
      highestAttendancePercentage = percentage;
      eventWithHighestAttendance = event.name;
    }
  });
  return eventWithHighestAttendance;
}

/* funcion que muestra el evento con menos asistencia */
function eventWithLowestAssistance(events) {
  let sortedEvents = events.slice().sort(function (a, b) {
    const aAttendance = a.assistance || a.estimate || 0;
    const bAttendance = b.assistance || b.estimate || 0;
    const aPercentage = (aAttendance / a.capacity) * 100;
    const bPercentage = (bAttendance / b.capacity) * 100;
    return aPercentage - bPercentage;
  });
  return sortedEvents[0].name;
}

/* funcion que muestra el evento con mayor capacidad */
function eventWithLargestCapacity(events) {
  let sortedEvents = events.slice().sort(function (a, b) {
    return b.capacity - a.capacity;
  });
  return sortedEvents[0].name;
}

/* funcion calcular ganancias totales */
function calculateRevenues(events) {
  let revenues = 0; events.forEach(event => {
    const revenue = event.price * (event.estimate || event.assistance);
    revenues += revenue;
  });
  return revenues;
}

/* funcion calcular el porcentaje de asistencia */
function calculateAttendancePercentage(events) {
  const totalAssistance = events.reduce((total, event) => {
    return total + (event.estimate || event.assistance);
  }, 0);
  const capacity = events.reduce((maxCapacity, event) => {
    return event.capacity > maxCapacity ? event.capacity : maxCapacity;
  }, 0);
  return (totalAssistance / (events.length * capacity)) * 100;
}

/* funcion que crea la tabla */
function createTable(category, revenues, attendancePercentage, container) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${category}</td>
                  <td>$${revenues}</td>
                  <td>${attendancePercentage.toFixed(2)}%</td>`;
  container.appendChild(tr);
}

/* funcion que agrupa por categoria */
function groupByCategory(events, container) {
  const groupedCategories = events.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {});

  for (const category in groupedCategories) {
    const events = groupedCategories[category];
    const revenues = calculateRevenues(events);
    const attendancePercentage = calculateAttendancePercentage(events);
    createTable(category, revenues, attendancePercentage, container);
  }
}

/* funcion que inserta la data en un container */
function insertingData(event, container) {
  container.innerText = event;
}

export {
  pastEvents,
  futureEvents,
  drawCards,
  drawCheckboxs,
  createDetailCard,
  eventWithMostAssistance,
  eventWithLowestAssistance,
  eventWithLargestCapacity,
  createTable,
  groupByCategory,
  insertingData,
  superFilter
}
