const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const port = 3000;

var corsOptions = {
    origin: "http://localhost:4200"
};

//Db connection 
var db = mongo.connect('mongodb+srv://admin:tlwkG4QLYJ3p7O3u@cluster0.defsh.mongodb.net/test').then(() => {
    console.log('Connected To DB');
    app.listen(port, function() {
        console.log(`
        Server listening on http://localhost:${port} 
        Click to open`);
    });
}).catch((err) => {
    console.error(err);
    process.exit();
})
//


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cors(corsOptions));
// app.use(function(req,res,next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Origin, Accept");
//     next();
// })

var Schema = mongo.Schema;

var userSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    id_no: {type: String},
    date_of_birth: {type: Date}
});

const userModel = mongo.model('users', userSchema, 'users');
app.get('/', function(req, res) {
    res.send(`
        <h1>Api endpoints</h1>
        <ul>
            <li>'api/users' - Get all users on DB</li>
        </ul>
    `)
})
app.get('/api/users', function(req, res) {
    console.log('Get all users endpoint reached!');
    userModel.find({}, function(err, users) {
        console.log(users);
        res.send(users)
        if(err) {
            console.log(err);
        }
    });
});

app.post('/api/users', function(req, res) {
    var user = new userModel(req.body);

    userModel.findOne({id_no: user.id_no}, function(err, data) {
        if(data) {
            res.send({
                error: true,
                message: "Id Number already exists"
            })
        } else {
            user.save(function(err, data) {
                if(err) {
                    res.send(err);
                } else {
                    res.send({
                        error: false,
                        message: 'Record saved'
                    })
                }
            })
        }
    });

});