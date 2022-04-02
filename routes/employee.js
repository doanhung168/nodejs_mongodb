const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authencation')

router.get('/', authenticate, EmployeeController.showAllEmployee)
router.post('/show', EmployeeController.showEmployee)
router.post('/store', upload.array('avatar[]'), EmployeeController.store)
router.post('/update', EmployeeController.update)
router.post('/delete', EmployeeController.destroy)

module.exports = router
