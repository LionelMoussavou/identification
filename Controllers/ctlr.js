const express = require('express')

const User = require('../model/model')
const bcrypt = require('bcrypt')
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
    const { error } = userValidation(body)
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
    res.send('connexion')
}