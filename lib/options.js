const fs = require('fs');
const inquirer = require('inquirer');
const robot = require('robotjs');
const {updateFile} = require('./classes')

class System {
    constructor() {
        this.name = "";
      }

    updateName(){
        const filePath = 'hub.js';
        const startMarker = 'let name = ';
        const endMarker = ';';
        inquirer.prompt({
            type:"input",
            name:"userName",
            message:"what will the name of the welcome screen be?"
        })
        .then(
            (answers)=>{
             updateFile(filePath, answers.userName, startMarker, endMarker);
             robot.typeStringDelayed("node hub.js",9000000)
             robot.keyTap("enter")

            }
        )
    }
}
module.exports = {System}