document.addEventListener("DOMContentLoaded", e => {
    createLeagueDiv()
    addDropdownEventListener()
    fetchDropdownOptionData()
    moveBall()
    mouseOverEvent()
    mouseOutEvent()
})

//creates league divs and fetches their info
function createLeagueDiv() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(res => res.json())
    .then(data => {
        const leagueContainer = document.getElementById("league-container");
        data.forEach(element => {
            //create league div and set class and id name
            const leagueDiv = document.createElement("div")
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
    //create image element
    const leagueLogoImg = createImage("league-img", this.logo)
    //create h3 element and set its class, id, and text content
    const countryH3Element = document.createElement("h3")
    countryH3Element.classList.add("league-country")
    countryH3Element.textContent = this.country
    //create elements array and appendChild each one to passed in div
    const subElementsArray = [countryH3Element, leagueLogoImg]
    subElementsArray.forEach(element => div.appendChild(element))
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

//removes all subelements of table and stats divs
function removeTableAndPlayers() {
    const tableDiv = document.getElementById("league-table")
    tableDiv.removeChild(document.getElementById("table"))
    Array.from(document.getElementsByClassName("player")).forEach(element => element.remove())
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

//Creates a player card for each element in the array, and appendChilds them to a div
function createPlayerCards(array, div) {
    array.forEach(professional => {
        const professionalDiv = document.createElement("div")
        professionalDiv.classList.add("player")
        for (const info in professional) {
            switch (info) {
                case "name":
                    const playerName = document.createElement("p")
                    playerName.textContent = `${professional[info]}`;
                    professionalDiv.appendChild(playerName)
                    break;
                case "club":
                case "nationality":
                    const playerImgP = document.createElement("p")
                    professional[info].forEach(element => {
                        if (element === professional[info][0]) {
                            const clubName = element
                            playerImgP.textContent = `${info.toUpperCase()}: ${clubName}`
                            debugger
                        } else {
                            const image = createImage("player-personal-info-image", element)
                            playerImgP.appendChild(image)
                            debugger
                        }
                    })
                    professionalDiv.appendChild(playerImgP)
                    break;
                case "picture":
                    const playerPic = createImage("player-pic", professional[info])
                    professionalDiv.appendChild(playerPic)
                    break;
                default:
                    const playerInfo = document.createElement("p")
                    playerInfo.textContent = `${info.toUpperCase()}: ${professional[info]}`;
                    professionalDiv.appendChild(playerInfo)
            }
            //adds info to card WITHOUT property text
            /*if (info === "name") {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
            //create img tag for club badge/nationality flag and p element for both
            } else if (info === "club" || info === "nationality") {
                const playerInfo = document.createElement("p")
                professional[info].forEach(element => {
                    if (element === professional[info][0]) {
                        const clubName = element
                        playerInfo.textContent = `${info.toUpperCase()}: ${clubName}`
                        debugger
                    } else {
                        const image = createImage("player-personal-info-image", element)
                        playerInfo.appendChild(image)
                        debugger
                    }
                })
                professionalDiv.appendChild(playerInfo)
                debugger
            ////create img tag for player pic and adds to card
            } else if (info === "picture") {
                const playerPic = createImage("player-pic", professional[info])
                professionalDiv.appendChild(playerPic)
            //adds info to card WITH property text
            } else {
                const playerInfo = document.createElement("p")
                playerInfo.textContent = `${info.toUpperCase()}: ${professional[info]}`;
                professionalDiv.appendChild(playerInfo)
            }*/
        }
        div.appendChild(professionalDiv)
    })
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
            tableRow.appendChild(createTableCell("team-badge-td", element))
        //creates header team name cell
        } else if (tableHeaders[1] === element) {
            tableRow.appendChild(createTableCell("team-name", element))
        //creates header stats cells 
        } else {
            tableRow.appendChild(createTableCell("table-data", element))
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
                const tableCell = createTableCell("team-badge-td")
                const teamBadge = createImage("team-badge", team[info])
                tableCell.appendChild(teamBadge)
                tableRow.appendChild(tableCell)
            //creates team name cell
            } else if (info === "team") {
                tableRow.appendChild(createTableCell("team-name", team[info]))
            //creates table stats cells
            } else {
                tableRow.appendChild(createTableCell("table-data", team[info]))
            }
        }
        table.appendChild(tableRow)
    })
}

//creates image element, sets its class and source.
function createImage(name, src) {
    const image = document.createElement("img")
    image.classList.add(name)
    image.setAttribute("src", src)
    return image
}

//creates td element, sets its class and text content
function createTableCell(name, value) {
    const tableCell = document.createElement("td")
    tableCell.classList.add(name)
    tableCell.textContent = value
    return tableCell
}

let intervalId;
let clickCount = 0;

//moves the ball
function moveBall() {
    const button = document.getElementById("move-ball")
    button.addEventListener("click", e => {
        const ball = document.getElementById("ball")
        let pos = 0;
        clearInterval(intervalId)
        //move ball to the right
        if (clickCount % 2 === 0) {
            intervalId = setInterval(() => {
                if (pos === 650) {
                    clearInterval(intervalId)
                } else  {
                    pos++;
                    ball.style.left = pos + `px`;
                }
            })            
            clickCount = 1;
        //move ball to the left
        } else {
            pos = 650
            intervalId = setInterval(() => {
                if (pos === 0) {
                    clearInterval(intervalId)
                } else  {
                    pos--;
                    ball.style.left = pos + `px`;
                }
            })
            clickCount = 0;
        }
    })
}

const h1 = document.getElementById("title")

//creates mousever event
function mouseOverEvent() {
    h1.addEventListener("mouseover", e => {
        h1.style.color = randomColor();
    })
}

//creates mouseout event
function mouseOutEvent() {
    h1.addEventListener("mouseout", e => {
        h1.style.color = "white";
    })
}

function randomColor () {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    const color = "rgb(" + r + ", " + g + ", " + b + ")"
    return color
}

//["FC Barcelona", "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png"]
//["Poland", "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png"]
