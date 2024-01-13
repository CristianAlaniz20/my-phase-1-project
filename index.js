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
            const leagueDiv = document.createElement("div")
            leagueDiv.setAttribute("id", element.id)
            leagueDiv.classList.add("league-div")
            leagueContainer.appendChild(leagueDiv)
            createLeagueDivSubElements.call(element, leagueDiv)
        });
    })
    .catch(error => console.log(error))
}

//creates league div sub elements
function createLeagueDivSubElements(div) {
    /*
    const h2 = document.createElement("h2")
    h2.classList.add("league-name")
    h2.textContent = this.name
    */
    const leagueLogoImg = document.createElement("img")
    leagueLogoImg.setAttribute("src", this.logo)
    leagueLogoImg.classList.add("league-img")

    const countryTextElement = document.createElement("h3")
    countryTextElement.classList.add("league-country")
    countryTextElement.setAttribute("id", this.country)
    countryTextElement.textContent = this.country

    
    //const subElementsArray = [h2, img, h4]
    //subElementsArray.forEach(element => div.appendChild(element))
    const subElementsArray = [countryTextElement, leagueLogoImg]
    subElementsArray.forEach(element => div.appendChild(element))
    //div.appendChild(img)
}

function createTeamDiv() {
    fetch("http://127.0.0.1:3000/leagues")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const teamDivContainer = document.getElementById("team-container")
            const teamsArray = element.top3Teams;
            const teamDiv = document.createElement("div")
            teamDiv.classList.add("team-div")
            iterateThroughTeamsArray(teamsArray, teamDiv)
            teamDivContainer.appendChild(teamDiv)
        })
    })
}

function iterateThroughTeamsArray(array, div) {
    array.forEach(teamObj => {
        const teamName = document.createElement("h4")
        teamName.classList.add("team-name")
        teamName.textContent = teamObj.team
        const teamBadge = document.createElement("img")
        teamBadge.setAttribute("src", teamObj.badge)
        teamBadge.classList.add("team-badge")
        const foundedYear = document.createElement("p")
        foundedYear.classList.add("founded-year")
        foundedYear.textContent = teamObj.founded
        
        const teamSubElementsArray = [teamName, teamBadge, foundedYear]
        teamSubElementsArray.forEach(element => div.appendChild(element))
    })
}

//assign an element to top3teams of each element
//iterate through top3teams array (forEach)
//make a div with with an id and class for each item
//make subelements for the div made