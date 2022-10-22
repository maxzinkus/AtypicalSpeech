const express = require('express');
const mysql = require('mysql2');
const db = require('./models');

class App {

    constructor () {
        console.log("app.js")
        this.app = express();
        this.dbConnection();
    }

    dbConnection() {
        db.sequelize.sync()
        // db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            console.log('DB sync complete.')
        })
        .catch(err => {
            console.log("Unable to connect to the database: ", err);
        });
    }

}

module.exports = new App().app;