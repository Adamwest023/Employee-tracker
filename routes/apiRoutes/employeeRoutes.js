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

//route to get employee based on department 
router.get('/employees/:')