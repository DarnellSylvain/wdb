var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



var campgrounds = [
		{name: "Salmon Creek", image:"https://images.campsites.co.uk/campsite/21192/8eeb37ca-d95b-455f-940b-844d35ed6b86/266/190/either/east-crinnis-holiday-park.jpg"},
		{name: "Rocky Mountains", image:"https://images.campsites.co.uk/campsite/15273/a29ca793-0ee8-470a-9835-eef66056f35b/266/190/either/hendra-holiday-park.jpg"},
		{name: "Winters Retreat", image:"https://images.campsites.co.uk/campsite/16535/2865bcaa-da37-4143-8eda-0224f45fe450/266/190/either/tencreek-holiday-park.jpg"},{name: "Winters Retreat", image:"https://images.campsites.co.uk/campsite/16535/2865bcaa-da37-4143-8eda-0224f45fe450/266/190/either/tencreek-holiday-park.jpg"},{name: "Winters Retreat", image:"https://images.campsites.co.uk/campsite/16535/2865bcaa-da37-4143-8eda-0224f45fe450/266/190/either/tencreek-holiday-park.jpg"},{name: "Winters Retreat", image:"https://images.campsites.co.uk/campsite/16535/2865bcaa-da37-4143-8eda-0224f45fe450/266/190/either/tencreek-holiday-park.jpg"}
	];


app.get("/", function(req,res){
	res.render("landing");
});

app.get("/campgrounds", function(req,res){
	
	
	res.render("campgrounds", {campgrounds:campgrounds});
	
});


app.post("/campgrounds", function(req,res){
		 // get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	// redirect back to camgrounds
		res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new")
})






app.listen(3000, function(){
	console.log("YelpCamp server has started on port 3000");
});