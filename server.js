// paquetes necesarios
// npm install express mongoose body-parser

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://herrera:herrera@cluster0.9vtoyfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'MongoDB connection error:'));

connect.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/user.html');
});

app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.get('/users/search/:query', userController.getUserByQuery);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});