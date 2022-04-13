const express = require('express')
const User = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userValidation = require('../validation/validation')

/**
 * 
 * @param {express.Request} req 
 * @param {*express.Request} res 
 */

exports.inscription = (req, res) => {
    // ** recuperer les données
    const { body } = req
    // ** valider les données 
    const { error } = userValidation(body).userValidationSigup
    if (error) return res.status(401).json(error.details[0].message)


    // ** hash du mot de passe
    bcrypt.hash(body, password, 10)
        .then(hash => {
            if (!hash) return res.status(500).json({ msg: "Server Error " })

            delete body.password
            new User({ ...body, password: hash })
                .save()
                .then((user) => {
                    console.log(user)
                    res.status(201).json({ msg: "user created !" })
                })
                .catch((error) => res.status(500).json(error))

        })
        .catch((error) => res.status(500).json(error))

}

/**
 * 
 * @param {express.Request} req 
 * @param {*express.Request} res 
 */

exports.connexion = (req, res) => {
    const { email, password } = req.body
    // ** valitdation des données 
    const { error } = userValidation(req.body).userValidationLogin
    if (error) return res.status(401).json(error.details[0].message)

    // ** Trouver les utilisateurs dans la base de donnée. 

    user.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(404).json({ msg: "User not found" })
            console.log(user)

            // ** vérification du mot de passe 
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) return res.status(500).json({ msg: "serveur error" })
                    res.status(200).json({
                        email: user.email,
                        id: user._id,
                        token: jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "12h" })
                    })
                })
                .catch(error => res.status(500).json(error))


        })
        .catch(error => res.status(500).json(error))


}