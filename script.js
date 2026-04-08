const pokemonTypes = [{
    name: "Normal",
    value: "normal",
    color: "#A8A77A",
}, {
    name: "Fire",
    value: "fire",
    color: "#EE8130",
}, {
    name: "Water",
    value: "water",
    color: "#6390F0",
}, {
    name: "Grass",
    value: "grass",
    color: "#7AC74C",
}, {
    name: "Electric",
    value: "electric",
    color: "#F7D02C",
}, {
    name: "Ice",
    value: "ice",
    color: "#96D9D6",
}, {
    name: "Fighting",
    value: "fighting",
    color: "#C22E28",
}, {
    name: "Poison",
    value: "poison",
    color: "#A33EA1",
}, {
    name: "Ground",
    value: "ground",
    color: "#E2BF65",
}, {
    name: "Flying",
    value: "flying",
    color: "#A98FF3",
}, {
    name: "Psychic",
    value: "psychic",
    color: "#F95587",
}, {
    name: "Bug",
    value: "bug",
    color: "#A6B91A",
}, {
    name: "Rock",
    value: "rock",
    color: "#B6A136",
}, {
    name: "Ghost",
    value: "ghost",
    color: "#735797",
}, {
    name: "Dragon",
    value: "dragon",
    color: "#6F35FC",
}, {
    name: "Steel",
    value: "steel",
    color: "#B7B7CE",
}, {
    name: "Dark",
    value: "dark",
    color: "#705746",
}, {
    name: "Fairy",
    value: "fairy",
    color: "#D685AD",
},];






function init() {
    loadData();
}


async function loadData() {
    const Base_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

    let response = await fetch(Base_URL);
    let responsetoJson = await response.json();
    renderContent(responsetoJson);
}

function renderContent(responsetoJson) {
    let contentRef = document.getElementById("mainContent");
    let htmlContent = "";

    for (let index = 0; index < responsetoJson.results.length; index++) {

        htmlContent += getContentTemplate(responsetoJson, index);
    }
    contentRef.innerHTML = htmlContent;
}