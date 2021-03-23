const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 3000;

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Server listen on port ${port}`);
})

const io = require('./socket').init(server);
io.on('connection', socket => {

})