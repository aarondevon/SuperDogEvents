// Initial event data
const eventData = [{event: "ComicCon",city: "New York",state: "New York",attendance: 240000,date: "06/01/2017"},
{event: "ComicCon",city: "New York",state: "New York",attendance: 250000,date: "06/01/2018"},
{event: "ComicCon",city: "New York",state: "New York",attendance: 257000,date: "06/01/2019"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 130000,date: "06/01/2017"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 140000,date: "06/01/2018"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 150000,date: "06/01/2019"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 40000,date: "06/01/2017"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 45000,date: "06/01/2018"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 50000,date: "06/01/2019"}]

// get initial HTML elments
const dropdownMenu = document.querySelector('#dropdown-menu');
const tableMainBody = document.querySelector('#table-main-body');

// get states 
const getStates = () => {
  const uniqueStates = [];
  let state;
  eventData.forEach(eventObj => {
    state = eventObj.state;
    if (!uniqueStates.includes(state)) {
        uniqueStates.push(state);
    }
  })
  console.log(uniqueStates);
  return uniqueStates;
};

// Create dropdown menu
const populateDropdownMenu = () => {
  const states = getStates();

  states.forEach(state => {
    const aTag = document.createElement('a')
    aTag.classList.add("dropdown-item");
    aTag.setAttribute('href', '#')
    aTag.setAttribute('id', `${state}`);
    aTag.innerText = state;
    dropdownMenu.appendChild(aTag);
  })
}

// Populate table with data
const populateTable = (dataSrc, table) => {

  dataSrc.forEach(eventObj => {
    const tableRow = document.createElement('tr');
    for (let key in eventObj) {
      const tableData = document.createElement('td');
      tableData.innerText = eventObj[key];
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  })
};

// Get stats
const getStats = (event) => {
  const state = event.target.id;

  let totalAttendance = 0;
  let totalEvents = 0;
  let mostAttended = 0;
  let leastAttended = 0;

  // get total attendance and total events
  eventData.forEach(eventObj => {
    if (eventObj.state === state )
    {
      totalAttendance += eventObj.attendance;
      totalEvents ++;
    }

    if (eventObj.attendance > mostAttended) {
      mostAttended = eventObj.attendance;
    }
  })

  return ({
    "State": state,
    "Total Attendance": totalAttendance,
    "Average Attendance": totalAttendance / totalEvents,
    "Most Attended": mostAttended,
    "Least Attended": leastAttended
  });
};

const statTablePrinter = (stats) => {
  const tableStats = document.querySelector('#table-stats');
  tableStats.innerHTML = '';

  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');
  const tableHeadData = document.createElement('th');

  const tableStatsBody = document.createElement('tbody');
  
  // Create table data
  for (key in stats) {
    if (key === 'State') {
      tableHeadData.setAttribute('colspan', 2);
      tableHeadData.innerText = `Stats For ${stats.State} Events`;
      tableHeadRow.appendChild(tableHeadData);
      tableHead.appendChild(tableHeadRow);
      tableStats.appendChild(tableHead);
    }
    const tableBodyRow = document.createElement('tr');
    const tableData1 = document.createElement('td');
    tableData1.innerText = key;
    const tableData2 = document.createElement('td');
    tableData2.innerText = stats[key];
console.log(tableData2);
    tableBodyRow.appendChild(tableData1);
    tableBodyRow.appendChild(tableData2);

    tableStatsBody.appendChild(tableBodyRow);
  }
  tableStats.appendChild(tableStatsBody);
}



document.onload = populateDropdownMenu();
document.onload = populateTable(eventData, tableMainBody);

dropdownMenu.addEventListener('click', (event) => {
  statTablePrinter(getStats(event));
  // console.log(event.target.id);
})