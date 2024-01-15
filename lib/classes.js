const inquirer = require('inquirer');
const robot = require('robotjs');
const fs = require('fs');



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
  
class Create {
  constructor() {
    this.name = "";
  }

  createFile() {
    inquirer.prompt({
      type: "input",
      name: "fileName",
      message: "What would you like the file to be called?",
    })
      .then((answers) => {
        robot.typeStringDelayed("cd ..", 100000);
        robot.keyTap("enter");
        robot.typeStringDelayed(`touch ${answers.fileName}.txt`, 100000);
        robot.keyTap("enter");
        robot.typeStringDelayed(`cd RobotJS-Repo-Navigation`,10000)
        robot.keyTap("enter");
        robot.typeStringDelayed(`node hub.js`,100000)
        robot.keyTap("enter")
      });
  }

  createFolder(){
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
        robot.typeStringDelayed(`cd RobotJS-Repo-Navigation`,10000)
        robot.keyTap("enter");
        robot.typeStringDelayed(`node hub.js`,100000)
        robot.keyTap("enter")

    })
  }
}


class Project {
    constructor(){
        this.name
        
    }
    
    navigate(answers){
        robot.typeStringDelayed("cd ..",100000)
        robot.keyTap("enter");
        robot.typeStringDelayed(`cd ${answers}`,100000);
        robot.keyTap("enter");
        robot.typeStringDelayed("code .",100000)
        robot.keyTap("enter");
    }

    menu(projectArray){
        
        inquirer.prompt({
            type: "list",
            name: "projectAction",
            message: "which project do you want to navigate to?",
            choices: [projectArray]
        
        })
          .then(
            (answers)=>{
                this.navigate(answers.projectAction)
                }
            )
    }

    add(projectArray){
      const filePath = 'hub.js';
      const startMarker = 'let projectArray = ';
      const endMarker = ';';
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
    delete(projectArray){
        const filePath = 'hub.js';
        const startMarker = 'let projectArray = ';
        const endMarker = ';';
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
}
module.exports = {Create, Project, updateFile};
