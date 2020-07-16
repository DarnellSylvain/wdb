const express = require('express'),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();


// APP CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer())
app.use(express.static("public"));
app.use(methodOverride("_method"))

mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser:true})
mongoose.set('useFindAndModify', false);

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String, 
    image: String, 
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//     title: "Test Blog",
//     image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/04/10/901440-cryptocurrency.jpg",
//     body: "This is a blog post"
// })

// RESTFUL ROUTES
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err,blogs) => {
        err ? console.log("Error!") : res.render("index", {blogs, blogs})
    })
})

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new")
} )

// CREATE ROUTE
app.post("/blogs", (req,res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)

    Blog.create(req.body.blog, (err, blog) => {
        err ? res.render("new") : res.redirect("/blogs")
    })   
})

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        err ? res.redirect("/blogs") : res.render("show", {blog: foundBlog})
    })
})

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        err ? res.redirect("/blog") : res.render("edit", {blog: foundBlog})
    })
})

// UPDATE ROUTE
app.put("/blogs/:id", (req,res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        err ? res.redirect("/blogs") : res.redirect(`/blogs/${req.params.id}`)
    })
})

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndDelete(req.params.id, (err) => {
        err ? res.redirect("/blogs") : res.redirect("/blogs")
    })
})

app.listen(3000, () => console.log("BlogApp Server has started on port 3000"))