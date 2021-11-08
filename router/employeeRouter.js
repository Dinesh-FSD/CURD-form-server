let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Employee Model
let employeeSchema = require('../models/employeeModel');

// CREATE Employee
router.route(`/create-employee`).post((req, res, next) => {
  employeeSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Employees
router.route(`/`).get((req, res, next) => {
  employeeSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Employee
router.route(`/edit-employee/:id`).get((req, res,next) => {
  employeeSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Employee
router.route(`/update-employee/:id`).put((req, res, next) => {
  employeeSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error)
      console.log(error);
    } else {
      res.json(data)
      console.log('Employee updated successfully !')
    }
  })
})

// Delete Employee
router.route(`/delete-employee/:id`).delete((req, res, next) => {
  employeeSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;