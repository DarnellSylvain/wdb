
const express = require("express");
const router = express.Router({mergeParams: true});
var Superhero = require("../models/superhero");
var Comment = require("../models/comment");

const isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login")
}

// Comment New
router.get("/superheroes/:id/comments/new", isLoggedIn, (req, res) => {
    Superhero.findById(req.params.id, (err, superhero) => {
        err ? console.log(err) : res.render("comments/new", {superhero: superhero})
    })
})

// Comment Create
router.post("/superheroes/:id/comments", isLoggedIn, (req, res) => {
    //lookup superhero using ID
    Superhero.findById(req.params.id, (err, superhero) => {
        err ? (console.log(err), redirect("/campground")) : (
            Comment.create(req.body.comment, (err, comment) => {
                err ? console.log(err) : (
                    // add username and id to comment
                    comment.author.id = req.user._id,
                    comment.author.username = req.user.username,
                    // save comment
                    comment.save(),
                    console.log(comment),
                    superhero.comments.push(comment),
                    superhero.save(),
                    res.redirect(  `/superheroes/${superhero.id}`)
                )
            })
        )
    })
})

module.exports = router