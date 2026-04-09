const pokemonTypes = [{
    name: "Normal",
    value: "normal",
    color: "#A8A77A",
    icon: "./img/Type=Normal.svg"
},
{
    name: "Fire",
    value: "fire",
    color: "#EE8130",
    icon: "./img/Type=Fire.svg"
},
{
    name: "Water",
    value: "water",
    color: "#6390F0",
    icon: "./img/Type=Water.svg"
},
{
    name: "Grass",
    value: "grass",
    color: "#7AC74C",
    icon: "./img/Type=Grass.svg"
},
{
    name: "Electric",
    value: "electric",
    color: "#F7D02C",
    icon: "./img/Type=Electric.svg"
},
{
    name: "Ice",
    value: "ice",
    color: "#96D9D6",
    icon: "./img/Type=Ice.svg"
},
{
    name: "Fighting",
    value: "fighting",
    color: "#C22E28",
    icon: "./img/Type=Fighting.svg"
},
{
    name: "Poison",
    value: "poison",
    color: "#A33EA1",
    icon: "./img/Type=Poison.svg"
},
{
    name: "Ground",
    value: "ground",
    color: "#E2BF65",
    icon: "./img/Type=Ground.svg"
},
{
    name: "Flying",
    value: "flying",
    color: "#A98FF3",
    icon: "./img/Type=Flying.svg"
},
{
    name: "Psychic",
    value: "psychic",
    color: "#F95587",
    icon: "./img/Type=Psychic.svg"
},
{
    name: "Bug",
    value: "bug",
    color: "#A6B91A",
    icon: "./img/Type=Bug.svg"
},
{
    name: "Rock",
    value: "rock",
    color: "#B6A136",
    icon: "./img/Type=Rock.svg"
},
{
    name: "Ghost",
    value: "ghost",
    color: "#735797",
    icon: "./img/Type=Ghost.svg"
},
{
    name: "Dragon",
    value: "dragon",
    color: "#6F35FC",
    icon: "./img/Type=Dragon.svg"
},
{
    name: "Steel",
    value: "steel",
    color: "#B7B7CE",
    icon: "./img/Type=Steel.svg"
},
{
    name: "Dark",
    value: "dark",
    color: "#705746",
    icon: "./img/Type=Dark.svg"
},
{
    name: "Fairy",
    value: "fairy",
    color: "#D685AD",
    icon: "./img/Type=Fairy.svg"
}];

let currentOffset = 0;
let allPokemonData = [];

async function init() {
    toggleLoadingScreen(true);

    if (!loadFromLocalStorage()) {
        await loadData();
    }

    setTimeout(() => {
        toggleLoadingScreen(false);
    }, 500);
}

async function loadData() {
    toggleLoadingScreen(true);
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=20`;
    let response = await fetch(url);
    let json = await response.json();
    await renderContent(json.results);
    toggleLoadingScreen(false);
}

async function renderContent(pokemonList) {
    let contentRef = document.getElementById("mainContent");
    for (let i = 0; i < pokemonList.length; i++) {
        let pData = await fetchPokemonDetails(pokemonList[i].url);
        let typeInfos = getAllTypeInfos(pData);

        let simplifiedData = {
            id: pData.id,
            name: pData.name,
            image: pData.sprites.other['official-artwork'].front_default,
            height: pData.height,
            weight: pData.weight,
            stats: pData.stats
        };
        allPokemonData.push({ data: simplifiedData, types: typeInfos });
        contentRef.innerHTML += getContentTemplate(simplifiedData, typeInfos);
    }
    saveToLocalStorage();
}

async function loadMore() {
    toggleButton(true);
    currentOffset += 20;
    await loadData();
    toggleButton(false);
}

function getAllTypeInfos(pokemonData) {
    let infos = [];
    for (let i = 0; i < pokemonData.types.length; i++) {
        let typeName = pokemonData.types[i].type.name;
        let info = pokemonTypes.find(t => t.value === typeName);
        infos.push(info || { color: '#6d6d6d', icon: '' });
    }
    return infos;
}

function saveToLocalStorage() {
    localStorage.setItem('cachedPokemon', JSON.stringify(allPokemonData));
}

function loadFromLocalStorage() {
    let data = localStorage.getItem('cachedPokemon');
    if (data) {
        allPokemonData = JSON.parse(data);
        renderFromCache();
        return true;
    }
    return false;
}

function renderFromCache() {
    let contentRef = document.getElementById("mainContent");
    contentRef.innerHTML = "";
    for (let i = 0; i < allPokemonData.length; i++) {
        contentRef.innerHTML += getContentTemplate(allPokemonData[i].data, allPokemonData[i].types);
    }
    currentOffset = allPokemonData.length;
}

async function searchPokemon() {
    let search = document.getElementById('searchInput').value.toLowerCase();
    let loadBtn = document.querySelector(".morePokemonBtn");

    if (search.length < 3) {
        renderFromCache();
        loadBtn.classList.remove("d-none");
        return;
    }
    toggleLoadingScreen(true);
    loadBtn.classList.add("d-none");
    setTimeout(() => {
        filterAndRender(search);
        toggleLoadingScreen(false);
    }, 300);
}

function filterAndRender(search) {
    let contentRef = document.getElementById("mainContent");
    contentRef.innerHTML = "";
    let foundCount = 0;
    for (let i = 0; i < allPokemonData.length; i++) {
        if (allPokemonData[i].data.name.toLowerCase().includes(search)) {
            contentRef.innerHTML += getContentTemplate(allPokemonData[i].data, allPokemonData[i].types);
            foundCount++;
        }
    }
    checkIfEmpty(foundCount, contentRef);
}

async function fetchPokemonDetails(url) {
    let res = await fetch(url);
    return await res.json();
}

function toggleLoadingScreen(show) {
    document.getElementById("loadingScreen").classList.toggle("d-none", !show);
}

function toggleButton(isDisabled) {
    let btn = document.querySelector(".morePokemonBtn button");
    if (btn) {
        btn.disabled = isDisabled;
        btn.innerText = isDisabled ? "Loading..." : "Load More...";
    }
}

function checkIfEmpty(count, contentRef) {
    if (count === 0) {
        contentRef.innerHTML = `<div class="no-results"><p>No Pokémon found.</p></div>`;
    }
}

async function openDetails(index) {
    let pokemon = allPokemonData[index];
    let dialog = document.getElementById("pokemonDialog");
    let content = document.getElementById("dialogContent");

    content.innerHTML = getDetailTemplate(pokemon.data, pokemon.types, index);
    dialog.showModal();

    let evos = await getEvolutions(pokemon.data.name);
    let evoContainer = document.getElementById("evo-section");
    if (evoContainer) {
        evoContainer.innerHTML = renderEvoList(evos);
    }
}

function closeDetails() {
    document.getElementById("pokemonDialog").close();
}

function changePokemon(newIndex) {
    if (newIndex >= 0 && newIndex < allPokemonData.length) {
        openDetails(newIndex);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchPokemon();
            }
        });
    }
});

async function getEvolutions(pokemonName) {
    try {
        let speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        let speciesData = await speciesRes.json();
        let evoRes = await fetch(speciesData.evolution_chain.url);
        let evoData = await evoRes.json();

        return await extractEvoData(evoData.chain);
    } catch (e) { return []; }
}

async function extractEvoData(chain) {
    let evoChain = [];
    let current = chain;

    while (current) {
        let name = current.species.name;
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let data = await res.json();

        evoChain.push({
            name: name,
            image: data.sprites.other['official-artwork'].front_default
        });
        current = current.evolves_to[0];
    }
    return evoChain;
}