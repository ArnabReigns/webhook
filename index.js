const express = require('express');
const app = express();
const ejs = require('ejs');
const dotenv = require('dotenv');
const { Webhook } = require('./gitmodel');
require('./gitmodel')

dotenv.config()
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {

    const data = await Webhook.find({})
    res.send(data);
});

app.post('/git/', (req, res) => {
    const event = req.get('X-GitHub-Event');
    const payload = req.body.playload;

    const newWebhook = new Webhook({ event, payload });

    newWebhook.save().then((r) => console.log(r)).catch(err => console.log(errs));
});


app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});
