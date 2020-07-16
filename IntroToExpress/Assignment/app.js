const express = require('express');
const app = express();

// Home Page
app.get("/", (req,res) => {
    res.send("Hi there, welcome to my assignment")
})

// Visiting /speak
app.get("/speak/:animal", (req,res) => {
    console.log(req.params)
    const animal = req.params.animal.toLowerCase();
    const sound = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        cat: "Meow"
    }

     res.send(`The ${animal} says '${sound[animal]}'`)
})

// Visiting /repeat/
app.get("/repeat/:str/:num", (req,res) => {
    const {str, num} = req.params
    let newStr = []
    const repeatStr = (str, num) => {
        for(var i = 0; i<num; i++){
            newStr.push(str)
        }
        return newStr.join(" ")
    } 
    res.send(repeatStr(str, num))
})

app.get("*", (req,res) => {
    res.send("Sorry, page not found... What are you doing with your life")
})


app.listen(3000, () => console.log("Server started on port 3000"))