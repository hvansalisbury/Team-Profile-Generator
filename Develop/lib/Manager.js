// links to the employee module in the Employee.js file
const Employee = require('./Employee');
// manager sub class of the employee class
class Manager extends Employee {
    // manager constructor function, adds officeNumber property
    constructor(name, id, email, officeNumber) {
        // used to access the superclass Employee
        super(name, id, email);
        this.officeNumber = officeNumber;
    };
    // returns the role of Manager for the manager subclass
    getRole() {
        return 'Manager';
    }
}