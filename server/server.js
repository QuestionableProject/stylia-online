require('dotenv').config()
const express = require('express')
const app = express();

const sequelize = require("./db")
const WEBSITE = process.env.WEBSITEPORT
const cors = require('cors')
app.use(cors({origin: WEBSITE}));

const SERVER_PORT = process.env.SERVER_PORT
const models = require('./models/models')
const routers = require('./routers/index')
const ErrorMid= require("./middlware/middlware")
app.use(express.json())
app.use("/api", routers)



app.use(ErrorMid)
const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(SERVER_PORT, (error) => {
            error ? console.log(error) : console.log(`listen ${SERVER_PORT} port`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()


