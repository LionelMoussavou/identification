const { connect } = require('mongoose')

function dbConnexion() {
    connect("mongodb://localhost:27017")
        .then(() => console.log("connexion à l base de donnée"))
        .catch(error => console.log(error))
}

module.exports = dbConnexion