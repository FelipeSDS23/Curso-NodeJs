const express = require("express");
const app = express();

const port = 5000;

const path = require("path");

const basePath = path.join(__dirname, "templates");

// rotas de produtos
const produtos = require("./produtos");
app.use("/produtos", produtos);

// arquivos estáticos
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

// 404
app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})