const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePanation = require('mongoose-paginate-v2')

const employeeSchema = new Schema({
    name: {type: String},
    designation: {type: String},
    email: {type: String},
    phone: {type: String},
    age: {type: String},
    avatar: {type: String}
}, {timestamps: true})


employeeSchema.plugin(mongoosePanation)
const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee