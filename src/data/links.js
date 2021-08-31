const { Schema, model } = require('mongoose');
const schema = Schema({
    endpoint: String,
    link: String
 });
module.exports = model("links", schema);