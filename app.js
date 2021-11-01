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
                "Add department",
                "Add role",
                "Add employee"
            ]
        }
    ]).then(async ({ choice }) => {
        if (choice == 'View all employees') {
            const display = await employeeRoutes.getEmployees()
            console.table(display[0])
            mainMenu();
        }
        if (choice == "View all roles") {
            const display = await employeeRoutes.getRoles()
            console.table(display[0])
            mainMenu();
        }
        if (choice == "View all departments") {
            const display =  await employeeRoutes.getDepartment()
            console.table(display[0])
            mainMenu();
        }
        if (choice == "Add department") {
            employeeRoutes.addDepartment();
            // mainMenu();
        }
        if (choice == "Add role") {
            employeeRoutes.addRole();
            // mainMenu();
        }
        if ("Add employee") {
            employeeRoutes.addEmployee()
        }
    })
    // mainMenu();
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
        console.log(employee)
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