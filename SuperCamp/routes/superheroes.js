const express = require("express")
const router = express.Router()
const Superhero = require("../models/superhero")
const { route } = require("./comments")
const superhero = require("../models/superhero")

// middleware
const isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login")
}

const checkSuperheroOwnership = (req, res, next) => {
    req.isAuthenticated() ? 
            Superhero.findById(req.params.id, ((err, foundSuperhero) => {
                err ? res.redirect("back") 
                : (foundSuperhero.author.id.equals(req.user._id) ? next() 
                    : res.redirect("back"))     
            })) 
        : res.redirect("back")
}
//==================================================================================

// Routes
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

// edit superhero route
router.get("/:id/edit", checkSuperheroOwnership, (req, res) => {
    // is user logged in
            Superhero.findById(req.params.id, ((err, foundSuperhero) => { 
                res.render("superheroes/edit", {superhero: foundSuperhero})
            }))
})

// update superhero route
router.put("/:id", checkSuperheroOwnership, (req, res) => {
    // find and update correct superhero
    const {name, image, description} = req.body
    Superhero.findByIdAndUpdate(req.params.id, {name, image, description}, (err, updatedSuperhero) => {
        err ? res.redirect("/superheroes") : res.redirect(`/superheroes/${req.params.id}`)
    })
    // redirect
})
router.delete("/:id", checkSuperheroOwnership, async(req, res) => {
    try {
        let foundSuperhero = await Superhero.findById(req.params.id);
        await foundSuperhero.deleteOne();
        res.redirect("/superheroes");
    } catch (error) {
        console.log(error.message);
        res.redirect("/superheroes");
    }
  });
// Destroy Route
// router.delete("/:id", (req, res) => {
//     Superhero.findByIdAndRemove(req.params.id, err => {
//         err ? res.redirect("/superheroes") : res.redirect("/superheroes")
//     })
// })

module.exports = router