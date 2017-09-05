const chalk = require('chalk');
const { spawn } = require('child_process');

var runGITCommand = function(args, commandTye){
    var promise = new Promise((resolve, reject) =>{
        console.log(chalk.green("######################################"))    
        console.log(chalk.green(`    ${commandTye}    `))    
        console.log(chalk.green("######################################"))    

        let command = spawn('git', args);
        let stdOutData = "", stderrData="";

        command.stdout.on('data', (data) => stdOutData += data )
        command.stderr.on('data', (data) => stderrData += data );
        command.on('close', (code) => code!=0 ? reject(stderrData) : resolve(stdOutData));
    })

    return promise;
}

module.exports = runGITCommand;