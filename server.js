const PORT = 3200;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, './config.json');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: true
}));

function scanControllers() {

    const config = JSON.parse(fs.readFileSync(CONFIG_PATH));
    const controllers = config.controllers;
    const routes = Object.keys(controllers);

    for (const route of routes) {
        const controllerPath = controllers[route];
        const controller = require(controllerPath);
        
        app.all(route, controller.HandleRequest.bind(controller));
    }
}

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
    scanControllers();
});