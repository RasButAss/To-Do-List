const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var tasks = [];
var workList = [];

app.get('/', function (req, res) {
    let dateString = date.getDate();
    res.render('list',{listTitle: dateString, newitem: tasks});
})

app.post('/', function(req, res) {
    var task = req.body.task;
    if(req.body.button === "Work List") {
        workList.push(task);
        res.redirect('/work');
    } else if (req.body.button === date.getDate()) {
        tasks.push(task);
        res.redirect('/')
    }
})

app.get('/work', function (req, res) { 
    res.render("list", {listTitle: "Work List", newitem: workList });
})

app.get('/about', function(req, res) {
    res.render("about");
})

app.listen(port, function() {
    console.log(`your server is running on port ${port}`);
})