document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "2022/2023 Season";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
    createTableRow()
    fetchPlayers()
    addDropdownEventListener()
})

//creates league divs and fetches their info
function createLeagueDiv() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(res => res.json())
    .then(data => {
        const leagueContainer = document.getElementById("league-container");
        data.forEach(element => {
            //create div and set class and id name
            const leagueDiv = document.createElement("div")
            leagueDiv.setAttribute("id", element.id)
            leagueDiv.classList.add("league-div")
            //call function and append div to another div
            createLeagueDivSubElements.call(element, leagueDiv)
            leagueContainer.appendChild(leagueDiv)
        });
    })
    .catch(error => console.log(error))
}

//creates league div sub elements
function createLeagueDivSubElements(div) {
    //create image element and set its source and class name
    const leagueLogoImg = document.createElement("img")
    leagueLogoImg.setAttribute("src", this.logo)
    leagueLogoImg.classList.add("league-img")
    //create h3 element and set its class and id name
    const countryH3Element = document.createElement("h3")
    countryH3Element.classList.add("league-country")
    countryH3Element.setAttribute("id", this.country)
    countryH3Element.textContent = this.country
    //create element array and appendChild each one to passed in div
    const subElementsArray = [countryH3Element, leagueLogoImg]
    subElementsArray.forEach(element => div.appendChild(element))
    
    //div.appendChild(leagueLogoImg)
}

//creates table row and table data for each team, assigning each row to their respective league
function createTableRow() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(response => response.json())
    .then(data => {
        let count = 1;
        data.forEach(element => {
            const standingsTable = document.getElementById(`table-${count}`)
            const teamsArray = element.table;
            teamsArray.forEach(team => {
                const valuesArray = Object.values(team)
                const teamRow = document.createElement("tr")
                //if element is the img link, make img element and appendChild it to the td created
                valuesArray.forEach(element => {
                    if (valuesArray[0] === element) {
                        const td = document.createElement("td")
                        td.classList.add("team-badge-td")
                        const teamBadge = document.createElement("img")
                        teamBadge.classList.add("team-badge")
                        teamBadge.setAttribute("src", valuesArray[0])
                        td.appendChild(teamBadge)
                        teamRow.appendChild(td)
                    //if element is team name, add class name "team-name" then appendChild to row
                    } else if (valuesArray[1] === element) {
                        const td = document.createElement("td")
                        td.classList.add("team-name")
                        td.textContent = element
                        teamRow.appendChild(td)
                    //for all other data, create td, set its text context to the element and appendChild to row
                    } else {
                        const td = document.createElement("td")
                        td.classList.add("table-data")
                        td.textContent = element
                        teamRow.appendChild(td)
                    }
                })
                standingsTable.appendChild(teamRow)
            })
            count++
        })
    })
    .catch(error => console.log(error))
}


//fetches top 3 goalscorers and top 3 assisters from each league
function fetchPlayers() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            //assign arrays and correspondings divs
            const strikers = element.top3Goalscorers
            const assisters = element.top3Assisters
            const strikerContainer = document.getElementById("goals")
            const assisterContainer = document.getElementById("assists")
            debugger
            //call createPlayerCards for each array/div pair
            createPlayerCards(strikers, strikerContainer)
            createPlayerCards(assisters, assisterContainer)
            debugger
        })
        debugger
    })
    .catch(error => console.log(error))
}

//Creates a player card for each element in the array, and appendChilds them to a div
function createPlayerCards(array, div) {
    array.forEach(professional => {
        const professionalDiv = document.createElement("div")
        professionalDiv.classList.add("player")
        debugger
        for (const info in professional) {
            //adds info to card WITHOUT property text
            if (info === "name") {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
                debugger
            //create img tag for player pic and adds to card
            } else if (info === "picture") {
                const playerPic = document.createElement("img")
                playerPic.classList.add("player-pic")
                playerPic.setAttribute("src", professional[info])
                professionalDiv.appendChild(playerPic)
                debugger
            //adds info to card WITH property text
            } else {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${info.toUpperCase()}: ${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
                debugger
            }
        }
        div.appendChild(professionalDiv)
        debugger
    })
}

function addDropdownEventListener() {
    const dropdown = document.getElementById("league-dropdown")
    dropdown.addEventListener("change", (e) => {
        const selectedOption = dropdown.value;
        switch (selectedOption) {
            case "LaLiga":
                console.log(`Hey ${selectedOption}`)
                break;
            case"PremierLeague":
                console.log(`Hey ${selectedOption}`)
                break;
            case "Bundesliga": 
                console.log(`Hey ${selectedOption}`)
                break;
            case "Ligue1":
                console.log(`Hey ${selectedOption}`)
                break;
            case "SeriaA":
                console.log(`Hey ${selectedOption}`)
                break;
            default:
                console.log(`I don't know you, ${selectedOption}`)
        }
    })
}

function dropdownCallbackFunction(dropdownValue) {

}