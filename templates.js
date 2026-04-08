
function getContentTemplate(responsetoJson) {
    return `<div class="content">
    <span>Hey ich bin ${responsetoJson.results[0].name}, ${responsetoJson.results[0].name} Jahre alt und wurde 1998 in ${responsetoJson.results[1].name} geboren.</span>
</div>`;
}