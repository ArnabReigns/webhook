const mongoose = require('mongoose');
mongoose.connect('mongodb://arnab:arnab@localhost:27017/webhook').then(() => console.log('connected'))
const db = mongoose.connection;

const webhookSchema = new mongoose.Schema({
    event: String,
    payload: Object
});

const Webhook = mongoose.model('Webhook', webhookSchema);

module.exports = db
module.exports = {
    Webhook
}