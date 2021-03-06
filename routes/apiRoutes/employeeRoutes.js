const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');


// creates connections with the db and util folder
const db = require('../../db/connection.js');
const { log } = require('console');
const { number } = require('easy-table');

//route that get to all employee
exports.getEmployees = () => {
    const sql = `SELECT * From employee`
    //calls query to either bring up asked for data or an error
    return db.promise().query(sql)
};

//route to get all departments
exports.getDepartment = () => {
    const sql = `Select * From department`
    //calls query in a promise to  bring up asked for data and send to app.js
    return db.promise().query(sql)
};

//route to get all roles
exports.getRoles = () => {
    //sets our command into a variable
    const sql = `SELECT * FROM role`

    return db.promise().query(sql);
};


//route to add a department
exports.addDepartment = async () => {
    //runs our prompt to ask for what department would like to be added
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the department you would like to add?',
            name: 'department'
        }
    ]).then(answer => {
        //validation
        if (answer.department == 0 || answer.department == " ") {
            console.log('Please enter a valid department');
            return this.addDepartment();
        }

        const sql = `INSERT INTO department(name) VALUE (?)`
        db.query(sql, [answer.department], (err, data) => {
            if (err) {
                console.log(err.message)
            }
            console.log(cTable.getTable(`${answer.department} has been added!`));

        });
    });
};

//function that continuously pulls new departments 
function departmentSearch() {
    return db.promise().query('SELECT * FROM department')
}

//route to add role
exports.addRole = async () => {
    const departments = await departmentSearch()
    const parsedDept = Object.values(JSON.parse(JSON.stringify(departments[0])));

    const structuredArr = []
    parsedDept.forEach(index => {
        structuredArr.push({
            name: index.name,
            value: index.id
        })
    });

    return inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role you would like to add?"
        },
        {
            type: "number",
            name: "salary",
            message: "How much does this role make?",
        },
        {
            type: "list",
            name: "department",
            choices: structuredArr,
            message: "What is the department?"
        }
    ]).then(answer => {
        //validation 
        if (answer.role == " " || answer.role == 0 || answer.salary == " " || answer.department_id == " ") {
            console.log("must enter valid answers");
            return this.addRole();
        }
        const sql = `INSERT INTO role (title , salary, department_id) VALUE (?,?,?)`
        db.query(sql, [answer.role, answer.salary, answer.department], (err, data) => {
            if (err) {
                console.log(err.message)
            }
            console.log(cTable.getTable(`The Role ${answer.role} has been added!`));
        });
    });
}

//updates if new role is added
function roleSearch() {
    return db.promise().query(`SELECT * FROM role`)
}
// // function to call manager id
// function managerSearch() {
//     return db.promise().query(`SELECT * FROM `)
// }

//add an employee
exports.addEmployee = async () => {
    //calls added role function
    const title = await roleSearch();
    //parses into a json file
    const parsedRole = Object.values(JSON.parse(JSON.stringify(title[0])));
    //restructures into an array 
    const structuredArr = []
    parsedRole.forEach(index => {
        structuredArr.push({
            name: index.title,
            value: index.id
        })
    });
    // prompts for what will be asked about the employee
    return inquirer.prompt([
        {
            type: "input",
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: " What is the employee's last name?"
        },
        {
            //uses the updated roles to make picking from roles easier
            type: "list",
            name: "role",
            choices: structuredArr,
            message: "What is the employee's role?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "what is the employee's manager's id"
        }
    ]).then(answers => {
        // console.log(answers.first_name, answers.last_name, answers.role, answers.manager_id);
        if (answers.first_name == " " || answers.first_name == 0 || answers.last_name == " " ||
            answers.last_name == 0) {
            console.log("Answers are not valid please try again")
            return this.addEmployee();
        }

        const sql = ` INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`

        db.query(sql, [answers.first_name, answers.last_name, answers.role, answers.manager_id], (err, data) => {
            if (err) {
                console.log(err.message)
            }
            console.log(cTable.getTable(`The employee ${answers.first_name} ${answers.last_name} has been added!`));
        });
    });
};

//function to look for employees 
function employeeSearch() {
    return db.promise().query(`SELECT * FROM employee`)
}


// update an employee's role
exports.updateRole = async () => {
    //calls added role function
    const employee = await employeeSearch();
    const title = await roleSearch()

    //parses into a json file for employees
    const parsedEmp = Object.values(JSON.parse(JSON.stringify(employee[0])));
    //restructures into an array 
    const structuredArr = []
    parsedEmp.forEach(index => {
        structuredArr.push({
            name: index.first_name,
            value: index.id
        })
    });

    //parses into a json  Role file
    const parsedRole = Object.values(JSON.parse(JSON.stringify(title[0])));
    //restructures into an array 
    const structuredRoleArr = []
    parsedRole.forEach(index => {
        structuredRoleArr.push({
            name: index.title,
            value: index.id
        })
    });
    //prompts for picking an employee and changing their role
    return inquirer.prompt([
        {
            type: "list",
            choices: structuredArr,
            message: "Which Employee would you like to update?",
            name: "employee_id"
        },
        {
            type: "list",
            choices: structuredRoleArr,
            message: "What would you like to update the role to?",
            name: "new_role"
        }
    ]).then(answers => {
        //updates the employee role using the role_id on the employee table
        const sql = "UPDATE employee SET role_id =? WHERE id = ?"
        db.query(sql, [answers.new_role, answers.employee_id], (err, data) => {
            if (err) throw err
            console.log("Employee updated")

        })

    })
}
