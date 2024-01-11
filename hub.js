const inquirer = require("inquirer");
var robot = require("robotjs");

let projectArray = ["project-A", "project-B", ]
function projectMenu(answers){
    
        for (let i = 0; i < projectArray.length; i++) {
            if (answers.projectAction === projectArray[i]) {
                robot.typeStringDelayed("cd ..",100000)
                robot.keyTap("enter");
                robot.typeStringDelayed(`cd ${answers.projectAction}`,100000);
                robot.keyTap("enter");
                robot.typeStringDelayed("code .",100000)
                robot.keyTap("enter");
                break;
            }
        }
    
}

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
                projectMenuStart();
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

function textFile() {
    inquirer.prompt({
        type:"input",
        name:"fileName",
        message:"what would you like the file to be called?",
    })
    .then((answers)=>{
        robot.typeStringDelayed("cd ..",100000)
        robot.keyTap("enter");
        robot.typeStringDelayed(`touch ${answers.fileName}.txt`,100000);
        robot.keyTap("enter");

    })
}

function folder(){
    inquirer.prompt({
        type:"input",
        name:"folderName",
        message:"what would you like the folder to be called?",
    })
    .then((answers)=>{
        robot.typeStringDelayed("cd ..",100000)
        robot.keyTap("enter");
        robot.typeStringDelayed(`mkdir ${answers.folderName}`,100000);
        robot.keyTap("enter");

    })
}

function projectMenuStart(){
    inquirer.prompt({
        type: "list",
        name: "projectAction",
        message: "which project do you want to navigate to?",
        choices: projectArray,
    
    })
      .then(
        (answers)=>{
            projectMenu(answers)
        }
        )
}