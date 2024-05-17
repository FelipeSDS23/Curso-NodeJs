const chalk = require("chalk");

let nota = 7;

if(nota >= 7) {
    console.log(chalk.green(`Parabéns, sua nota foi ${nota}!`));
} else if(nota >= 4) {
    console.log(chalk.yellow(`Atenção, sua nota foi ${nota}`));
} else {
    console.log(chalk.red(`Precisa estudar mais, sua nota foi ${nota}`));
}