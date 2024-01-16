document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "2022/2023 Season";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
    //createTableRow()
    fetchPlayers()
    addDropdownEventListener()
    dropdownCallbackFunction()
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
            //call createPlayerCards for each array/div pair
            createPlayerCards(strikers, strikerContainer)
            createPlayerCards(assisters, assisterContainer) 
        })
    })
    .catch(error => console.log(error))
}

//Creates a player card for each element in the array, and appendChilds them to a div
function createPlayerCards(array, div) {
    array.forEach(professional => {
        const professionalDiv = document.createElement("div")
        professionalDiv.classList.add("player")
        for (const info in professional) {
            //adds info to card WITHOUT property text
            if (info === "name") {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
            //create img tag for player pic and adds to card
            } else if (info === "picture") {
                const playerPic = document.createElement("img")
                playerPic.classList.add("player-pic")
                playerPic.setAttribute("src", professional[info])
                professionalDiv.appendChild(playerPic)
            //adds info to card WITH property text
            } else {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${info.toUpperCase()}: ${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
            }
        }
        div.appendChild(professionalDiv)
    })
}

function addDropdownEventListener() {
    const dropdown = document.getElementById("league-dropdown")
    dropdown.addEventListener("change", (e) => {
        const selectedOption = dropdown.value;
        switch (selectedOption) {
            case "1":
                dropdownCallbackFunction(selectedOption)
                break;
            case"2":
                dropdownCallbackFunction(selectedOption)
                break;
            case "3": 
                dropdownCallbackFunction(selectedOption)
                break;
            case "4":
                dropdownCallbackFunction(selectedOption)
                break;
            case "5":
                dropdownCallbackFunction(selectedOption)
                break;
            default:
                console.log(`I don't know you, ${selectedOption}`)
        }
    })
}

function dropdownCallbackFunction(dropdownValue = 1) {
    fetch(`http://127.0.0.1:3000/leagues/${dropdownValue}`)
        .then(response => response.json())
        .then(data => {
            createTable(data.name)
            createTableRows(data.table)
        })
        .catch(error => console.log(error))
}

function createTable(leagueName = "La Liga") {
    //create table title row
    const leagueDiv = document.getElementById("league-table")
    const table = document.createElement("table")
    table.setAttribute("id", `table`)
    
    const titleRow = document.createElement("tr")
    const titleCell = document.createElement("th")
    titleCell.textContent = leagueName
    leagueDiv.appendChild(table)
    table.appendChild(titleRow)
    titleRow.appendChild(titleCell)
    //create table headers row
    const tableRow = document.createElement("tr")
    const tableHeaders = [" ", "Team", "MP", "W", "D", "L", "GF", "GA", "GD", "Pts"]
    tableHeaders.forEach(element => {
        //create badge cell
        if (tableHeaders[0] === element) {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-badge-td")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        //create team name cell
        } else if (tableHeaders[1] === element) {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-name")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        //create stats cell 
        } else {
            const tableCell = document.createElement("td")
            tableCell.classList.add("table-data")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        }
    })
    table.appendChild(tableRow)
}

function createTableRows(array) {
    const table = document.getElementById("table")
    array.forEach(team => {
        const tableRow = document.createElement("tr")
        for(const info in team) {
            if (info === "badge") {
                const tableCell = document.createElement("td")
                tableCell.classList.add("team-badge-td")
                const teamBadge = document.createElement("img")
                teamBadge.classList.add("team-badge")
                teamBadge.setAttribute("src", team[info])
                tableCell.appendChild(teamBadge)
                tableRow.appendChild(tableCell)
            } else if (info === "team") {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-name")
            tableCell.textContent = team[info]
            tableRow.appendChild(tableCell)
            } else {
                const tableCell = document.createElement("td")
                tableCell.classList.add("table-data")
                tableCell.textContent = team[info]
                tableRow.appendChild(tableCell)
            }
        }
        table.appendChild(tableRow)
    })
}