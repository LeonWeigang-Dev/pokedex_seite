const pokemonTypes = [{
    name: "Normal",
    value: "normal",
    color: "#A8A77A",
    icon: "./img/Type=Normal.svg",
}, {
    name: "Fire",
    value: "fire",
    color: "#EE8130",
    icon: "./img/Type=Fire.svg",
}, {
    name: "Water",
    value: "water",
    color: "#6390F0",
    icon: "./img/Type=Water.svg",
}, {
    name: "Grass",
    value: "grass",
    color: "#7AC74C",
    icon: "./img/Type=Grass.svg",
}, {
    name: "Electric",
    value: "electric",
    color: "#F7D02C",
    icon: "./img/Type=Electric.svg",
}, {
    name: "Ice",
    value: "ice",
    color: "#96D9D6",
    icon: "./img/Type=Ice.svg",
}, {
    name: "Fighting",
    value: "fighting",
    color: "#C22E28",
    icon: "./img/Type=Fighting.svg",
}, {
    name: "Poison",
    value: "poison",
    color: "#A33EA1",
    icon: "./img/Type=Poison.svg",
}, {
    name: "Ground",
    value: "ground",
    color: "#E2BF65",
    icon: "./img/Type=Ground.svg",
}, {
    name: "Flying",
    value: "flying",
    color: "#A98FF3",
    icon: "./img/Type=Flying.svg",
}, {
    name: "Psychic",
    value: "psychic",
    color: "#F95587",
    icon: "./img/Type=Psychic.svg",
}, {
    name: "Bug",
    value: "bug",
    color: "#A6B91A",
    icon: "./img/Type=Bug.svg",
}, {
    name: "Rock",
    value: "rock",
    color: "#B6A136",
    icon: "./img/Type=Rock.svg",
}, {
    name: "Ghost",
    value: "ghost",
    color: "#735797",
    icon: "./img/Type=Ghost.svg",
}, {
    name: "Dragon",
    value: "dragon",
    color: "#6F35FC",
    icon: "./img/Type=Dragon.svg",
}, {
    name: "Steel",
    value: "steel",
    color: "#B7B7CE",
    icon: "./img/Type=Steel.svg",
}, {
    name: "Dark",
    value: "dark",
    color: "#705746",
    icon: "./img/Type=Dark.svg",
}, {
    name: "Fairy",
    value: "fairy",
    color: "#D685AD",
    icon: "./img/Type=Fairy.svg"
},];






function init() {
    loadData();
}


let currentOffset = 0;

async function loadData() {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon";
    const url = `${baseUrl}?offset=${currentOffset}&limit=20`;
    let response = await fetch(url);
    let json = await response.json();
    renderContent(json.results);
}

async function loadMore() {
    currentOffset += 20;
    await loadData();
}

async function renderContent(pokemonList) {
    let contentRef = document.getElementById("mainContent");
    // WICHTIG: Kein contentRef.innerHTML = ""; mehr hier!
    for (let i = 0; i < pokemonList.length; i++) {
        let pokemonData = await fetchPokemonDetails(pokemonList[i].url);
        let typeInfos = getAllTypeInfos(pokemonData);
        contentRef.innerHTML += getContentTemplate(pokemonData, typeInfos);
    }
}

async function fetchPokemonDetails(url) {
    let response = await fetch(url);
    return await response.json();
}

function getAllTypeInfos(pokemonData) {
    let types = pokemonData.types;
    let infos = [];
    for (let i = 0; i < types.length; i++) {
        let typeName = types[i].type.name;
        let info = pokemonTypes.find(t => t.value === typeName);
        infos.push(info || { color: '#6d6d6d', icon: '' });
    }
    return infos;
}