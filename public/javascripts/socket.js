$( document ).ready(function() {
    var socket = io.connect('http://localhost:8000', {reconnection: false,reconnectionDelay: 1000,reconnectionDelayMax: 5000,reconnectionAttempts: Infinity});
    var userinfo = $('#userinfo').text();
    console.log("userinfo----",userinfo);
    socket.emit("connecteduser",{email:userinfo});
    socket.on("onlineuser",(data) => {
    console.log('online ----',JSON.stringify(data));
    console.log('online user is ----',JSON.stringify(data.loginuserarray));
    });
});