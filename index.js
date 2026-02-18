
const inquirer = require('inquirer');
const chalk = require('chalk');
const resume = require('./resume.json');

// Define a resume handler to handle user inputs
function resumeHandler() {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions === "Exit") {
            return;
        }

        const option = answer.resumeOptions;
        console.log(chalk.blue("--------------------------------------"));
        if (resume[option]) {
            resume[option].forEach(info => {
                console.log(chalk.green("|   => " + info));
            });
        } else {
            console.log(chalk.red("No information available for this option."));
        }
        console.log(chalk.blue("--------------------------------------"));

        promptToGoBack();
    }).catch(error => {
        console.error(chalk.red("An error occurred during the prompt: ", error.message));
    });
}

// Function to prompt the user to go back or exit
function promptToGoBack() {
    inquirer.prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
    }).then(choice => {
        if (choice.exitBack === "Back") {
            resumeHandler();
        }
    }).catch(error => {
        console.error(chalk.red("An error occurred during the prompt: ", error.message));
    });
}

// Main function to initialize the program
function main() {
    console.log(chalk.yellow("----------------------------------------------------------"));
    console.log(chalk.yellow("Hello, My name is Priyanshu Dubey. Welcome to my CLI Resume"));
    console.log(chalk.yellow("----------------------------------------------------------"));
    resumeHandler(); // Start the resume handler
}

main(); // Invoke main to start the application
