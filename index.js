'use strict'

// requerimos las constantes de conexion del archivo .env
require('dotenv').config()

// requerimos la funcion makeExecutableSchema para ejecutar el schema
const { makeExecutableSchema } = require('graphql-tools')

// requermos la constante para ejucutar el servidor express
const express = require('express')

// requerimos la funcion gqlMiddleware para configurar el servidor express con graphql
const gqlMiddleware = require('express-graphql')

// requerimos las funciones para leer el schema
const { readFileSync } = require('fs')
const { join } = require('path')

// requerimos los resolvers que contienen todas las opciones de interaccion con la base de datos
const resolvers = require('./lib/resolvers')

// inicializamos el servidor express
const app = express()
const port = process.env.port || 3000

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

// configuramos el servidor
app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

// ejecutamos funcion listener para escuchar las peticiones al servidor
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})