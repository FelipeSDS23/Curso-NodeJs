const inquirer = require("inquirer");

inquirer.prompt([
    {
        name: "p1",
        message: "Qual a primeira nota?"
    },
    {
        name: "p2",
        message: "Qual a segunda nota?"
    }
]).then((answers) => {

    let qtdDeItens = Object.keys(answers).length; // Conta a quantidade de chaves no objeto resposta
    let media = (parseInt(answers.p1) + parseInt(answers.p2)) / qtdDeItens; // Faz a média (valor das respostas dividido pelo número de respostas)
    console.log(`A média das notas é ${media}`);

}).catch((err) => {
    console.log(err);
})