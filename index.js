document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "2022/2023 Season";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
    createTableRow()
    createGoalscorersDiv()
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


//fetches top 3 goalscorers from each league and makes a div for each team
function createGoalscorersDiv() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const strikers = element.top3Goalscorers
            strikers.forEach(striker => {
                const strikerDiv = document.createElement("div")
                strikerDiv.classList.add("player")
                debugger
                for (const info in striker) {
                    if (info === "name") {
                        const playerInfo = document.createElement("p")
                        playerInfo.textContent = `${striker[info]}`;
                        strikerDiv.appendChild(playerInfo)
                        debugger
                    } else if (info === "picture") {
                        const playerPic = document.createElement("img")
                        playerPic.classList.add("player-pic")
                        playerPic.setAttribute("src", striker[info])
                        strikerDiv.appendChild(playerPic)
                        debugger
                    } else {
                        const playerInfo = document.createElement("p")
                        playerInfo.textContent = `${info}: ${striker[info]}`;
                        strikerDiv.appendChild(playerInfo)
                        debugger
                    }
                }
                const strikerContainer = document.getElementById("goals")
                strikerContainer.appendChild(strikerDiv)
                debugger
            })
            debugger
        })
        debugger
    })
    .catch(error => console.log(error))
}

/*
//iterates through array, makes subelements for each element, and appends them to a team div
function iterateThroughTeamsArray(array, div) {
    array.forEach(teamObj => {
        const teamDiv = document.createElement("div")
        teamDiv.classList.add("team-div")
        const teamName = document.createElement("h4")
        teamName.classList.add("team-name")
        teamName.textContent = teamObj.team
        const teamBadge = document.createElement("img")
        teamBadge.setAttribute("src", teamObj.badge)
        teamBadge.classList.add("team-badge")
        const foundedYear = document.createElement("p")
        foundedYear.classList.add("founded-year")
        foundedYear.textContent = `founded: ${teamObj.founded}`

//puts all team div subelements in an array to appendChild each one        
        const teamSubElementsArray = [teamName, teamBadge, foundedYear]
        teamSubElementsArray.forEach(element => teamDiv.appendChild(element))
        div.appendChild(teamDiv)
    })
}
*/