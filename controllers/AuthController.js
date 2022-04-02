const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jsonwentoken = require('jsonwebtoken')
const { use } = require('express/lib/application')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({ error: err })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
        })


        user.save()
            .then(user => {
                res.json({ message: "user added successfully" })
            })
            .catch(err => res.json({ message: err.message }))
    })


}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return res.json({ error: err.message })
                    }
                    if (result) {
                        let token = jsonwentoken.sign({ name: user.name }, process.env.SECRET_VALUE, { expiresIn: '30s' })
                        let refreshToken = jsonwentoken.sign({ name: user.name }, process.env.REFRESH_SECRET_VALUE, { expiresIn: '48h' })
                        res.status(200).json({ message: 'Login successfully', token, refreshToken})

                    } else {
                        res.json({ message: 'Password does not matched!' })
                    }
                })
            } else {
                res.json({ message: 'no user found' })
            }
        })
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken
    jsonwentoken.verify(refreshToken, "refreshSecretValue", (err, decode) => {
        if(err) {
            return res.json({message: err.message})
        } else {
            let token = jsonwentoken.sign({name: decode.name}, "secretValue", {expiresIn: '60s'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({message: 'Token refreshed successfully', token, refreshToken})
        } 
        
    })
}

module.exports = { register, login, refreshToken }