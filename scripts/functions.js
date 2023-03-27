/* funcion que trae por si sola los past events */
function pastEvents(myData) {
  // filtramos los eventos cuya fecha es menor a la actual
  return myData.events.filter((event) => event.date < myData.currentDate);
}

/* funcion que trae por si sola los future events */
function futureEvents(myData) {
  // filtramos los eventos cuya fecha es mayor a la actual
  return myData.events.filter((event) => event.date > myData.currentDate);
}

/* funcion que pinta las cartas en el html con su respectivo container */
function drawCards(arr, container) {
  // se crea un fragmento de documento para almacenar los elementos creados
  let fragment = document.createDocumentFragment();
  // se vacía el contenido del contenedor antes de pintar las cartas
  container.innerHTML = '';
  // se recorre el array de objetos y se crea un div con la información de cada objeto
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
  // si el array está vacío, se muestra el mensaje
  if (arr.length == 0) {
    container.innerHTML = `<h3>Oops! Nothing to see here.</h3>`;
  }
  // se añade el fragmento al contenedor que muestra las cartas en el html
  container.appendChild(fragment);
}

/* detalle de las cartas pintadas con su respectivo container */
function createDetailCard(arr, container) {
  // crear un elemento div que será la tarjeta de detalle
  let div = document.createElement("div");
  div.classList = "card mb-3 large-card";
   // asignar el contenido html a la tarjeta de detalle
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
                // agregar la tarjeta de detalle al contenedor especificado
  return container.appendChild(div);
}

/* función que guarda las únicas categorías */
function uniqueCategories(events) {
  // iteramos con el reduce por cada evento del array y agrega sus categorías únicas a uno nuevo
  return events.reduce((acc, curr) => {
    // si el array no incluye la categoría del evento actual, se agrega al array de categorías únicas
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  }, []); // se devuelve el array con las categorías únicas
}

/* función que dibuja checkboxes correspondientes a las categorías */
function drawCheckboxs(array, container) {
  // crear un fragmento de documento
  const fragment = document.createDocumentFragment();
  // obtener las categorías únicas usando la función uniqueCategories
  let categories = uniqueCategories(array);
  // por cada categoría crear un div con un checkbox y una etiqueta
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList = "form-check form-check-inline";
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
      <label class="form-check-label" for="${category}">${category}</label>
    `;
    // agrega el div creado al fragmento de documento
    fragment.appendChild(div);
  });
  // agrega el fragmento de documento al contenedor especificado
  container.appendChild(fragment);
}

/* funcion filtrar por categorías */
function filterByCategory(array) {
  // obtener todos los checkbox de categorías
  let checkboxsCaptured = document.querySelectorAll('input[class="form-check-input"]');
  // convertir la nodeList en un array
  let checkboxsArray = Array.from(checkboxsCaptured);
  // filtrar los checkbox que están marcados
  let checkboxsChecked = checkboxsArray.filter(checkes => checkes.checked);
  // bbtener un array de categorías seleccionadas
  let checkboxsMap = checkboxsChecked.map(checkeds => checkeds.value);
  // filtrar los eventos que coinciden con las categorías seleccionadas
  let checkboxsFiltered = array.filter(e => checkboxsMap.includes(e.category))
  // si hay al menos un checkbox seleccionado, devolver los eventos filtrados
  if (checkboxsChecked.length > 0) {
    return checkboxsFiltered
  }
  // si no hay checkbox seleccionados, devolver todos los eventos
  return array
}

/* funcion que filtra según el texto */
function filterByInput(array, userText) {
  // creamos una variable auxiliar y filtramos el array original con "filter"
  // para que solo queden los elementos cuyo nombre incluya el texto ingresado por el usuario
  let arrayAux = array.filter(item => item.name.toLowerCase().includes(userText.toLowerCase().trim()));
  // devolvemos el array filtrado
  return arrayAux;
}

/* funcion de super filtro que utiliza filterByCategory y filterByInput*/
function superFilter(array, container, searchBar) {
  // se aplica el filtrado por categoría
  let filteredEvent = filterByCategory(array)
  // se aplica el filtrado de texto del usuario
  filteredEvent = filterByInput(filteredEvent, searchBar.value)
  // se llama a la función drawCards para mostrar las tarjetas
  drawCards(filteredEvent, container)
}

/* funcion que muestra el evento con más asistencia */
function eventWithMostAssistance(events) {
  // se hace una copia del array original
  const sortedEvents = events.slice();
  // se ordena el array de eventos en orden descendente
  sortedEvents.sort((eventA, eventB) => {
    // se obtiene la asistencia o estimación, y se establece en 0 si no está definido
    let attendanceA = eventA.assistance || eventA.estimate || 0;
    let attendanceB = eventB.assistance || eventB.estimate || 0;
    // se calcula el porcentaje de capacidad
    let percentageA = (attendanceA / eventA.capacity) * 100;
    let percentageB = (attendanceB / eventB.capacity) * 100;
    // se resta el porcentaje de capacidad de eventB al porcentaje de eventA
    return percentageB - percentageA;
  });
   // se devuelve el nombre del primer evento en el array ordenado
  return sortedEvents[0].name;
}

/* funcion que muestra el evento con menos asistencia */
function eventWithLowestAssistance(events) {
  // se hace una copia del array original
  const sortedEvents = events.slice();
  // se ordena el array de eventos en orden ascendente
  sortedEvents.sort((eventA, eventB) => {
    // se obtiene la asistencia o estimación, y se establece en 0 si no está definido
    let attendanceA = eventA.assistance || eventA.estimate || 0;
    let attendanceB = eventB.assistance || eventB.estimate || 0;
    // se calcula el porcentaje de capacidad
    let percentageA = (attendanceA / eventA.capacity) * 100;
    let percentageB = (attendanceB / eventB.capacity) * 100;
    // se resta el porcentaje de capacidad de eventA al porcentaje de eventB
    return percentageA - percentageB;
  });
  // se devuelve el nombre del primer evento en el array ordenado
  return sortedEvents[0].name;
}

/* funcion que muestra el evento con mayor capacidad */
function eventWithLargestCapacity(events) {
  // se hace una copia del array original
  let sortedEvents = events.slice();
  // se ordena el array en orden descendente de acuerdo a la capacidad
  sortedEvents.sort((a, b) => {
    return b.capacity - a.capacity;
  });
   // se devuelve el nombre del primer evento con mayor capacidad
  return sortedEvents[0].name;
}

/* funcion que calcula las ganancias totales */
function calculateRevenues(events) {
   // se inicializa la variable en 0
  let revenues = 0;
  // se itera sobre cada evento en el array
  events.forEach(event => {
    // se calcula la ganancia del evento multiplicando su precio por su asistencia o estimación
    const revenue = event.price * (event.estimate || event.assistance);
    // se agrega la ganancia del evento a la variable
    revenues += revenue;
  });
  // se devuelve el total de ganancias
  return revenues;
}

/* funcion que calcula el porcentaje de asistencia */
function calculateAttendancePercentage(events) {
  // se inicializan las variables de asistencia total y capacidad total en 0
  let totalAssistance = 0;
  let capacity = 0;
  // se itera sobre cada evento en el array 
  for (let event of events) {
    // se agrega la asistencia del evento a la variable de asistencia total
    totalAssistance += event.assistance ? event.assistance : (event.estimate ? event.estimate : 0);
    // se agrega la capacidad del evento a la variable de capacidad total
    capacity += event.capacity ? event.capacity : 0;
  }
  // se calcula el porcentaje de asistencia promedio, se redondea a dos decimales
  // y se devuelve como un string
  return ((totalAssistance / capacity) * 100).toFixed(2);
}

/* función que agrupa los eventos por categoría y muestra una tabla con las estadísticas */
function groupByCategory(events, container) {
  // se agrupan los eventos por categoría utilizando reduce para iterar sobre el array
  // y agregar cada evento al grupo correspondiente
  const groupedCategories = events.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {});
  // se inicializa la variable para la tabla vacía
  let table = '';
  // se itera sobre cada categoría
  for (let category in groupedCategories) {
    // se obtienen los eventos en la categoría actual
    let events = groupedCategories[category];
    // se calculan las ganancias y el porcentaje de asistencia para los eventos
    let revenues = calculateRevenues(events);
    let percentageAttendance = calculateAttendancePercentage(events);
    // se agrega una fila a la tabla con la categoría, las ganancias y el porcentaje de asistencia
    table += `<tr>
      <td>${category}</td>
      <td>$${revenues}</td>
      <td>${percentageAttendance}%</td>
    </tr>`
  }
  // se establece el contenido al contenedor proporcionado
  container.innerHTML = table;
}

/* funcion que dibuja las estadísticas con su respectivo container */
function drawStats(array, container) {
  // extraemos el array de eventos
  const events = array.events;
  // obtenemos los nombres de los eventos con más, menos asistencia y mayor capacidad
  const mostAttendance = eventWithMostAssistance(events);
  const lowestAttendance = eventWithLowestAssistance(events);
  const largeCapacity = eventWithLargestCapacity(events);
  // creamos un elemento "tr" para mostrar los resultados y le asignamos su contenido
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${mostAttendance}</td>
                  <td>${lowestAttendance}</td>
                  <td>${largeCapacity}</td>`;
                  // agregamos el elemento "tr" al contenedor especificado
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
