const express = require('express');
const app = express();
const ejs = require('ejs');
const dotenv = require('dotenv')

dotenv.config()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('h asd');
});

app.post('/git/', (req, res) => {
    console.log(req.body)
});


app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});
