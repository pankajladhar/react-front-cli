const path = require("path");
const fs = require('fs-extra');
const chalk = require('chalk');
var runGITCommand = require('./RunGitCommand');

let currentVersion, updatedVersion;

const pullRebase = ['pull', '--rebase', 'origin', 'master'];
const addPackage = ['add', 'package.json'];
const addPackageLock = ['add', 'package-lock.json'];
const ammendCommit = ['commit', '--amend', '--no-edit'];
const chkLocalCommit = ['cherry', '-v'];
const createCommit = ['commit', '-m', 'Bump up version'];

var updatePackage = () => {
    const packageJSONFile = require(path.join(process.cwd(),'package.json'));
    const packageLockFile = require(path.join(process.cwd(),'package-lock.json'));
    currentVersion = packageJSONFile.version;
    updatedVersion = packageJSONFile.version.replace(/\d+$/, (x)=>+x+1);
    packageLockFile.version = packageJSONFile.version = updatedVersion;

    
    fs.writeFileSync(path.join(process.cwd(),'package.json'), JSON.stringify(packageJSONFile,  null, 2))
    fs.writeFileSync(path.join(process.cwd(),'package-lock.json'), JSON.stringify(packageLockFile,  null, 2))
    console.log(chalk.cyan(`Version in package.json is updated to ${chalk.green(updatedVersion)} from ${chalk.red(currentVersion)} \n`))
}


var updateVersionNumber = function () {
    
        return runGITCommand(pullRebase, "pulling from git")
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(updatePackage)
        .then(()=>runGITCommand(addPackage, "adding package file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(addPackageLock, "adding lock file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(chkLocalCommit, "Checking local commit exists"))
        .then((data)=>{
            return data;
        })
        .then((data)=>{
            if(data.length > 0) {
                return runGITCommand(ammendCommit, "amending exisiting commit")
            }
            else{
                return runGITCommand(createCommit, "creating new commit")
            }
            
        })
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(() => 'done!!!')
}

module.exports = updateVersionNumber;


