const inquirer = require("inquirer");

let projectArray = ["project-A","project-B"];
const {Create, Project} = require('./lib/classes');
const execute = new Create();
const project = new Project()


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
            case "Exit":
                console.log("Goodbye!");
                break;
        }
      })
}
start()


