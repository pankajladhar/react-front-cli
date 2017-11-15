const path = require("path");
const fs = require('fs-extra');
const chalk = require('chalk');
var runGITCommand = require('./RunGitCommand');
var inquirer = require('inquirer');
var semver = require('semver');

const pullRebase = ['pull', '--rebase'];
const addPackage = ['add', 'package.json'];
const addPackageLock = ['add', 'package-lock.json'];
const ammendCommit = ['commit', '--amend', '--no-edit'];
const chkLocalCommit = ['cherry', '-v'];
const createCommit = ['commit', '-m', 'Bump up version'];
const VER = {
    "PATCH": "patch",
    "MINOR": "minor",
    "MAJOR": "major",
};

const updatePackage = () => {
    const packageJSONFile = require(path.join(process.cwd(),'package.json'));
    const packageLockFile = require(path.join(process.cwd(),'package-lock.json'));
    const currentVersion = packageJSONFile.version;
    const questions = [
        {
            name: 'version',
            type: 'list',
            message: 'Which release version to be incremented ?',
            choices: [VER.PATCH, VER.MINOR, VER.MAJOR]
        }
    ];

    if (semver.valid(currentVersion)) {
        console.log(chalk.cyan(`Current version of the package.json is ${currentVersion} \n`));
    } else {
        return `Current version is invalid.`;
    }

    return (
        inquirer.prompt(questions)
            .then((option)=> {
                const updatedVersion = semver.inc(semver.valid(currentVersion), option.version);

                packageLockFile.version = packageJSONFile.version = updatedVersion;

                fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJSONFile, null, 2))
                fs.writeFileSync(path.join(process.cwd(), 'package-lock.json'), JSON.stringify(packageLockFile, null, 2))
                return `Version in package.json is updated to ${chalk.green(updatedVersion)} from ${chalk.red(currentVersion)} \n`

            })
            .catch((err) => {return err})
    )
}


var updateVersionNumber = function (option) {

        return runGITCommand(pullRebase, "pulling from git")
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(() => updatePackage())
        .then((data) => console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(addPackage, "adding package file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(addPackageLock, "adding lock file"))
        .then((data)=> console.log(chalk.cyan(data.toString())))
        .then(()=>runGITCommand(chkLocalCommit, "Checking local commit exists"))
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


