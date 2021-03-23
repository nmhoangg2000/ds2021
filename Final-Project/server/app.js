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
const User = require('./user');
io.on('connection', socket => {
    socket.on('join',username => {
        OnlineUser.push(new User(username,socket.id))
        console.log(OnlineUser);
        setTimeout(() => socket.broadcast.emit("join_server",username),0);
    });
    socket.on('disconnect', () => {
        let index = OnlineUser.findIndex(user => user.id == socket.id);
        if(index != -1){
            socket.broadcast.emit("leave_server",OnlineUser[index].username);
            OnlineUser.splice(index,1);
        }
    });
})