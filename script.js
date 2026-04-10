const pokemonTypes = [{ name: "Normal", value: "normal", color: "#A8A77A", icon: "./img/Type=Normal.svg" }, { name: "Fire", value: "fire", color: "#EE8130", icon: "./img/Type=Fire.svg" }, { name: "Water", value: "water", color: "#6390F0", icon: "./img/Type=Water.svg" }, { name: "Grass", value: "grass", color: "#7AC74C", icon: "./img/Type=Grass.svg" }, { name: "Electric", value: "electric", color: "#F7D02C", icon: "./img/Type=Electric.svg" }, { name: "Ice", value: "ice", color: "#96D9D6", icon: "./img/Type=Ice.svg" }, { name: "Fighting", value: "fighting", color: "#C22E28", icon: "./img/Type=Fighting.svg" }, { name: "Poison", value: "poison", color: "#A33EA1", icon: "./img/Type=Poison.svg" }, { name: "Ground", value: "ground", color: "#E2BF65", icon: "./img/Type=Ground.svg" }, { name: "Flying", value: "flying", color: "#A98FF3", icon: "./img/Type=Flying.svg" }, { name: "Psychic", value: "psychic", color: "#F95587", icon: "./img/Type=Psychic.svg" }, { name: "Bug", value: "bug", color: "#A6B91A", icon: "./img/Type=Bug.svg" }, { name: "Rock", value: "rock", color: "#B6A136", icon: "./img/Type=Rock.svg" }, { name: "Ghost", value: "ghost", color: "#735797", icon: "./img/Type=Ghost.svg" }, { name: "Dragon", value: "dragon", color: "#6F35FC", icon: "./img/Type=Dragon.svg" }, { name: "Steel", value: "steel", color: "#B7B7CE", icon: "./img/Type=Steel.svg" }, { name: "Dark", value: "dark", color: "#705746", icon: "./img/Type=Dark.svg" }, { name: "Fairy", value: "fairy", color: "#D685AD", icon: "./img/Type=Fairy.svg" }];

let currentOffset = 0;
let allPokemonData = [];
let pokemonSearchList = [];

async function init() {
    toggleLoadingScreen(true);
    await loadSearchList();
    if (!loadFromLocalStorage()) {
        await loadData();
    }
    setTimeout(() => toggleLoadingScreen(false), 500);
}

async function loadData() {
    toggleLoadingScreen(true);
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=20`;
    const response = await fetch(url);
    const json = await response.json();
    await renderContent(json.results);
    toggleLoadingScreen(false);
}

async function loadSearchList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const data = await response.json();
    pokemonSearchList = data.results;
}

async function renderContent(pokemonList) {
    const contentRef = document.getElementById("mainContent");
    for (let i = 0; i < pokemonList.length; i++) {
        const pData = await fetchPokemonDetails(pokemonList[i].url);
        const typeInfos = getAllTypeInfos(pData);
        const simplifiedData = createSimplifiedData(pData);
        allPokemonData.push({ data: simplifiedData, types: typeInfos });
        contentRef.innerHTML += getContentTemplate(simplifiedData, typeInfos);
    }
    saveToLocalStorage();
}

function createSimplifiedData(pData) {
    return {
        id: pData.id,
        name: pData.name,
        image: pData.sprites.other['official-artwork'].front_default,
        height: pData.height,
        weight: pData.weight,
        stats: pData.stats
    };
}

async function loadMore() {
    toggleButton(true);
    currentOffset += 20;
    await loadData();
    toggleButton(false);
}

function getAllTypeInfos(pokemonData) {
    return pokemonData.types.map(t => {
        const info = pokemonTypes.find(type => type.value === t.type.name);
        return info || { color: '#6d6d6d', icon: '' };
    });
}

function saveToLocalStorage() {
    localStorage.setItem('cachedPokemon', JSON.stringify(allPokemonData));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('cachedPokemon');
    if (!data) return false;
    allPokemonData = JSON.parse(data);
    renderFromCache();
    return true;
}

function renderFromCache() {
    const contentRef = document.getElementById("mainContent");
    contentRef.innerHTML = "";
    allPokemonData.forEach(p => {
        contentRef.innerHTML += getContentTemplate(p.data, p.types);
    });
    currentOffset = allPokemonData.length;
}

async function searchPokemon() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const contentRef = document.getElementById("mainContent");
    if (search.length < 3) return resetSearch();
    toggleLoadingScreen(true);
    document.querySelector(".morePokemonBtn").classList.add("d-none");
    contentRef.innerHTML = "";
    const filtered = pokemonSearchList.filter(p => p.name.includes(search));
    await handleSearchResults(filtered, contentRef);
    toggleLoadingScreen(false);
}

function resetSearch() {
    renderFromCache();
    document.querySelector(".morePokemonBtn").classList.remove("d-none");
}

async function handleSearchResults(filtered, contentRef) {
    if (filtered.length === 0) return checkIfEmpty(0, contentRef);
    for (let i = 0; i < Math.min(filtered.length, 20); i++) {
        await renderSingleSearchResult(filtered[i].url);
    }
}

async function renderSingleSearchResult(url) {
    const pData = await fetchPokemonDetails(url);
    const typeInfos = getAllTypeInfos(pData);
    const simplifiedData = createSimplifiedData(pData);
    updateCacheAndRender(simplifiedData, typeInfos);
}

function updateCacheAndRender(data, types) {
    const existing = allPokemonData.findIndex(p => p.data.id === data.id);
    if (existing === -1) allPokemonData.push({ data, types });
    document.getElementById("mainContent").innerHTML += getContentTemplate(data, types);
}

async function fetchPokemonDetails(url) {
    const res = await fetch(url);
    return await res.json();
}

function toggleLoadingScreen(show) {
    document.getElementById("loadingScreen").classList.toggle("d-none", !show);
}

function toggleButton(isDisabled) {
    const btn = document.querySelector(".morePokemonBtn button");
    if (!btn) return;
    btn.disabled = isDisabled;
    btn.innerText = isDisabled ? "Loading..." : "Load More...";
}

function checkIfEmpty(count, contentRef) {
    if (count === 0) {
        contentRef.innerHTML = `<div class="no-results"><p>No Pokémon found.</p></div>`;
    }
}

async function openDetails(index) {
    const pokemon = allPokemonData[index];
    const dialog = document.getElementById("pokemonDialog");
    const content = document.getElementById("dialogContent");
    content.innerHTML = getDetailTemplate(pokemon.data, pokemon.types, index);
    dialog.showModal();
    const evos = await getEvolutions(pokemon.data.name);
    const evoContainer = document.getElementById("evo-section");
    if (evoContainer) evoContainer.innerHTML = renderEvoList(evos);
}

function closeDetails() {
    document.getElementById("pokemonDialog").close();
}

function changePokemon(newIndex) {
    if (newIndex >= 0 && newIndex < allPokemonData.length) {
        openDetails(newIndex);
    }
}

async function getEvolutions(pokemonName) {
    try {
        const specRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const specData = await specRes.json();
        const evoRes = await fetch(specData.evolution_chain.url);
        const evoData = await evoRes.json();
        return await extractEvoData(evoData.chain);
    } catch (e) { return []; }
}

async function extractEvoData(chain) {
    let evoChain = [];
    let current = chain;
    while (current) {
        const name = current.species.name;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        evoChain.push({
            name: name,
            image: data.sprites.other['official-artwork'].front_default
        });
        current = current.evolves_to[0];
    }
    return evoChain;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    input?.addEventListener('keypress', (e) => e.key === 'Enter' && searchPokemon());
});