
const express = require("express");
const cors = require("cors");
const path = require("path");
const carros = require("./data/carros.json");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(
    "/fotos",
    express.static(path.join(__dirname, "data/fotos"))
);

function sortear(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// Rota para sortear um carro aleatório
app.get("/api/carros/aleatorio", (req, res) => {
    const todosOsCarros = Object.values(carros).flat();

    if (todosOsCarros.length === 0) {
        return res.status(404).json({
            status: "error",
            message: "Nenhum carro cadastrado."
        });
    }

    const item = sortear(todosOsCarros);

    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

// Rota para buscar um carro por marca
app.get("/api/carros/:marca", (req, res) => {
    const marca = req.params.marca.toLowerCase();

    if (!carros[marca] || carros[marca].length === 0) {
        return res.status(404).json({
            status: "error",
            message: `Marca "${marca}" não encontrada. Tente outra marca!`
        });
    }

    const item = sortear(carros[marca]);

    res.json({
        status: "success",
        message: `http://localhost:${PORT}/fotos/${item}`
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log("📂 Fotos na pasta data/fotos/");
});
