function login(){
    var email = $('#email').val();
    var password = $('#password').val();
    var siteUrl = window.location.origin +'/api/user';
    $.ajax({
            url: siteUrl+"/login",
            type: "POST",
            async: false,
            data:{email:email,password:password},
                success: function(msg) {
                if (msg !== null || typeof(msg) !== "undefined") {
                    console.log('msg----'+JSON.stringify(msg));
                    if(JSON.stringify(msg)=="user not found"){
                        
                    }
                    if(JSON.stringify(msg)=="Invalid Password"){

                    }
                    var msgJson = JSON.parse(JSON.stringify(msg));
                    console.log("-----",msgJson.user.email);
                    if(msgJson.user.email){
                        window.location.href = 'http://localhost:8000/views/dashboard.html'; //Here's my redirect - the router is listening for this route and will render accordingly
                    }
                  }
                },
                error: function (errorThrown) {
                    //console.log('error' + errorThrown);
                }          
            });
}