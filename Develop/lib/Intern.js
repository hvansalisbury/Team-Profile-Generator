// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');
// Intern sub class of the employee class
class Intern extends Employee {
    // Intern constructor function, adds school property
    constructor(name, id, email, school) {
        // used to access the superclass Employee
        super(name, id, email);
        this.school = school;
    };
    // gets school name
    getSchool() {
        return this.school;
    }
    // returns role of Intern
    getRole() {
        return 'Intern';
    }
}