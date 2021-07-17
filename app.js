const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "No name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 9,
  review: "The best fruit."
});

const orange = new Fruit ({
  name: "Orange",
  rating: 4,
  review: "Too sour for me"
});

const banana = new Fruit ({
  name: "Banana",
  rating: 3,
  review: "Weird texture"
});

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name : "Pineapple",
  score: 9,
  review: "Great fruit"
});


const mango = new Fruit({
  name : "Mango",
  score: 6,
  review: "Decent fruit"
});


const amy = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});

amy.save();

const john = new Person({
  name: "John",
  age: 37
});


Person.updateOne({name: "John"}, {favoriteFruit: mango});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// })


Fruit.find(function(err, fruits){
  if(err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
