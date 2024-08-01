import inquirer from "inquirer";
// mybank.js
class Account {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited $${amount}. New balance is $${this.balance}.`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds.");
        }
        else {
            this.balance -= amount;
            console.log(`Withdrew $${amount}. New balance is $${this.balance}.`);
        }
    }
    getBalance() {
        console.log(`The balance for ${this.owner} is $${this.balance}.`);
    }
}
class Bank {
    constructor() {
        this.accounts = [];
    }
    createAccount(owner, initialDeposit) {
        const account = new Account(owner, initialDeposit);
        this.accounts.push(account);
        console.log(`Account created for ${owner} with initial deposit of $${initialDeposit}.`);
    }
    findAccount(owner) {
        return this.accounts.find((account) => account.owner === owner);
    }
}
const bank = new Bank();
const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Create Account",
                "Deposit",
                "Withdraw",
                "Check Balance",
                "Exit",
            ],
        },
    ]);
    switch (answers.action) {
        case "Create Account":
            await createAccount();
            break;
        case "Deposit":
            await deposit();
            break;
        case "Withdraw":
            await withdraw();
            break;
        case "Check Balance":
            await checkBalance();
            break;
        case "Exit":
            console.log("Goodbye!");
            return;
    }
    mainMenu();
};
const createAccount = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "owner",
            message: "Enter the account owner name:",
        },
        {
            type: "number",
            name: "initialDeposit",
            message: "Enter the initial deposit amount:",
            validate: (value) => value >= 0 || "Initial deposit must be non-negative.",
        },
    ]);
    bank.createAccount(answers.owner, answers.initialDeposit);
};
const deposit = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "owner",
            message: "Enter the account owner name:",
        },
        {
            type: "number",
            name: "amount",
            message: "Enter the deposit amount:",
            validate: (value) => value > 0 || "Deposit amount must be positive.",
        },
    ]);
    const account = bank.findAccount(answers.owner);
    if (account) {
        account.deposit(answers.amount);
    }
    else {
        console.log("Account not found.");
    }
};
const withdraw = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "owner",
            message: "Enter the account owner name:",
        },
        {
            type: "number",
            name: "amount",
            message: "Enter the withdrawal amount:",
            validate: (value) => value > 0 || "Withdrawal amount must be positive.",
        },
    ]);
    const account = bank.findAccount(answers.owner);
    if (account) {
        account.withdraw(answers.amount);
    }
    else {
        console.log("Account not found.");
    }
};
const checkBalance = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "owner",
            message: "Enter the account owner name:",
        },
    ]);
    const account = bank.findAccount(answers.owner);
    if (account) {
        account.getBalance();
    }
    else {
        console.log("Account not found.");
    }
};
mainMenu();
