const express = require('express');
const app = express();
const RediDB = require('redi.db.js');
require('dotenv').config()

const db = new RediDB({
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
    ip: process.env.IP,  
    port: process.env.DBPORT,
    websocket: true,
    useSSL: false, 
});

db.on('connected', () => {
    console.log('Successful connection to rediDB!');
});

db.on('disconnect', () => {
    console.log('Disconnected!');
});

db.on('error', err => {
    console.log(`Handled error: ${err}`);
});

const shortColection = db.create('ShortUrlDB', 'urlsCollection');

app.use(require('express-body'));

app.get("/:path", async (req,res) => {

    const path = req.params.path;

    const UrlData = await shortColection.searchOne({ path });

    if (!UrlData) return;

    return res.redirect(UrlData.redirect);
});

app.post("/create", async (req, res) => {

    const { path, redirect } = req.body;

    if (!path && !redirect) {
       return res.json({ message: 'You didn`t specify the parameters.', status: 400});
    };

    const UrlData = await shortColection.searchOrCreate({ path }, {path, redirect});

    if (UrlData.created === false) {
        return res.json({ message: 'Such an abbreviated link already exists.', status: 400});
    };

    return res.json(`The shortened link was successfully created /${path}`);
});

app.listen(process.env.PORT, function(err){
    if (err) {
        return console.log(`Failed to start the server: ${err}`) 
    } else return console.log(`The server is running on the port ${process.env.PORT}`);
});
