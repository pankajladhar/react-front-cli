var CLI = require('clui');

var spinner = function(cb){
    var countdown = new CLI.Spinner('Finishing in 10 sec...  ', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
    countdown.start();
    var number = 10;
    setInterval(function () {
        number--;
        countdown.message('Finishing in ' + number + ' seconds...   ');
        if (number === 0) {
            countdown.stop();
            cb()
            process.stdout.write('\n');
            process.exit(0);
        }
    }, 100);
}

module.exports = spinner;