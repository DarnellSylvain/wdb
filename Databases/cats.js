const mongoose = require("mongoose")
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser:true})

var catSchema = new mongoose.Schema({
    name: String,
    age: Number, 
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema)

// Add a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris", 
//     age: 7,
//     temperament: "Evil"
// })

// george.save((err, cat) => {
//     err ? console.log("Something went wrong") : console.log("We just saved a cat to the DB", cat)
// })

Cat.create({
    name: "Snow",
    age: 15,
    temperament: "Nice"
}, (err, cats) => err ? console.log("Theres an error") : console.log("New cat added", cats))



// Retrieve all cats from the DB and console.log each one

Cat.find({}, (err, cats) => 
    err ? console.log("There is an error", err) : console.log("All the Cats...", cats)
    )
