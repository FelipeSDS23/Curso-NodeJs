const fs = require("fs");

const arquivoAntigo = "arquivo.txt";
const arquivoNovo = "novoarquivo.txt";

fs.rename(arquivoAntigo, arquivoNovo, (err) => {
    if (err) throw err;
    console.log(`O arquivo ${arquivoAntigo} foi renomeado para ${arquivoNovo}!`);
});