const express = require('express');
const mongo = require('mongoose');
const links = require("./data/links");
const app = express();
mongo.connect('mongo url', { useNewUrlParser: true, useUnifiedTopology: true });
mongo.connection.on('connected', () => {
    console.log('[ DATABASE ] Успешное подключение к базе-данных!');
});

app.get('/', (req, res) => {
    res.send('api worked');
});

app.get("/:path", async (req, res) => {
    const path = req.params.path;
    let datebase = await links.findOne({ endpoint: path });
    if (datebase) {
        res.redirect(datebase.link);

    } else {
      res.send('Нету такого редиректа');
    };
});
app.listen(3000);