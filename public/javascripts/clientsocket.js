$(document).ready(function() {

    var socket = io.connect('http://localhost:8000', {
        transports: ['websocket'],
        upgrade: false,
        reconnection: false,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: Infinity
    });
    var userinfo = $('#userinfo').text();
    var useremail = $('#useremail').text();

    console.log("userinfo----", userinfo);
    console.log("useremail----", useremail);

    //emit when user login
    socket.emit("connecteduser", {
        username: userinfo,
        useremail: useremail
    });

    //receive all login user info 
    socket.on("onlineuser", (data) => {
        console.log('online user is --', JSON.stringify(data));
        console.log('online user lenth---',data.length);
        $('#userlist').empty();
        for(var i=0 ; i < data.length ; i++){
            $('#userlist').append('<ul>'+data[i].username+'</ul>');
        }
    });

    //socket join room with peer

    socket.emit('')
});