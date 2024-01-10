const inquirer = require("inquirer");
var robot = require("robotjs");

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
            "Exit",
        ],
    
    })
      .then((answers) => {
        switch (answers.action){
            case "Navigate to a project":
                projectMenu();
                break;
            case  "Add a new project":
                addProject();
                break;
            case "Delete a project":
                deleteProject();
                break;
            case "Create a text file":
                textFile();
                break;
            case "Create a folder":
                folder();
                break;
            case "Exit":
                console.log("Goodbye!");
                break;
        }
      })
}
start();


