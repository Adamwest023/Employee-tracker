// calling inquirer
const inquirer = require('inquirer');
//imports express into the file
const express = require('express');
//call file save
const fs = require('fs');
//call console table
const cTable = require('console.table');
//call database
const db = require('./db/connection');

// call routes
const employeeRoutes = require('./routes/apiRoutes/employeeRoutes');
const exp = require('constants');

//adds a port designation
const PORT = process.env.PORT || 3002;

//adds the app expression
const app = express();


//first prompt
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'choice',
            choices: [
                'View all employees',
                "View all roles",
                "View all departments",
                "Add Employee",
                "Remove Employee",
                "Update Employee by Department",
                "Update Employee by Manager"]
        }
    ]).then(({ choice }) => {
        if (choice == 'View all employees') {
            employeeRoutes.getEmployees();
            mainMenu();
        }
        if (choice == "View all roles") {
            employeeRoutes.getRoles()
            mainMenu();
        }
        if (choice == "View all departments") {
            employeeRoutes.getDepartment()
            mainMenu();
        }
        if (choice == "Add Employee") {
            addEmployee()
        }
        if (choice == "Remove Employee") {
            removeEmployee()
        }
        if (choice == "Update Employee by Department") {
            updateDepartment()
        }
        if ("Update Employee by Manager") {
            updateManager()
        }
    })
};

//Add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is your first name?"
        },
        {
            type: "input",
            name: 'lastName',
            message: "What is your last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: ['engineer',
                'sales associate',
                'graphic designer',
                'recruiter',
                'jr sales associate',
                'senior engineer']
        }
    ]).then(answers => {
        const employee = new employee(answers.firstName, answers.lastName, answers.role)
        
        mainMenu();
    })
}

//starts the express.js on port 3001
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


mainMenu();