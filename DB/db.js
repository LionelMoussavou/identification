const { connect } = require('mongoose')

function dbConnexion() {
    connect("mongodb://localhost:27017/authentication")
        .then(() => console.log("connexion à la base de donnée"))
        .catch(error => console.log(error))
}

module.exports = dbConnexion