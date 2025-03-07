// Here is where we import modules
// We begin by loading Express
const express = require('express');
const dotenv = require("dotenv"); // require package
const mongoose = require("mongoose"); // require package
const Planet = require('./models/planet.js');
const port = 3001 || 3003

//initialize the express application

const app = express();
//config code
dotenv.config();

//middleware
app.use(express.urlencoded({ extended: false }));

//home page

app.get('/', (req, res) =>{
    res.render('index.ejs')
});

//GET /planets/new
app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
})

// POST /planets
app.post("/planets", async (req, res) => {
    if(req.body.isReadyToObserve == "on"){
        req.body.isReadyToObserve = true;
    } else {
        req.body.isReadyToObserve = false;
    }
    await Planet.create(req.body);
   res.redirect("/planets/new"); // URL path 
  });

  // Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


app.listen(port, () => {
    console.log(`Listening port: ${port}`);
})