const fs = require("fs");

fs.unlink("./arquivo.txt", (err) => {
    if (err) throw err;
    console.log("Arquivo removido com sucesso!");
});