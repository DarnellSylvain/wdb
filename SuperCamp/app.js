const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Superhero = require("./models/superhero"),
    Comment = require("./models/comment")

    seedDB = require("./seeds");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/super_camp", {useNewUrlParser:true})
seedDB()

// SCHEMA SETUP (MOVED TO SEPERATE FILE)

app.get("/", (req, res) => {
    res.render("landing")
})
 

app.get("/superheroes", (req, res) => {
   // Get all superheroes from DB
    Superhero.find({}, (err, allSuperheroes) => {
        err ? console.log(err) : res.render("superheroes/index", {superheroes: allSuperheroes})
    })

})

app.post("/superheroes", (req, res) => {
    const {name, image, description} = req.body
    var newSuperHero = {
        name: name,
        image: image,
        description: description
    }
    Superhero.create(newSuperHero, (err, superhero) => {
        err ? console.log(err) : res.redirect("/superheroes")
    })
    
})

app.get("/superheroes/new", (req, res) => {
    res.render("superheroes/new")
})

// SHOW - Shows more info about one superhero
app.get("/superheroes/:id", (req, res) => {
    // find suphero with the provided ID
    Superhero.findById(req.params.id).populate("comments").exec((err, foundSuperhero) => {
        err ? console.log(err) : 
        res.render("superheroes/show", {superhero: foundSuperhero})      
    })
})

// ====================
// Comments Routes
// =================

// NEW superheroes/:id/comments/new GET
app.get("/superheroes/:id/comments/new", (req, res) => {
    Superhero.findById(req.params.id, (err, superhero) => {
        err ? console.log(err) : res.render("comments/new", {superhero: superhero})
    })
})


app.post("/superheroes/:id/comments", (req, res) => {
    //lookup superhero using ID
    Superhero.findById(req.params.id, (err, superhero) => {
        err ? (console.log(err), redirect("/campground")) : (
            Comment.create(req.body.comment, (err, comment) => {
                err ? console.log(err) : (
                    superhero.comments.push(comment),
                    superhero.save(),
                    res.redirect(  `/superheroes/${superhero.id}`)
                )
            })
        )
    })
    //create new comment
    // conect new comment to superhero
    // redirect superhero show page
})



app.listen(3000, () => console.log("Server has started on port 3000"))