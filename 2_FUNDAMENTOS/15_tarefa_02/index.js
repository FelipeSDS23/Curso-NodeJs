const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer.prompt([
    {
        name: "nome",
        message: "Digite seu nome:"
    },
    {
        name: "idade",
        message: "Digite a sua idade:"
    }
]).then((answers) => {
    console.log(chalk.bgYellow.black(`${answers.nome} tem ${answers.idade}.`));
}).catch((err) => {
    console.log(err);
})