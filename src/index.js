const express = require('express');
const mongo = require('mongoose');
const links = require("./data/links");
const app = express();

mongo.connect('mongo url', { useNewUrlParser: true, useUnifiedTopology: true });
mongo.connection.on('connected', () => {
    console.log('Успешное подключение к базе-данных!');
});

app.get('/', (req, res) => {
    res.send('Api started port 3000');
});

app.get("/:path", async (req, res) => {
    const path = req.params.path;
    const data = await links.findOne({ endpoint: path });
    if (data) {
        res.redirect(data.link);
    } else {
      res.send('Нету такого редиректа');
    };
});

app.listen(3000);
