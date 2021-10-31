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

//adds a port designation
const PORT = process.env.PORT || 3001;

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
                "View all employees by Department",
                "View all employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee by Department",
                "Update Employee by Manager"]
        }
    ]).then(({ choice }) => {
        if (choice == 'View all employees') {
            `SELECT * FROM employee`
        }
        if (choice == "View all employees by Department") {
            selectDepartment()
        }
        if (choice == "View all employees by Manager") {
            selectManager()
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

//Selecting employee from a certain department 
const selectDepartment = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What department are you looking for?',
            name: 'department_id',
            choices: ['IT', 'sales', 'marketing', 'recruiting'],
        }
    ]).then(({ choice }) => {
        choice.department_id
        mainMenu();
    })

}

//Select employee with a certain manager
const selectManager = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What manager are you looking for',
            name: 'manager_id',
            choices: ['']
        }
    ]).then(({ choice }) => {
        choice.manager_id
        mainMenu();
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
