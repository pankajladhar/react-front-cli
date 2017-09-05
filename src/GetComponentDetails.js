var inquirer    = require('inquirer');

var getComponentDetails = function (callback) {
    var questions = [
        {
            name: 'componentname',
            type: 'input',
            message: 'Enter your Component Name:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter component name';
                }
            }
        },
        {
            name: 'location',
            type: 'list',
            message: 'Location for component ?',
            choices: ["BaseComponents", "BusinessComponents", "StaticContent"]
        }
    ];

    return inquirer.prompt(questions)
}

module.exports = getComponentDetails;