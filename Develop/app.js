// connects to different js files being used
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// creates path and html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// connects to htmlRenderer.js
const render = require("./lib/htmlRenderer");
// empty array to store team members
const employees = [];
// function to check if the output directory exists
const checkDir = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    };
};
// function to write the team.html file
const makeHtml = () => {
    const teamFile = render(employees);
    checkDir();
    fs.writeFileSync(outputPath, teamFile);
};
// function to only allow numbers as in input for id and office number fields
const validateNum = async (input) => {
    if (!isNaN(input)) {
        return true;
    } else {
        console.log('Please enter a number, press up and delete previous entry');
        return false;
    };
};
// function to does not allow blank inputs for input fields
const validateInput = async (input) => {
    if (input !== '') {
        return true;
    } else {
        console.log('This field does not accept blank values, press up and delete previous entry');
        return false;
    };
};
// function to make sure @ is used in the email address
const validateEmail = async (input) => {
    if (input.includes('@')) {
        return true;
    } else {
        console.log('Email addresses require the @ symbol');
        return false;
    };
};

// function to get employee details
const buildTeam = () => {
    // inquirer prompts questions for user to answer about the employee
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'position',
                message: 'Employee Position',
                choices: ['Manager', 'Engineer', 'Intern'],
            },
            {
                type: 'input',
                name: 'employeeName',
                message: 'Employee name',
                validate: validateInput,
            },
            {
                type: 'number',
                name: 'employeeID',
                message: 'Employee ID number',
                validate: validateNum,
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: 'Employee email',
                validate: validateEmail,
            },
            {
                type: 'number',
                name: 'managerOffice',
                message: 'Office number of Manager',
                when: (answers) => answers.position === 'Manager',
                validate: validateNum,
            },
            {
                type: 'input',
                name: 'githubUsername',
                message: 'Github username',
                when: (answers) => answers.position === 'Engineer',
                validate: validateInput,
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "Intern's school",
                when: (answers) => answers.position === 'Intern',
                validate: validateInput,
            },
            {
                type: 'confirm',
                name: 'anotherEmployee',
                message: 'Add another employee?',
            },
        ])
        // takes the respsonses and creates an employee object using constructor functions
        .then((answers) => {
            let addedEmployee;
            if (answers.position === 'Manager') {
                addedEmployee = new Manager(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.managerOffice);
            };
            if (answers.position === 'Engineer') {
                addedEmployee = new Engineer(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.githubUsername);
            };
            if (answers.position === 'Intern') {
                addedEmployee = new Intern(answers.employeeName, answers.employeeID, answers.employeeEmail, answers.internSchool);
            };
            // adds employee object to team array
            employees.push(addedEmployee);
            // if user wishes to add another employee, asks questions again, otherwise returns team array
            if (answers.anotherEmployee) {
                return buildTeam();
            } else {
                return makeHtml();
            };
        });
};
// function to start the prompt
const init = () => {
    console.log('Please enter the appropriate response for each prompt');
    buildTeam();
};
// runs init function
init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
