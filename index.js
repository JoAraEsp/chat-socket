const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto', app.get('port'))
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) =>{
    console.log('nueva conexion', socket.id);
    socket.on('usuario:ingresa', (data) => {
        io.sockets.emit('usuario:ingresa', data)
    })
    socket.on('chat:mensaje', (data) => {
        io.sockets.emit('chat:mensaje', data)
    })
    socket.on('chat:escribiendo', (data)=>{
        socket.broadcast.emit('chat:escribiendo', data);
    })
})
