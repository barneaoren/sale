"use strict";
const path = require('path');
const fs = require("fs");
const helmet = require('helmet');
const express = require('express');
const server = express();
function readItems() {
    const data = fs.readFileSync("./sale.json");
    const object = JSON.parse(data);
    return object;
}
server.use(helmet());
server.use(helmet.noSniff());
server.use(express.static(path.join(__dirname, './node_modules/bootstrap/dist')));
server.use(express.static(path.join(__dirname, './node_modules/jquery/dist')));
server.set('views', path.join(__dirname, './views'));
server.set('view engine', 'ejs');
server.use(express.static(path.join(__dirname, './public')));
server.use((req, res) => res.render("main", {items: readItems().items}));
server.set('port', process.env.PORT || 8080);
server.listen(server.get('port'), () => console.log('running on http://localhost:' + server.get('port')));
