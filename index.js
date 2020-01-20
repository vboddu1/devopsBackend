//Importing Express library
var express = require('express');

//Importing Mongoose library
var mongoose = require('mongoose');

//Importing student.js file residing in models
var Student = require('./student');
var bodyParser = require('body-parser');

//assigning to port 7000
var PORT = process.env.PORT || 7000;

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Connecting to the MongoDB database 'StudentDB' running on 27017
mongoose.connect('mongodb://demo:demo123@ds211259.mlab.com:11259/crud_demo', { useNewUrlParser: true });


//serving insert html page
app.get('/insertData',function(req,res){
  res.sendFile( __dirname + "/create.html" );
});

//serving delete html page
app.get('/deleteData',function(req,res){
  res.sendFile( __dirname + "/delete.html" );
});

//serving retrieve html page
app.get('/retrieveData',function(req,res){
  res.sendFile( __dirname + "/retrieve.html" );
});

//serving update html page
app.get('/updateData',function(req,res){
  res.sendFile( __dirname + "/update.html" );
});

//Retrieving the data from MongoDB 'StudentCollection'
app.get('/api/retrieve', function(req, res) {
    Student.getDetails(function(err, student) {
        if (student) {
           response = {
                "result": student
            }
            res.json(response);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
    });
});

//Retrieving the data based on ID from MongoDB Collection
app.get('/api/retrieveById', function(req, res) {
    var id = req.query.sEmail;
    console.log(id)
    Student.getStudentById(id, function(err, student) {
      console.log(student)
        if (student) {
         response = {
                "result": student
            }
            res.json(response);
        } else {
          error = {
                "error": "Please check entered ID"
            }
            res.json(error);
        }
    });
});

//Inserting the data into MongoDB Collection
app.post('/api/insert', function(req, res) {

    var student = ({
        _id: req.body.sEmail,
        sName: req.body.sName,
        sEmail: req.body.sEmail,
        sPhoneNumber: req.body.sPhoneNumber,
        sAddress: req.body.sAddress,
        sDepartment: req.body.sDepartment
    });
    //Calls function in student.js model
    Student.addStudent(student, function(err, student) {
        if (student) {
           response = {
                "result": "Data inserted succesfully"
            }
            res.json(response);
        } else {
           error = {
                "error": "Sorry insertion failed"
            }
            res.json(error);
        }
    });
});

//Updating the data in MongoDB collection
app.post('/api/update', function(req, res) {
    var id = req.body.sEmail;
    var student = ({
        sName: req.body.sName,
        sPhoneNumber: req.body.sPhoneNumber,
        sAddress: req.body.sAddress,
        sDepartment: req.body.sDepartment
    });
    //Calls the function from student.js model
    Student.updateStudent(id, student, {}, function(err, student) {
        if (student) {
          response = {
                "result": "Student Details have been updated!"
            }
            res.json(response);
        } else {
          error = {
                "error": "Sorry update failed"
            }
            res.json(error);
        }
    });
});


//Deleting the data from MongoDB collection
app.post('/api/delete', function(req, res) {
    var id = req.body.sEmail;
    Student.removeStudent(id, function(err, student) {
        if (student.result.n != 0) {
            response = {
                "result": "Student Record has been deleted!"
            }
            res.json(response);
        } else {
            error = {
                "error": "Please check entered ID"
            }
            res.json(error);
        }
    });
});

app.listen(PORT);
console.log('Server is running on port ' + PORT);
