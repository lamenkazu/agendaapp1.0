const express = require('express')
const routes = express.Router()

const clientes = []

//request, response
routes.get('/', (req, res)=> res.sendFile(__dirname + "/views/index.html"))
routes.post('/', (req, res)=>{
    clientes.push(req.body)
    return res.redirect('/')
})

module.exports = routes;