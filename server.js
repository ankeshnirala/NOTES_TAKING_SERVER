const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const dbConfig = require('./config/database.config.js');
const noteRoute = require('./app/routes/note.routes.js')

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json())

// database connectivity
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

// Require Notes routes
app.use("/api/v1/", noteRoute)

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});