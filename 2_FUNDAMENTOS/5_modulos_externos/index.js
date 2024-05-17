const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

console.log(args["nome"])

//console.log(process.argv.slice(2));

