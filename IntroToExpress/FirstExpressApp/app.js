var express = require('express');
var app = express()

app.get("/", (req,res) => {
    res.send("Hi There!")
})

app.get("/bye", (req,res) => {
    res.send("Goodbye")
})

app.get("/dogs/:type/:gender/", (req,res) => {
    console.log(req.params)
    res.send(`You have arrived at the dogs page for ${req.params.gender} ${req.params.type}`)
})

app.get("*", (req,res) => {
    res.send("You must be lost. This page doesn't exist")
})

app.listen(3000, function(){
    console.log("Server has started")
})
