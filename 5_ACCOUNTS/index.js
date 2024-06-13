// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos internos
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Transferir",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer.action;

      if (action == "Criar conta") {
        createAccount();
      } else if (action == "Depositar") {
        deposit();
      } else if (action == "Consultar Saldo") {
        getAccountBalance();
      } else if (action == "Sacar") {
        withdraw();
      } else if (action == "Transferir") {
        getTheTransferData();
      } else if (action == "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

// create an acount
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer.accountName;

      console.info(accountName);

      if (!fs.existsSync("accounts")) fs.mkdirSync("accounts");

      if (checkAccount(accountName)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome!")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        (err) => {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns, a sua conta foi criada!"));
      operation();
    })
    .catch((err) => console.log(err));
}

// add an amount to user account
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta",
      },
    ])
    .then((answer) => {
      const accountName = answer.accountName;

      // verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja depositar",
          },
        ])
        .then((answer) => {
          const amount = answer.amount;

          // add an amount
          addAmount(accountName, amount);

          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta não existe, escolha outro nome!")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde")
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer.accountName;

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${accountData.balance}`
        )
      );

      operation();
    })
    .catch((err) => console.log(err));
}

// withdraw an amount from user account
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer.accountName;

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer.amount;

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde")
    );
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Valor indisponível!"));
    return withdraw();
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );
  operation();
}

// transfer balance from one account to another
function getTheTransferData() {
  // get the name of the user account
  inquirer
    .prompt([
      {
        name: "myAccountName",
        message: "Digite o nome da sua conta:",
      },
    ])
    .then((answer) => {
      const myAccountName = answer.myAccountName;

      if (!checkAccount(myAccountName)) {
        return getTheTransferData();
      }

      // get the target account name
      inquirer
        .prompt([
          {
            name: "destinyAccountName",
            message: "Digite o nome da conta que receberá a transferência:",
          },
        ])
        .then((answer) => {
          const destinyAccountName = answer.destinyAccountName;

          if (!checkAccount(destinyAccountName)) {
            return getTheTransferData();
          }

          if (myAccountName == destinyAccountName) {
            console.log(
              chalk.bgRed.black(
                "A conta destino precisa ser diferente da conta de origem"
              )
            );
            return getTheTransferData();
          }

          // get the balance to be transferred
          inquirer
            .prompt([
              {
                name: "balanceToBeTransferred",
                message: "Digite o saldo a ser transferido:",
              },
            ])
            .then((answer) => {
              const balanceToBeTransferred = answer.balanceToBeTransferred;

              if (!balanceToBeTransferred) {
                console.log(
                  chalk.bgRed.black(
                    "Ocorreu um erro, tente novamente mais tarde"
                  )
                );
                return getTheTransferData();
              }

              // make the transfer
              makeTheTransfer(
                myAccountName,
                destinyAccountName,
                balanceToBeTransferred
              );
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function makeTheTransfer(
  myAccountName,
  destinyAccountName,
  balanceToBeTransferred
) {
  const myAccountFile = getAccount(myAccountName);
  const destinyAccountFile = getAccount(destinyAccountName);

  if (balanceToBeTransferred > myAccountFile.balance) {
    console.log(chalk.bgRed.black("Saldo indisponível na conta de origem!"));
    return getTheTransferData();
  }

  myAccountFile.balance =
    parseFloat(myAccountFile.balance) - parseFloat(balanceToBeTransferred);
  destinyAccountFile.balance =
    parseFloat(destinyAccountFile.balance) + parseFloat(balanceToBeTransferred);

  fs.writeFileSync(
    `accounts/${myAccountName}.json`,
    JSON.stringify(myAccountFile),
    (err) => {
      console.log(err);
    }
  );

  fs.writeFileSync(
    `accounts/${destinyAccountName}.json`,
    JSON.stringify(destinyAccountFile),
    (err) => {
      console.log(err);
    }
  );

  console.log(chalk.bgBlue.black("Transferência realizada com sucesso!"));

  return operation();
}
