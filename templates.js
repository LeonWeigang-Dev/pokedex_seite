
function formatPokemonName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function getTypeIconsHtml(typeInfos) {
    let html = "";
    for (let i = 0; i < typeInfos.length; i++) {
        html += `<img class="typeIcons" src="${typeInfos[i].icon}" alt="Type">`;
    }
    return html;
}

function getContentTemplate(pokemonData, typeInfos) {
    let name = formatPokemonName(pokemonData.name);
    let iconsHtml = getTypeIconsHtml(typeInfos);
    let index = allPokemonData.findIndex(p => p.data.id === pokemonData.id);
    return `
        <section onclick="openDetails(${index})" class="smallCard">
            <div class="cardBg header-info">
                <span>#${pokemonData.id}</span>
                <span>${name}</span>
            </div>
            <div class="imgBg" style="background-color: ${typeInfos[0].color}">
                <img class="smallCardImg" src="${pokemonData.image}" alt="${name}">
            </div>
            <div class="cardBg typeIconsContainer">${iconsHtml}</div>
        </section>`;
}

function getDetailTemplate(data, types, index) {
    let name = formatPokemonName(data.name);
    return `
        <div class="detail-header" style="background-color: ${types[0].color}">
            <div class="header-top">
                <span class="detail-id">#${data.id}</span>
                <button class="close-btn" onclick="closeDetails()">X</button>
            </div>
            <h2 class="detail-name">${name}</h2>
            <img class="detail-img" src="${data.image}" alt="${name}">
        </div>
        <div class="detail-body">
            <div class="detail-nav">
                <button onclick="changePokemon(${index - 1})">◀ Previous</button>
                <button onclick="changePokemon(${index + 1})">Next ▶</button>
            </div>
            <div class="type-container">${getTypeIconsHtml(types)}</div>
        </div>`;
}