
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
        <section onclick="openDetails(${index})" aria-label="View details for ${name}" onkeyup="if(event.key === 'Enter') openDetails(${index})" tabindex="0" class="smallCard">
            <div class="cardBg header-info">
                <span>#${pokemonData.id}</span>
                <span>${name}</span>
            </div>
            <div class="imgBg" aria-label="Pokemon Image" style="background-color: ${typeInfos[0].color}">
                <img class="smallCardImg" src="${pokemonData.image}" alt="${name}">
            </div>
            <div class="cardBg typeIconsContainer">${iconsHtml}</div>
        </section>`;
}

function getDetailTemplate(data, types, index) {
    let name = formatPokemonName(data.name);
    let isFirst = index === 0;
    let isLast = index === allPokemonData.length - 1;
    let headerTypesHtml = getTypeIconsHtml(types);

    return `
        <div class="detail-header" style="background-color: ${types[0].color}">
            <button class="close-btn" aria-label="Close" onclick="closeDetails()" tabindex="0">X</button>
            <div class="header-top">
                <span class="detail-id">#${data.id}</span>
                <span class="detail-name">${name}</span>
            </div>
            <div class="header-types">${headerTypesHtml}</div>
            <img class="detail-img" src="${data.image}" alt="${name}">
        </div>
        <div class="detail-body">
            <div class="pokemon-specs">
                <span><b>Height:</b> ${data.height / 10} m</span>
                <span><b>Weight:</b> ${data.weight / 10} kg</span>
            </div>
            <div class="stats-container">${renderStats(data.stats)}</div>
            <div id="evo-section" class="evo-container"></div>
            
            <div class="detail-nav">
                <button class="nav-btn" onclick="changePokemon(${index - 1})" ${isFirst ? 'disabled' : ''}>
                   
                    <img class="arrowBtn" aria-label="Previous Button" src="./img/button_left.png" alt="Previous Button">
                     Previous
                </button>
                <button class="nav-btn" onclick="changePokemon(${index + 1})" ${isLast ? 'disabled' : ''}>
                    Next 
                    <img class="arrowBtn" aria-label="Next Button" src="./img/button_right.png" alt="Next Button">
                </button>
            </div>
        </div>`;
}

function renderStats(stats) {
    return stats.map(s => `
        <div class="stat-row">
            <span class="stat-name">${s.stat.name.toUpperCase()}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${Math.min(s.base_stat, 100)}%"></div>
            </div>
            <span class="stat-value">${s.base_stat}</span>
        </div>
    `).join('');
}

function renderEvoList(evos) {
    if (evos.length <= 1) return "<p>No further evolutions</p>";

    let html = "<b class='evoTitle'>Evolution Chain:</b><div class='evo-row'>";
    for (let i = 0; i < evos.length; i++) {
        let name = formatPokemonName(evos[i].name);
        html += `
            <div aria-label="Evolution Item" class="evo-item">
                <img src="${evos[i].image}" alt="${name}">
                <span class='evoTitle'>${name}</span>
            </div>
            ${i < evos.length - 1 ? '<span class="evo-arrow">➜</span>' : ''}
        `;
    }
    return html + "</div>";
}