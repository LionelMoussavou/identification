const express = require('express')
const db = require('./DB/db')
const Routes = require('./Routes/routes')
require('./middlewares/auth')
const app = express()

db()
app.use(express.json())
app.use(Routes)
app.listen(8080, () => console.log("listen on port 8080"));