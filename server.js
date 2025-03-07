// Here is where we import modules
// We begin by loading Express
const express = require('express');
const dotenv = require("dotenv"); // require package
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
const Planet = require('./models/planet.js');

const port = 3001 || 3003

//initialize the express application

const app = express();
//config code
dotenv.config();

//body parser middleware:this function reads the requiest body and decodes it into req.body so we can access from data!
app.use(express.urlencoded({ extended: false }));
// Mount it along with our other middleware, ABOVE the routes
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));//reads the "_method query param for information about DELETE and PUT requiests"
app.use(morgan("dev")); 
 // new code below this line, static asset middleware - used to sent static assests(CSS, Img, Dom manipulation, JS)
 //app.use(express.static("public"));
  // new code below this line


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
//     if(req.body.isReadyToObserve == "on"){
//         req.body.isReadyToObserve = true;
//     } else {
//         req.body.isReadyToObserve = false;
//     }
req.body.isReadyToObserve = !!req.body.isReadyToObserve;

    await Planet.create(req.body);
   res.redirect("/planets"); // URL path 
  });

//index route for planets - sends a page that lists add planets from the database
app.get('/planets', async(req, res) => {
    const allPlanets = await Planet.find({});
    console.log(allPlanets);
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
    })
})

//update route -use to capture edit form submissions from the client and SEND TO MONGODB
app.put("/planets/:planetId", async (req, res)=> {
    req.body.isReadyToObserve= !!req.body.isReadyToObserve;
    await Planet.findByIdAndUpdate(req.params.planetId, req.body);
    res.redirect(`/planets/${req.params.planetId}`);
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