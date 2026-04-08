
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
    let img = pokemonData.sprites.other['official-artwork'].front_default;
    let iconsHtml = getTypeIconsHtml(typeInfos);
    return `
        <section tabindex="0" role="button" class="smallCard">
            <div class="cardBg">
            <span>#${pokemonData.id}</span>
            <span> ${name}</span>
            </div>
            <div class="imgBg" style="background-color: ${typeInfos[0].color}">
                <img class="smallCardImg" src="${img}" alt="${name}">
            </div>
            <div class="cardBg typeIconsContainer">${iconsHtml}</div>
        </section>`;
}