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

// get cities
const getCities = () => {
  const uniqueCities = [];
  let city;
  eventData.forEach(eventObj => {
    city = eventObj.city;
    if (!uniqueCities.includes(city)) {
      uniqueCities.push(city);
    }
  })
  console.log(uniqueCities);
  return uniqueCities;
};

// Create dropdown menu
const populateDropdownMenu = () => {
  const cities = getCities();

  cities.forEach(city => {
    const aTag = document.createElement('a')
    aTag.classList.add("dropdown-item");
    aTag.setAttribute('href', '#')
    aTag.setAttribute('id', `${city.toLowerCase()}`);
    aTag.innerText = city;
    dropdownMenu.appendChild(aTag);
  })
  const aTag = document.createElement('a')
    aTag.classList.add("dropdown-item");
    aTag.setAttribute('href', '#')
    aTag.setAttribute('id', `all`);
    aTag.innerText = 'All';
    dropdownMenu.appendChild(aTag);
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
const getEventStats = (event) => {
  const city = event.target.innerText;

  let totalAttendance = 0;
  let totalEvents = 0;
  let mostAttended = 0;
  let attended = [];
  let leastAttended = 0;

  // get total attendance and total events
  eventData.forEach(eventObj => {
    if (eventObj.city === city || city === 'All')
    {
      totalAttendance += eventObj.attendance;
      totalEvents ++;

      attended.push(eventObj.attendance);

      if (eventObj.attendance > mostAttended) {
        mostAttended = eventObj.attendance;
      }
    } 

    leastAttended = attended[0];
    //find least attended event
    attended.forEach(attendance => {
      if (attendance < leastAttended) {
        leastAttended = attendance;
      }
    })

  })

  return ({
    "City": city,
    "Total Attendance": totalAttendance.toLocaleString('en'),
    "Average Attendance": Math.round(totalAttendance / totalEvents).toLocaleString('en'),
    "Most Attended": mostAttended.toLocaleString('en'),
    "Least Attended": leastAttended.toLocaleString('en')
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
    if (key === 'City') {
      tableHeadData.setAttribute('colspan', 2);
      tableHeadData.innerText = `Stats For ${stats.City} Events`;
      tableHeadRow.appendChild(tableHeadData);
      tableHead.appendChild(tableHeadRow);
      tableStats.appendChild(tableHead);
    } else {
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

  }
  tableStats.appendChild(tableStatsBody);
}



document.onload = populateDropdownMenu();
document.onload = populateTable(eventData, tableMainBody);

dropdownMenu.addEventListener('click', (event) => {
  statTablePrinter(getEventStats(event));
  // console.log(event.target.id);
})