const express = require('express');
const router = express.Router();

// creates connections with the db and util folder
const db = require('../../db/connection.js');

//route that get to all employee
exports.getEmployees = () => {
    const sql = `SELECT * From employee`

    db.query(sql, (err,data) => {
        if(err) {
            res.status(500).json({error: err.message})
        }
        console.table(data);
    })
};

//route to get all departments
exports.getDepartment = () => {
    const sql = `Select * From department`

    db.query(sql, (err,data) => {
        if(err) {
            res.status(500).json({error: err.message})
        }
        console.table(data);
    })
};

//route to get all roles
exports.getRoles = () => {
    const sql = `SELECT * FROM role`

    db.query(sql, (err,data) => {
        if(err){
            res.status(500).json({error: err.message})
        }
        console.table(data);
    })
};