const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
};

const item = mongoose.model('item', itemsSchema);

const task1 = new item({
  name: "Welcome to your to-do list"
});

const task2 = new item({
  name: "Hit the + icon to add items"
});

const task3 = new item({
  name: "<---- Check this box once the task is done"
});

const defaultTasks = [task1, task2, task3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const list = mongoose.model('list', listSchema);

app.get('/', function (req, res) {
  let dateString = date.getDate();
  item.find({}, function (err, foundItem) {
    if (foundItem.length === 0) {
      item.insertMany(defaultTasks, function (err) {
        if (err) { console.log(err); }
        // else { console.log("Successfully added the default tasks"); }
      });
      res.redirect('/');
    } else {
      if (err) { console.log(err); }
      else { res.render('list', { listTitle: dateString, newitem: foundItem }); }
    }
  })
})

app.post('/', function (req, res) {
  let dateString = date.getDate();
  var task = req.body.task;
  var listName = req.body.button;
  const newTask = new item({
    name: task
  });

  if (listName === dateString) {
    newTask.save();
    res.redirect('/');
  } else {
    list.findOne({ name: listName }, function (err, foundItem) {
      if (err) {
        console.log(err);
      } else {
        foundItem.items.push(newTask);
        foundItem.save();
        res.redirect('/' + listName);
      }
    })
  }

})

app.post('/delete', function (req, res) {
  let dateString = date.getDate();
  const id = req.body.checkbox;
  const listName = req.body.listName;
  if(listName === dateString) {
      item.findOneAndRemove({_id: id}, function(err) {
          if(!err) {
              res.redirect('/');
          } else {
              console.log(err);
          }
      });
  } else {
      list.findOneAndUpdate({name: listName}, {$pull: {items: {_id: id}}}, function(err,foundList) {
          if(!err) {
              res.redirect('/' + listName);
          } else {
              console.log(err);
          }
      });
  }

})

app.get('/:name', function (req, res) {
  const listTitle = _.capitalize(req.params.name);
  list.find({ name: listTitle }, function (err, otherwise) {
    if (err) {
      console.log(err);
    } else {
      if (otherwise.length === 0) {
        const List = new list({
          name: listTitle,
          items: defaultTasks
        });
        List.save();
        res.redirect('/' + listTitle);
      } else {
        res.render('list', { listTitle: listTitle, newitem: otherwise[0].items })
      }
    }
  })

});

app.get('/about', function (req, res) {
  res.render("about");
})

app.listen(port, function () {
  console.log(`your server is running on port ${port}`);
})