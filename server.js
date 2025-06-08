const express = require('express')
const app = express()
const mongoose =require('mongoose')
const Users =require('./models/userSchema.js')
const cors = require("cors")
const { faker } = require('@faker-js/faker')
const { error } = require('console')

const port = 3000;
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.post('/users', async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/users/fakedata', async (req, res) => {
    try{
        const fakeData = new Users({
            name: faker.person.fullName(),
            age: faker.number.int({ min:18, max:32}),
            selected: faker.datatype.boolean()
        });
        const saved = await fakeData.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({error: err.message })
    }
});

app.delete('/users/deleteall', async (req, res) => {
    try{
        const result = await Users.deleteMany({});
         if (result.deletedCount === 0) {
             return res.status(404).json({ message: 'No users to delete' });
            } res.status(200).json({ message: `Deleted ${result.deletedCount} users` });
        } catch (err) {
             res.status(500).json({ error: err.message });
        }
});


app.get('/users', async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});


app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send(); // Success, no content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
