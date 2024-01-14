document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "As of January 10th, 2024";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
    createTeamDiv()
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

//fetches top 3 teams from each league and makes a div for each team
function createTeamDiv() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            //
            const teamDivContainer = document.getElementById("team-container")
            const teamsArray = element.top3Teams;
            const leagueTeamsDiv = document.createElement("div")
            leagueTeamsDiv.classList.add(`${element.country}-div`)
            
            iterateThroughTeamsArray(teamsArray, leagueTeamsDiv)
            teamDivContainer.appendChild(leagueTeamsDiv)

        })
    })
    .catch(error => console.log(error))
}

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