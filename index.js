const inquirer = require('inquirer');
const chalk = require('chalk');
const resume = require('./resume.json');

function response(msg) {
    return chalk.green(msg);
}

function resumeHandler() {
    const resumePrompts = {
        type: "list",
        name: "resumeOptions",
        message: "What do you want to know about me?",
        choices: Object.keys(resume).concat("Exit")
    };

    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions === "Exit") {
            console.log(chalk.yellow("Thank you for using the CLI Resume!"));
            return;
        }
        const option = answer.resumeOptions;
        console.log(response("--------------------------------------"));
        resume[option].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        inquirer.prompt({
            type: "list",
            name: "exitBack",
            message: "Go back or Exit?",
            choices: ["Back", "Exit"]
        }).then(choice => {
            if (choice.exitBack === "Back") {
                resumeHandler();
            } else {
                console.log(chalk.yellow("Thank you for using the CLI Resume!"));
                return;
            }
        }).catch(err => console.error(chalk.red("Failed to get choice: " + err)));
    }).catch(err => console.error(chalk.red("Failed to get answer: " + err)));
}

function main() {
    console.log(chalk.blue("----------------------------------------------------------"));
    console.log(chalk.blue("Hello, My name is Priyanshu Dubey. Welcome to my CLI Resume"));
    console.log(chalk.blue("----------------------------------------------------------"));
    resumeHandler();
}

main();