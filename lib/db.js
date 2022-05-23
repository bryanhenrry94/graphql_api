'use strict'

const { MogoClient } = require('mongo')

// Importamos las constantes de la cadena de conexion de la configuracion de dotenv
const {
    DB_USER,
    DB_PASSWD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = procees.env

// creamos cadena de conexion de base de datos
const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

let connection

// creamos funcion asincona para conectarnos a la base de datos
async function connectBD() {
    if(connection) return connection

    let client 

    try{
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true
        })

        connection = client.db(DB_NAME)
    }catch(err){
        console.error('Could not connect to db', mongoUrl, err)
        process.exit(1) // si no se pudo conectar salimos del proceso
    }

    return connection
}

module.exports = connectBD