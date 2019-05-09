var mongoose = require('mongoose');

//Defining Schema
var studentSchema = mongoose.Schema({

    _id: {
        type: String,
        required: true
    },

    sName: {
        type: String,
        required: true
    },

    sEmail: {
        type: String,
        required: true
    },

    sPhoneNumber: {
        type: String,
        required: true
    },

    sAddress: {
        type: String,
        required: true
    },

    sDepartment: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

//Exporting the file
var Student = module.exports = mongoose.model('student_colls', studentSchema); //Binding schema to StudentCollection


//Module.exports to access the student.js file in anyfile using require
//Getting Student Details
module.exports.getDetails = function(callback, limit) {
    Student.find(callback).limit(limit);
}

//Getting student Details ById
module.exports.getStudentById = function(id, callback) {
    Student.findById(id, callback);
}

//Inserting student Details
module.exports.addStudent = function(student, callback) {
    Student.create(student, callback);
}

//Updating student Details
module.exports.updateStudent = function(id, student, options, callback) {
    var query = {
        _id: id
    };
    var update = {
        sName: student.sName,
        sPhoneNumber: student.sPhoneNumber,
        sAddress: student.sAddress,
        sDepartment: student.sDepartment
    }
    Student.findOneAndUpdate(query, update, options, callback);
}

//Deleting Student Details
module.exports.removeStudent = function(id, callback) {
    var query = {
        _id: id
    };
    Student.remove(query, callback);
}