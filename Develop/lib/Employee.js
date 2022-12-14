// Employee class with constructor and getName, getID, getEmail, and getRole functions
class Employee {
    // constructor function for employee parent class
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    };
    // gets employee name
    getName() {
        return this.name;
    };
    // gets employee ID
    getID() {
        return this.id;
    };
    // gets employee email
    getEmail() {
        return this.email;
    };
    // returns role of employee
    getRole() {
        return 'Employee';
    };
}
// exports Employee class so other files can have access to this code
module.exports = Employee;