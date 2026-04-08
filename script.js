
function init() { //Hier wird die Funktion init aufgerufen, um die Anwendung zu starten. Diese Funktion wird verwendet, um alle notwendigen Schritte auszuführen, um die Anwendung zum Laufen zu bringen, wie z.B. das Laden von Daten oder das Einrichten von Event-Listenern.
    loadData(); //Hier wird die Funktion loadData aufgerufen, um Daten zu laden. Diese Funktion ist asynchron, da sie auf eine Antwort von einem Server wartet, um die Daten zu erhalten. Sobald die Daten geladen sind, werden sie in der Funktion renderContent angezeigt.
}

const Base_URL = "https://pokeapi.co/api/v2/pokemon?offset=1025&limit=20";

async function loadData(path = "") { //Hier wird die Funktion aufgerufen, um Daten zu laden. Der Pfad ist optional, da er bereits in der Funktion definiert ist.
    
    const Base_URL = "https://pokeapi.co/api/v2/pokemon?offset=1&limit=20";

    let response = await fetch(Base_URL + path + ".json"); //Hier wird die Fetch-Funktion aufgerufen, um Daten von der angegebenen URL zu erhalten. Der Pfad wird an die Basis-URL angehängt, und ".json" wird hinzugefügt, um die Daten im JSON-Format zu erhalten.
    let responsetoJson = await response.json(); //Hier wird die Antwort der Fetch-Funktion in JSON umgewandelt, damit sie leichter zu verarbeiten ist.
    renderContent(responsetoJson); //Hier wird die Funktion renderContent aufgerufen, um die erhaltenen Daten anzuzeigen. Die Daten werden als Argument übergeben, damit sie in der Funktion verwendet werden können.
} 

function renderContent(responsetoJson) {
    let contentRef = document.getElementById("mainContent"); 
    contentRef.innerHTML = "";
    contentRef.innerHTML = getContentTemplate(responsetoJson);
}