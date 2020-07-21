const express = require("express")
const router = express.Router()
const Superhero = require("../models/superhero")

const isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login")
}

router.get("/", (req, res) => {
   // Get all superheroes from DB
    Superhero.find({}, (err, allSuperheroes) => {
        err ? console.log(err) : res.render("superheroes/index", {superheroes: allSuperheroes})
    })

})
// Create new superhero
router.post("/", isLoggedIn, (req, res) => {
    const {name, image, description} = req.body
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newSuperHero = {
        name: name,
        image: image,
        description: description,
        author: author
    }
    
    Superhero.create(newSuperHero, (err, newlyCreated) => {
        err ? console.log(err) : console.log(newlyCreated), res.redirect("/superheroes")
    })
    
})

router.get("/new", isLoggedIn, (req, res) => {
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