module.exports = function(io) {
    //socket connection
    var loginuser = {
            userdetails: []
        },
        name = {};
    var socketqueue = [];
    io.on('connection', (socket) => {
        console.log('A user connected socket id ---', socket.id)

        socket.on('connecteduser', (data) => {
            name[data.username] = socket.id;
            console.log('names with socket id ---', JSON.stringify(name))
            loginuser.userdetails.push({
                username: data.username,
                socket: socket.id,
                email : data.useremail
            });
            console.log('login user us -----', JSON.stringify(loginuser));

            // broadcasting users details
            socket.emit('onlineuser', loginuser.userdetails);
            socket.broadcast.emit('onlineuser', loginuser.userdetails);
        });
        // sockets collections
        socketqueue.push(socket);
        console.log('socketqueue---', socketqueue);
    });
    //Whenever someone disconnects this piece of code executed
    io.on('disconnect', (data) => {
        setTimeout(function() {
            console.log("A user disconnected");
        }, 10000);
    });
};