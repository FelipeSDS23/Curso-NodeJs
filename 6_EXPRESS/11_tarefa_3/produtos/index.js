const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates");

router.get("/cadastrar", (req, res) => {
    res.sendFile(`${basePath}/cadastro.html`);
});

router.get("/listar", (req, res) => {
    res.sendFile(`${basePath}/listar.html`);
});

module.exports = router;