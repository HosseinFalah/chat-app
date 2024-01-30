const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const PORT = 3000;

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: 'http://localhost:5173' } }).of('socket');

io.on("connection", (socket) => {
    console.log('new User Connected');

    socket.on('newMessage', message => {
        console.log(message);
        io.emit('newMessage', message);
    })

    socket.on('deleteMessage', id => {
        console.log(id);
        io.emit('deleteMessage', id);
    })

    socket.on('disconnect', () => {
        console.log('user disconnect');
    });
});

httpServer.listen(PORT, () => {
    console.log(`server is Run to PORT ${PORT}`);
});