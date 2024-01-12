document.addEventListener("DOMContentLoaded", e => {
    const h2 = document.createElement("h2");
    h2.textContent = "This content added by JavaScript";
    document.querySelector("body").appendChild(h2);

    createLeagueDiv()
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
    const img = document.createElement("img")
    img.setAttribute("src", this.logo)
    img.classList.add("league-img")

    const h4 = document.createElement("h4")
    h4.classList.add("league-country")
    h4.setAttribute("id", this.country)
    h4.textContent = this.country

    
    //const subElementsArray = [h2, img, h4]
    //subElementsArray.forEach(element => div.appendChild(element))
    const subElementsArray = [h4, img]
    subElementsArray.forEach(element => div.appendChild(element))
    //div.appendChild(img)
}