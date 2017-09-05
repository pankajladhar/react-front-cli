const path = require("path");
const fs = require('fs-extra');
const chalk = require('chalk');
var runGITCommand = require('./RunGitCommand');

const pullRebase = ['pull', '--rebase', 'origin', 'master'];
const addPackage = ['add', 'package.json'];
const addPackageLock = ['add', 'package-lock.json'];
const ammendCommit = ['commit', '--amend', '--no-edit'];

const packageJSONFile = require(path.join(process.cwd(),'package.json'));
const packageLockFile = require(path.join(process.cwd(),'package-lock.json'));


var updatePackage = () => {
    let currentVersion = packageJSONFile.version;
    let updatedVersion = packageJSONFile.version.replace(/\d+$/, (x)=>+x+1);
    packageLockFile.version = packageJSONFile.version = updatedVersion;

    
    fs.writeFileSync(path.join(process.cwd(),'package.json'), JSON.stringify(packageJSONFile,  null, 2))
    fs.writeFileSync(path.join(process.cwd(),'package-lock.json'), JSON.stringify(packageLockFile,  null, 2))
    console.log(chalk.cyan(`\n Version in package.json is updated to ${chalk.green(updatedVersion)} from ${chalk.red(currentVersion)} \n`))
}


var updateVersionNumber = function () {
        return runGITCommand(pullRebase, "pulling from git")
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(updatePackage)
        .then(()=>runGITCommand(addPackage, "adding package file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(addPackageLock, "adding lock file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(ammendCommit, "amending exisiting commit"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(() => 'done!!!')
}

module.exports = updateVersionNumber;


