const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');


// creates connections with the db and util folder
const db = require('../../db/connection.js');

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
exports.addDepartment = () => {
    //runs our prompt to ask for what department would like to be added
    inquirer.prompt([
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
    const parsedDept = Object.values(JSON.parse(JSON.stringify(departments[0])))

    const structuredArr = []
    parsedDept.forEach(index => {
        structuredArr.push({
            name: index.name,
            value: index.id
        })
    });

    inquirer.prompt([
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
        console.log(answer.salary)
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

//add an employee
exports.addEmployee = async () => {
    const role = await roleSearch();


}
