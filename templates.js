function getContentTemplate(id, name, image, bgColor, iconsHtml, index) {
    return `
        <section onclick="openDetails(${index})" aria-label="View details for ${name}" onkeyup="if(event.key === 'Enter') openDetails(${index})" tabindex="0" class="smallCard">
            <div class="cardBg header-info">
                <span>#${id}</span>
                <span>${name}</span>
            </div>
            <div class="imgBg" aria-label="Pokemon Image" style="background-color: ${bgColor}">
                <img class="smallCardImg" src="${image}" alt="${name}">
            </div>
            <div class="cardBg typeIconsContainer">${iconsHtml}</div>
        </section>`;
}

function getDetailTemplate(data, name, bgColor, iconsHtml, index, statsHtml, isFirst, isLast) {
    return `
        <div class="detail-header" style="background-color: ${bgColor}">
            <button class="close-btn" aria-label="Close" onclick="closeDetails()" tabindex="0">X</button>
            <div class="header-top">
                <span class="detail-id">#${data.id}</span>
                <span class="detail-name">${name}</span>
            </div>
            <div class="header-types">${iconsHtml}</div>
            <img class="detail-img" src="${data.image}" alt="${name}">
        </div>
        <div class="detail-body">
            <div class="pokemon-specs">
                <span><b>Height:</b> ${data.height / 10} m</span>
                <span><b>Weight:</b> ${data.weight / 10} kg</span>
            </div>
            <div class="stats-container">${statsHtml}</div>
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

function getStatRowTemplate(label, value, width) {
    return `
        <div class="stat-row">
            <span class="stat-name">${label}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${width}%"></div>
            </div>
            <span class="stat-value">${value}</span>
        </div>`;
}

function getEvoItemTemplate(image, name, showArrow) {
    return `
        <div aria-label="Evolution Item" class="evo-item">
            <img src="${image}" alt="${name}">
            <span class='evoTitle'>${name}</span>
        </div>
        ${showArrow ? '<span class="evo-arrow">➜</span>' : ''}
    `;
}

function getEvoListTemplate(itemsHtml) {
    return `<b class='evoTitle'>Evolution Chain:</b><div class='evo-row'>${itemsHtml}</div>`;
}