const inquirer = require("inquirer");
var robot = require("robotjs");
const fs = require('fs');
let projectArray = ["project-A","project-B"];
const filePath = 'hub.js';
const startMarker = 'let projectArray = ';
const endMarker = ';';



function projectMenu(answers){
                robot.typeStringDelayed("cd ..",100000)
                robot.keyTap("enter");
                robot.typeStringDelayed(`cd ${answers}`,100000);
                robot.keyTap("enter");
                robot.typeStringDelayed("code .",100000)
                robot.keyTap("enter");
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
        choices: [...projectArray, "Back"]
    
    })
      .then(
        (answers)=>{
            projectMenu(answers.projectAction)
        }
        )
}

function addProject(){
    inquirer.prompt({
        type:"input",
        name:"newProjectName",
        message:"what will the name of the new project be?"
    })
    .then(
        (answers)=>{


            if (projectArray.includes(answers.newProjectName)) {
                 console.log("project with that name already exist. Please use a different name")
            }else{
             projectArray.push(answers.newProjectName);
             updateFile(filePath, projectArray, startMarker, endMarker);
              }

        }
    )

}

function deleteProject(){
    inquirer.prompt({
        type:"input",
        name:"deletedProjectName",
        message:"what will the name of the deleted project be?"
    })
    .then(
        (answers)=>{
            if (projectArray.includes(answers.deletedProjectName)) {
                projectArray = projectArray.filter(project => project !== answers.deletedProjectName);
            
                updateFile(filePath, projectArray, startMarker, endMarker);
            }else{
                console.log("project not found")
            }

        }
    )
}

function updateFile(filePath, projectArray, startMarker, endMarker) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const startPosition = fileContent.indexOf(startMarker);
    const endPosition = fileContent.indexOf(endMarker, startPosition);
  
    if (startPosition !== -1 && endPosition !== -1) {
   
      let updatedContent =
        fileContent.substring(0, startPosition + startMarker.length) +
        JSON.stringify(projectArray) +
        fileContent.substring(endPosition);
  
     
      fs.writeFileSync(filePath, updatedContent);
  
      console.log('Projects array updated successfully');
    } else {
      console.log('Project array did not update!');
    }
  }