const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sadiq08:yj8xwvAJE4eSgZCZ@cluster0.7ya1ans.mongodb.net/FutureSkills?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB Server"))
  .catch((err) => console.log("Cannot Connect to MongoDB Server", err));

const userSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  description: String,
});

module.exports = mongoose.model("HelpCenter", userSchema);
