const express = require("express")
var app = express()
app.get("/",function(request,response){
response.send("Hello World!")
})
app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});

var ParseHub = require('parsehub');
var api = new ParseHub(yourApiKey);

api.getAllJobs(function(err, jobs)
{
	console.log(jobs);
});

api.getAllJobs({ include_last_run: true }, function(err, jobs)
{
	console.log(jobs);
});