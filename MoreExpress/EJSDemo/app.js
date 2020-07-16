var express = require('express');
var app = express();

app.use(express.static("public"))
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render("home.ejs")
})

app.get("/fallinlovewith/:thing", (req,res)=>{
    console.log(req.params)
    const {thing} = req.params
    res.render('love.ejs', {thing})
})

app.get("/posts", (req,res)=> {
    var posts = [
        {title: "Post 1", author:"Susy"},
        {title: "My adorable pet bunny", author:"Charlie"},
        {title: "Can you believe this?", author:"Darnell"},
    ]

    res.render("posts.ejs", {posts})
})

app.listen(3000, ()=> console.log('Server has started'))