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

app.get('/deploy/', (req, res) => {

    Webhook.find({ event: 'deployment_status' }).sort({ 'payload.deployment.createdAt': -1 }).then((r) => res.json(r))

})

app.get('/del', (req, res) => {

    Webhook.deleteMany({}).then(r => res.send(r))
})

app.post('/git/', async (req, res) => {
    const event = req.get('X-GitHub-Event');
    const payload = JSON.parse(req.body.payload);

    console.log(payload)

    const newWebhook = new Webhook({ event, payload });
    newWebhook.save().then((r) => console.log(r)).catch(err => console.log(err));
});


app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});
