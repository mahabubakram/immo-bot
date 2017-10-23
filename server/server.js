const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const request = require("request");
const port = process.env.PORT || 8088;

require('./routes')(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(path.resolve('./dist/client/')));
app.use('/api', router);
app.use('*', express.static(path.resolve('./dist/client/')));
app.get(['/'], (req, res) => res.sendFile(path.resolve('dist/client/', `index.html`)));


app.listen(port);

console.log('server is listening on : http://localhost:' + port);
