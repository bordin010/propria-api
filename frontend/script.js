
const carImage = document.getElementById("carImage");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const breedInput = document.getElementById("breedInput");
const errorMessage = document.getElementById("errorMessage");

const API = "http://localhost:3000/api/carros";

// Função para buscar um carro
async function buscarCarro(url) {
    errorMessage.textContent = "";
    errorMessage.removeAttribute("style");
    carImage.style.display = "none";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Mostra a mensagem no centro quando ocorre um erro
        if (!response.ok) {
            errorMessage.textContent = data.message;

            errorMessage.style.position = "fixed";
            errorMessage.style.top = "50%";
            errorMessage.style.left = "50%";
            errorMessage.style.transform = "translate(-50%, -50%)";
            errorMessage.style.width = "80%";
            errorMessage.style.maxWidth = "500px";
            errorMessage.style.textAlign = "center";
            errorMessage.style.background = "#ffffff";
            errorMessage.style.color = "#ff4d4d";
            errorMessage.style.fontSize = "22px";
            errorMessage.style.fontWeight = "bold";
            errorMessage.style.padding = "25px";
            errorMessage.style.borderRadius = "12px";
            errorMessage.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            errorMessage.style.zIndex = "1000";
            errorMessage.style.margin = "0";
            errorMessage.style.boxSizing = "border-box";

            return;
        }

        // Exibe a foto do carro
        carImage.onload = () => {
            carImage.style.display = "block";
        };

        carImage.onerror = () => {
            carImage.style.display = "none";
            errorMessage.textContent =
                "Não foi possível carregar a foto do carro.";
        };

        carImage.src = data.message;

    } catch (error) {
        errorMessage.textContent =
            "Não foi possível conectar à API. Verifique se o servidor está funcionando.";

        errorMessage.style.position = "fixed";
        errorMessage.style.top = "50%";
        errorMessage.style.left = "50%";
        errorMessage.style.transform = "translate(-50%, -50%)";
        errorMessage.style.width = "80%";
        errorMessage.style.maxWidth = "500px";
        errorMessage.style.textAlign = "center";
        errorMessage.style.background = "#ffffff";
        errorMessage.style.color = "#ff4d4d";
        errorMessage.style.fontSize = "22px";
        errorMessage.style.fontWeight = "bold";
        errorMessage.style.padding = "25px";
        errorMessage.style.borderRadius = "12px";
        errorMessage.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        errorMessage.style.zIndex = "1000";
        errorMessage.style.margin = "0";
        errorMessage.style.boxSizing = "border-box";
    }
}

// Botão de carro aleatório
randomBtn.addEventListener("click", () => {
    buscarCarro(`${API}/aleatorio`);
});

// Botão de busca por marca
searchBtn.addEventListener("click", () => {
    const marca = breedInput.value.trim().toLowerCase();

    if (marca === "") {
        errorMessage.textContent = "Digite uma marca para pesquisar!";

        errorMessage.style.position = "fixed";
        errorMessage.style.top = "50%";
        errorMessage.style.left = "50%";
        errorMessage.style.transform = "translate(-50%, -50%)";
        errorMessage.style.width = "80%";
        errorMessage.style.maxWidth = "500px";
        errorMessage.style.textAlign = "center";
        errorMessage.style.background = "#ffffff";
        errorMessage.style.color = "#ff4d4d";
        errorMessage.style.fontSize = "22px";
        errorMessage.style.fontWeight = "bold";
        errorMessage.style.padding = "25px";
        errorMessage.style.borderRadius = "12px";
        errorMessage.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        errorMessage.style.zIndex = "1000";
        errorMessage.style.margin = "0";
        errorMessage.style.boxSizing = "border-box";

        carImage.style.display = "none";
        return;
    }

    buscarCarro(`${API}/${encodeURIComponent(marca)}`);
});

// Permite pesquisar apertando Enter
breedInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});