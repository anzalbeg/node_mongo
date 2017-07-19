module.exports = function(io) {
    //socket connection
    var loginuserobj = {'loginuser':[]};
    io.on('connection', (socket) => {
        socket.on('connecteduser', (data) => {
            loginuserobj.loginuser.push(data.email);
            console.log('loginuser-----', JSON.stringify(loginuserobj));
        })
        socket.emit('onlineuser', loginuserobj);
    });
    //Whenever someone disconnects this piece of code executed
    io.on('disconnect', (data) => {
        setTimeout(function() {
            console.log("A user disconnected");
        }, 10000);
    });
};