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
const makeHtml = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees));
}
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

            },
            {
                type: 'number',
                name: 'employeeID',
                message: 'Employee ID number',
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: 'Employee email',
            },
            {
                type: 'number',
                name: 'managerOffice',
                message: 'Office number of Manager',
                when: (answers) => answers.position === 'Manager',
            },
            {
                type: 'input',
                name: 'githubUsername',
                message: 'Github username',
                when: (answers) => answers.position === 'Engineer',
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "Intern's school",
                when: (answers) => answers.position === 'Intern',
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
            console.log(employees)
            if (answers.anotherEmployee) {
                return buildTeam();
            } else {
                return makeHtml();
            };
        });
};


const init = () => {
    buildTeam()
}

init()
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
