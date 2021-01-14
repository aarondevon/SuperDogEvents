const eventData = [{event: "ComicCon",city: "New York",state: "New York",attendance: 240000,date: "06/01/2017"},
{event: "ComicCon",city: "New York",state: "New York",attendance: 250000,date: "06/01/2018"},
{event: "ComicCon",city: "New York",state: "New York",attendance: 257000,date: "06/01/2019"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 130000,date: "06/01/2017"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 140000,date: "06/01/2018"},
{event: "ComicCon",city: "San Diego",state: "California",attendance: 150000,date: "06/01/2019"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 40000,date: "06/01/2017"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 45000,date: "06/01/2018"},
{event: "HeroesCon",city: "Charlotte",state: "North Carolina",attendance: 50000,date: "06/01/2019"}]

const dropdownMenu = document.querySelector('#dropdown-menu');

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





const populateDropdownMenu = () => {
  const states = getStates();

  states.forEach(state => {
    const aTag = document.createElement("a")
    aTag.classList.add("dropdown-item");
    aTag.setAttribute('href', `${state}`)
    aTag.innerText = state;
    dropdownMenu.appendChild(aTag);
  })
}


document.onload = populateDropdownMenu();
                        