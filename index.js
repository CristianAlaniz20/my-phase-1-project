document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "2022/2023 Season";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
    addDropdownEventListener()
    fetchDropdownOptionData()

})

let callCount = 0;

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

//adds "change" event listener to league-dropdown
function addDropdownEventListener() {
    const dropdown = document.getElementById("league-dropdown")
    dropdown.addEventListener("change", (e) => {
        const selectedOption = dropdown.value;
        switch (selectedOption) {
            case "1":
                removeTableAndPlayers()
                fetchDropdownOptionData(selectedOption)
                break;
            case"2":
                removeTableAndPlayers()
                fetchDropdownOptionData(selectedOption)
                break;
            case "3": 
                removeTableAndPlayers()
                fetchDropdownOptionData(selectedOption)
                break;
            case "4":
                removeTableAndPlayers()
                fetchDropdownOptionData(selectedOption)
                break;
            case "5":
                removeTableAndPlayers()
                fetchDropdownOptionData(selectedOption)
                break;
            default:
                console.log(`I don't know you, ${selectedOption}`)
        }
    })
}

//fetch corresponding data to dropdown option
function fetchDropdownOptionData(dropdownValue = 1) {
    fetch(`http://127.0.0.1:3000/leagues/${dropdownValue}`)
        .then(response => response.json())
        .then(data => {
            createTable(data.name)
            createTableRows(data.table)
            createPlayerCards(data.top3Goalscorers, document.getElementById("goals"))
            createPlayerCards(data.top3Assisters, document.getElementById("assists"))
        })
        .catch(error => console.log(error))
}

//creates initial table for a league
function createTable(leagueName) {
    //creates table title row
    const tableDiv = document.getElementById("league-table")
    const table = document.createElement("table")
    table.setAttribute("id", `table`)
    
    const titleRow = document.createElement("tr")
    const titleCell = document.createElement("th")
    titleCell.textContent = leagueName
    tableDiv.appendChild(table)
    table.appendChild(titleRow)
    titleRow.appendChild(titleCell)
    //creates table headers row
    const tableRow = document.createElement("tr")
    const tableHeaders = [" ", "Team", "MP", "W", "D", "L", "GF", "GA", "GD", "Pts"]
    tableHeaders.forEach(element => {
        //creates header badge cell
        if (tableHeaders[0] === element) {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-badge-td")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        //creates header team name cell
        } else if (tableHeaders[1] === element) {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-name")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        //creates header stats cells 
        } else {
            const tableCell = document.createElement("td")
            tableCell.classList.add("table-data")
            tableCell.textContent = element
            tableRow.appendChild(tableCell)
        }
    })
    table.appendChild(tableRow)
}

//creates league table rows
function createTableRows(array) {
    const table = document.getElementById("table")
    array.forEach(team => {
        const tableRow = document.createElement("tr")
        for(const info in team) {
            //creates badge cell
            if (info === "badge") {
                const tableCell = document.createElement("td")
                tableCell.classList.add("team-badge-td")
                const teamBadge = document.createElement("img")
                teamBadge.classList.add("team-badge")
                teamBadge.setAttribute("src", team[info])
                tableCell.appendChild(teamBadge)
                tableRow.appendChild(tableCell)
            //creates team name cell
            } else if (info === "team") {
            const tableCell = document.createElement("td")
            tableCell.classList.add("team-name")
            tableCell.textContent = team[info]
            tableRow.appendChild(tableCell)
            //creates table stats cells
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

function removeTableAndPlayers() {
    const tableDiv = document.getElementById("league-table")
    tableDiv.removeChild(document.getElementById("table"))
    Array.from(document.getElementsByClassName("player")).forEach(element => element.remove())
}