const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


// middleware
app.use(bodyParser.json());
app.use(cors());

// Models
const Book = require("./models/book");

mongodbUrl = "mongodb+srv://toheedjamaal:PCqsnVmrcEah67js@cluster0.tlq4yeu.mongodb.net/?retryWrites=true&w=majority"
const hostname = '0.0.0.0'

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
  }
});

app.post("/book/new", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/book/delete/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    res.json({ result });
  } catch (err) {
    console.log(err);
  }
});


mongoose.connect(
  mongodbUrl,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to DB");
  }
);

app.listen(process.env.PORT || 6000, hostname, () => {
  console.log("Server is live");
});
