// links to the employee module in the Employee.js file
const Employee = require('./Employee');
// Engineer sub class of the employee class
class Engineer extends Employee {
    // Engineer constructor function, adds github property
    constructor(name, id, email, github) {
        // used to access the superclass Employee
        super(name, id, email);
        this.github = github;
    };
    // gets github username
    getGithub() {
        return this.github;
    };
    // retuns role of engineer
    getRole() {
        return 'Engineer';
    };
};

module.exports = Engineer;