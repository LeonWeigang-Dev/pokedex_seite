
function getContentTemplate(responsetoJson, index) {
    let pokemonName = responsetoJson.results[index].name;
    let pokemonId = index + 1;

    return `<section tabindex="0"  class="smallCard">
            <div class="cardBg">
                <span>#${pokemonId}</span>
                <span>${pokemonName}</span>
            </div>
            <div>
                <img class="smallCardImg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="${pokemonName}">
            </div>
            <div class="cardBg typeIconsContainer">
                <img class="typeIcons" src="./img/Type=Grass.svg" alt="Grass Type">
                <img class="typeIcons" src="./img/Type=Poison.svg" alt="Poison Type">
            </div>
        </section>`;
}