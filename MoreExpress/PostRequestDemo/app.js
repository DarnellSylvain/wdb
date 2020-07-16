const express = require('express');
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

var friends = ["Darnell", "Calvin", "Victor", "Pierre", "Porsha"]

app.get("/", (req,res) => {
    res.render("home")
})

app.post("/addFriend", (req,res) => {
    var newFriend = req.body.newfriend
    friends.push(newFriend)
    res.redirect("/friends")
} ) 

app.get("/friends", (req, res) => {
    res.render("friends", {friends})
})

app.listen(3000, () => console.log("Server is running"))