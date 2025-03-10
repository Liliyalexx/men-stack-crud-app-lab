// Here is where we import modules
// We begin by loading Express
const express = require('express');
const dotenv = require("dotenv"); // require package
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
const Planet = require('./models/planet.js');
const axios = require("axios");

const port = 3001 || 3003

//initialize the express application

const app = express();
//config code
dotenv.config();

//body parser middleware:this function reads the requiest body and decodes it into req.body so we can access from data!
// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));//reads the "_method query param for information about DELETE and PUT requiests"
// app.use(morgan("dev")); 
 // static asset middleware - used to sent static assests(CSS, Img, Dom manipulation, JS)
 app.use(express.static("public"));
 

//home page

app.get("/api/config", (req, res) => {
    res.json({ nasaApiKey: process.env.NASA_API_KEY });
}); 
app.get('/', (req, res) =>{
    res.render('index.ejs')
});

//GET /planets/new
app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
})

// POST /planets
app.post("/planets", async (req, res) => {
    console.log(req.body); 
    req.body.isReadyToObserve = !!req.body.isReadyToObserve; 
    await Planet.create(req.body);
    res.redirect("/planets");
  });

  

//index route for planets - sends a page that lists add planets from the database
app.get('/planets', async(req, res) => {
    const allPlanets = await Planet.find({});
    res.render('planets/index.ejs', {planets:allPlanets});

})

//show route - for sending a page with the details for one particular planet
app.get("/planets/:planetId", async (req, res) =>{
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/show.ejs", {planet: foundPlanet});
})

//DELETE

app.delete("/planets/:planetId", async (req, res) => {
    await Planet.findByIdAndDelete(req.params.planetId);
    res.redirect("/planets");
});


//EDIT

app.get('/planets/:planetId/edit', async(req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId);
    res.render("planets/edit.ejs", {
        planet:foundPlanet,
    });
});

//update route -use to capture edit form submissions from the client and SEND TO MONGODB
app.put("/planets/:planetId", async (req, res) => {
    try {
      const planetId = req.params.planetId;
      const updatedData = req.body;
  
      // Convert checkbox value to boolean
      updatedData.isReadyToObserve = !!updatedData.isReadyToObserve;
  
      // Update the planet in the database
      await Planet.findByIdAndUpdate(planetId, updatedData);
  
      // Redirect to the updated planet's show page
      res.redirect(`/planets/${planetId}`);
    } catch (error) {
      console.error("Error updating planet:", error);
      res.status(500).send("Internal Server Error");
    }
  });


  // Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  mongoose.connection.on('error', (error) => {
    console.log(`An errorconnectiong to MongoDB has occured: ${error}`)
})


app.listen(port, () => {
    console.log(`Listening port: ${port}`);
})