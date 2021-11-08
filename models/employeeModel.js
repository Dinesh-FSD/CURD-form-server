const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  position :{
    type: String,
    required: true
  },
  office: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  date: {
    type: Object,
    required: true
  },
  salary:{
    type: Number,
    required: true
  }
}, {
    collection: 'Employee'
  })

module.exports = mongoose.model('Employee', employeeSchema);