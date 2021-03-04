
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.yellow;

var resume = require("./resume.json");

var resumePrompts = {
    type: "list",
    name: "resumeOptions",
    message: "What do you want to know about me?",
    choices: [...Object.keys(resume), "Exit"]
};

function main() {
    console.log("----------------------------------------------------------");
    console.log("----------------------------------------------------------");
    console.log("Hello, My name is Priyanshu Dubey.Welcome to my CLI Resume");
    console.log("----------------------------------------------------------");
    console.log("----------------------------------------------------------");
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions == "Exit") {
            return;
        }
        var option = answer.resumeOptions;
        console.log(response("--------------------------------------"));
        resume[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    resumeHandler();
                } else {
                    return;
                }
            });
    });
}

main();