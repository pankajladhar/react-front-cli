#!/usr/bin/env node
var chalk       = require('chalk');
var figlet      = require('figlet');
var commander   = require('commander');
var treeify     = require('treeify');
const packageJSONFile = require('./package.json');

var getComponentDetails = require('./src/GetComponentDetails');
var createComponentSkeleton = require('./src/CreateComponent');
var updateVersionNumber = require('./src/UpdateVersionNumber');
var runGITCommand = require('./src/RunGitCommand');


commander
 .version(packageJSONFile.version)
 .option('-c, --createcomponent', 'use to create component')
 .option('-u, --updateversion', 'use to bump up version number')
 .parse(process.argv);

 if(commander.createcomponent){
    getComponentDetails()
    .then(function(){
        let userEnteredComponentName = arguments[0].componentname;
        
        let componentName = userEnteredComponentName.charAt(0).toUpperCase() + userEnteredComponentName.slice(1)
        let location = arguments[0].location;
        const baseURL = 'src/Components/';
        
        createComponentSkeleton(componentName, location, baseURL).then((data)=>{
            console.log(chalk.green("\nFollowing structure has been generated--\n"));
            console.log( treeify.asTree(data, true) );
            console.log( chalk.yellow( figlet.textSync("done", { horizontalLayout: 'full' })));
        });
        

    }).catch(function(err){
        console.log(chalk.red(err))
    });
 }
 else if(commander.updateversion){
     updateVersionNumber()
     .then((data)=>{
        console.log( chalk.yellow( figlet.textSync(data, { horizontalLayout: 'full' })));
     }).catch((err) => {
        console.log(chalk.red(err))
     })
 }
else{
    commander.help()
}

