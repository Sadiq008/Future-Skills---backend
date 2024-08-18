const express = require("express");
const cors = require("cors");
const path = require("path");
const Card = require("./models/user");

const app = express();

app.use(cors());

// View engine setup
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", { newCard: null });
});

app.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cards", error });
  }
});

app.post("/cards", async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const newCard = new Card({ id, title, description });
    await newCard.save();
    res.redirect("http://localhost:3000/");
  } catch (error) {
    return res.status(500).json({ message: "Error creating card", error });
  }
});

app.get("/cards/:title", async (req, res) => {
  try {
    const card = await Card.findOne({ title: req.params.title });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving card", error });
  }
});

app.use((req, res, next) => {
  res.status(404).send({ error: "Endpoint not found" });
  next();
});

// Port
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
