const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 5000;

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log(`Server listen on port ${port}`);
})

var OnlineUser = []

const io = require('./socket').init(server);
const User = require('./user');
io.on('connection', socket => {
    socket.on('setUsername',username => {
        OnlineUser.push(new User(username,socket.id))
        console.log(OnlineUser);
        setTimeout(() => socket.broadcast.emit("joinServer",username),0);
    });
    socket.on('disconnect', () => {
        let index = OnlineUser.findIndex(user => user.id == socket.id);
        if(index != -1){
            socket.broadcast.emit("leaveServer",OnlineUser[index].username);
            OnlineUser.splice(index,1);
        }
    });
})