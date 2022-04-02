const { response } = require('express')
const Employee = require('../models/Employee')

const showAllEmployee = (req, res, next) => {
    if(req.query.page && req.query.limit) {
        Employee.paginate({}, {page: req.query.page, limit: req.query.limit})
        .then(response => res.json({response}))
        .catch(err => res.json({message: err.message}))
    } else {
        Employee.find()
        .then(response => {
            res.json({ response })
        })
        .catch(err => res.json({ message: err.message }))
    }
    
}

const showEmployee = (req, res, next) => {
    const employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({ response })
        })
        .catch(err => {
            message: err.message
        })
}

const store = (req, res, next) => {
    let employee = new Employee({
        name : req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.email
    })


    if(req.files) {
        let path = ''
        req.files.forEach(function(file, index, arr) {
            path = path + file.path + ','
        });
        path = path.substring(0, path.lastIndexOf(','))
        employee.avatar = path
    } else {
        console.log('err')
    }

    
    employee.save()
        .then(response => {
            res.json({ message: "Employee Added Successfully" })
        })
        .catch(err => res.json({ message: err.message }))
}


const update = (req, res, next) => {
    const employeeID = req.body.employeeID

    Employee.findByIdAndUpdate(employeeID, req.body)
        .then(() => {
            res.json({ message: 'Employee updated successfully' })
        })
        .catch(err => {
            res.json({ message: err.message })
        })
}

const destroy = (req, res, next) => {
    const employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
        .then(() => { res.json({ message: 'Employee deleted successfuly' }) })
        .catch(err => { res.json({ message: err.message }) })
}

module.exports = {showAllEmployee, showEmployee, store, update, destroy}