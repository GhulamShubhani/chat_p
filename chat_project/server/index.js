const express= require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const port =  3005 || 8000  || 6000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000" ,
        methods: ["GET" , "POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(`user id : ${socket.id}`);

    socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`user with  id : ${socket.id} join room ${data}`)
    })

    socket.on('send_message', (data)=>{
        socket.to(data.room).emit("recived_message", data);
        console.log(data)
    })

    socket.on("disconnected", ()=>{
        console.log(`user disconnected ${socket.id}`);
    })
})

server.listen(port,()=>{
    console.log(`SERVER RUNNING :${port}`);
})