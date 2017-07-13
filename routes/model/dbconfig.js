var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userinfo');
console.log('mongo DB connected');

var userschema = new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    online:Boolean
});

var user = mongoose.model('user',userschema); 

module.exports = {
    user : user
}

