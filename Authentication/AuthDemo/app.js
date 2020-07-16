const user = require("./models/user");

const express                   = require("express"),
    mongoose                    = require("mongoose"),
    passport                    = require("passport"),
    bodyParser                  = require("body-parser"),
    User                        = require("./models/user"),
    localStrategy               = require("passport-local"),
    passportLocalMongoose       = require("passport-local-mongoose"),
    app                         = express();

// Setting up view engine (Removes need to put .ejs on files)
app.set("view engine", "ejs")

app.use(require("express-session")({
    secret: "BruzR Level",
    resave: false,
    saveUninitialized: false
}))

// Setting up passport
app.use(passport.initialize())
app.use(passport.session())

// BodyParser for accessing body of requests
app.use(bodyParser.urlencoded({extended: true}));

// Prevent Deprecation warnings on mongoose && Connecting to MongoDB
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser:true})

// Responsible for encoding and decoding 
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom Middleware for Secret Page
const isLoggedIn = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect("/login")
}


// ====================================
// ROUTES
// ====================================

app.get("/", (req,res) => {
    res.render("home")
})

app.get("/secret", isLoggedIn, (req,res)=>{
    res.render("secret")
})

// Show signup form
app.get("/register", (req, res) => {
    res.render("register")
})

// Handling user signup
app.post("/register", (req, res) => {
    const {username, password} = req.body
    User.register(new User({username}), password, (err, user) => {
        err ? (
            console.log(err),
            res.render("register")
        ) : (
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret")
            })
        )
    })
})

// Show Login Form
app.get("/login", (req, res) => {
    res.render("login")
})

// Handle user Login (middleware)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "login"
}) , (req, res) => {})

app.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})


app.listen(3000, console.log("Server has started on port 3000"))