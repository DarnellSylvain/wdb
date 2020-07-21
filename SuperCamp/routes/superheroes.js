const express = require("express")
const router = express.Router()
const Superhero = require("../models/superhero")

router.get("/", (req, res) => {
   // Get all superheroes from DB
    Superhero.find({}, (err, allSuperheroes) => {
        err ? console.log(err) : res.render("superheroes/index", {superheroes: allSuperheroes})
    })

})
// Create new superhero
router.post("/", (req, res) => {
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

router.get("/new", (req, res) => {
    res.render("superheroes/new")
})

// SHOW - Shows more info about one superhero
router.get("/:id", (req, res) => {
    // find suphero with the provided ID
    Superhero.findById(req.params.id).populate("comments").exec((err, foundSuperhero) => {
        err ? console.log(err) : 
        res.render("superheroes/show", {superhero: foundSuperhero})      
    })
})

module.exports = router