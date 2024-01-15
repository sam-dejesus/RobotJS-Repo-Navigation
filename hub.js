const inquirer = require("inquirer");
const cfonts = require('cfonts');

let projectArray = ["project-A","project-B"];
let name = "User";
const {Create, Project} = require('./lib/classes');
const execute = new Create();
const project = new Project();
const {System} = require('./lib/options')
const system = new System();
let test = ['red','blue']
const myFont = cfonts.say('Hello ' + name, {
    gradient: test , 

  });
  
  console.log(myFont); 

function start(){
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "hello, what would you like to do",
        choices: [
            "Navigate to a project",
            "Add a new project",
            "Delete a project",
            "Create a text file",
            "Create a folder",
            "Options",
            "Exit",
        ],
    
    })
      .then((answers) => {
        switch (answers.action){
            case "Navigate to a project":
                project.menu(projectArray)
                break;
            case  "Add a new project":
                project.add(projectArray)
                break;
            case "Delete a project":
                project.delete(projectArray)
                break;
            case "Create a text file":
                execute.createFile();
                break;
            case "Create a folder":
                execute.createFolder();
                break;
            case "Options":
            options();
            break;
            case "Exit":
                console.log("Goodbye!");
                break;
        }
      })
}
start()


function options(){
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "welcome to the options menu",
        choices: [
            "change the welcome name",
            "change the theme color",
            "back",
        ],
    })
    .then((answers) => {
        switch (answers.option){
            case "change the welcome name":
                system.updateName();
                break;
            case "back":
                start();
                break;
        }
    })
}

module.exports = {start}