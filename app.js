const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/player1', function( req, res ){ 
    res.sendFile( __dirname + '/public/player1.html' );
});

app.get( '/player2', function( req, res ){ 
    res.sendFile( __dirname + '/public/player2.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("red", (data) => {
        console.log( "red event received" );
        io.sockets.emit("color_change", {r:255, g:0, b:0});
    });

    socket.on("blue", (data) => {
        console.log( "blue event received" );
        io.sockets.emit("color_change", {r:0, g:0, b:255});
    });

    socket.on("green", (data) => {
        console.log( "green event received" );
        io.sockets.emit("color_changeTwo", {r:0, g:0, b:0});
    });

    /*socket.on("yellow", (data) => {
        console.log( "yellow event received" );
        io.sockets.emit("color_changeThree", {r:0, g:0, b:0});
    });

    socket.on("pink", (data) => {
        console.log( "pink event received" );
        io.sockets.emit("color_changeFour", {r:0, g:0, b:0});
    });*/

    socket.on("winner", (data) => {
        console.log( "winner is here" );
        io.sockets.emit("winnerMessage", 'PLAYER TWO WON');
    });

    socket.on("winnerTwo", (data) => {
        console.log( "winner is here" );
        io.sockets.emit("winnerMessageTwo", 'PLAYER ONE WON');
    });


    //socket.emit('winnerMessage', 'player 1 Won');
    //infinite loop with a millisecond delay (but only want one loop running ...)
    //a way to update all clients simulatenously every frame i.e. updating position, rotation ...
    // if (setIntervalFunc == null) {
    //     console.log("setting interval func");
    //     setIntervalFunc = setInterval( () => {
    //         //if we want to do loops 
    //     }, 50);
    // }
});