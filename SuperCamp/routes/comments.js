
const express = require("express");
const router = express.Router({mergeParams: true});
var Superhero = require("../models/superhero");
var Comment = require("../models/comment");

const isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login")
}

    const checkCommentOwnership = (req, res, next) => {
        req.isAuthenticated() ? 
                Comment.findById(req.params.comment_id, ((err, foundComment) => {
                    err ? res.redirect("back") 
                    : (foundComment.author.id.equals(req.user._id) ? next() 
                        : res.redirect("back"))     
                })) 
            : res.redirect("back");
    }

// Comment New
router.get("/new", isLoggedIn, (req, res) => {
    Superhero.findById(req.params.id, (err, superhero) => {
        err ? console.log(err) : res.render("comments/new", {superhero: superhero})
    })
})

// Comment Create
router.post("/", isLoggedIn, (req, res) => {
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
// comment edit route
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        err ? res.redirect("back") : res.render("comments/edit", {superhero_id: req.params.id, comment: foundComment})
    } )
    
})

// comment update
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        err ? redirect("back") : res.redirect(`/superheroes/${req.params.id}`)
    } )
})

// Comment destroy route
router.delete("/:comment_id", checkCommentOwnership, (req,res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        err ? res.redirect("back") : res.redirect(`/superheroes/${req.params.id}`)
    })
})


module.exports = router