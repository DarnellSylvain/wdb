const mongoose = require("mongoose")

var superheroSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("Superhero", superheroSchema)