
const express = require('express');
const dotenv = require("dotenv"); 
const mongoose = require("mongoose"); 
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
const Planet = require('./models/planet.js');
const axios = require("axios");
const session = require('express-session');
const authController = require("./controllers/auth");
const path = require('path');

const port = 3000 || 3003

const app = express();
//config code
dotenv.config();


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

 app.use(express.static("public"));
 app.use(morgan('dev'));
 app.use(session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
}));


app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));

app.use("/auth", authController);

//home page

app.get("/api/config", (req, res) => {
    res.json({ nasaApiKey: process.env.NASA_API_KEY });
}); 
app.get('/', (req, res) => {
   
    const user = req.user || null;
    res.render('index', { user }); 
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

  

app.get('/planets', async(req, res) => {
    const allPlanets = await Planet.find({});
    res.render('planets/index.ejs', {planets:allPlanets});

})

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

app.put("/planets/:planetId", async (req, res) => {
    try {
      const planetId = req.params.planetId;
      const updatedData = req.body;
  
      updatedData.isReadyToObserve = !!updatedData.isReadyToObserve;
  
      await Planet.findByIdAndUpdate(planetId, updatedData);
  
      res.redirect(`/planets/${planetId}`);
    } catch (error) {
      console.error("Error updating planet:", error);
      res.status(500).send("Internal Server Error");
    }
  });


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  mongoose.connection.on('error', (error) => {
    console.log(`An errorconnectiong to MongoDB has occured: ${error}`)
})


app.listen(port, () => {
    console.log(`Listening port: ${port}`);
})