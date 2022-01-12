const express = require('express')
const routes = express.Router()

const consultas = [
    {
        id_consulta: 1,
        nome: 'Erick Etiene',
        procedimento: 'Limpeza',
        horario: '2022-02-01T14:00',
        valor: 100,
        createdAt: Date.now()
    },
    {
        id_consulta: 2,
        nome: 'Taís Rocha',
        procedimento: 'Aparelho',
        horario: '2022-02-01T14:00',
        valor: 80,
        createdAt: Date.now()
    }
]

//request, response
routes.get('/', (req, res)=> res.sendFile(__dirname + "/views/index.html", {consultas}))
routes.get('/consultas', (req, res)=> res.sendFile(__dirname + "/views/consultas.html"))
routes.get('/historico', (req, res)=> res.sendFile(__dirname + "/views/historico.html"))
routes.post('/', (req, res)=>{

    const consulta = req.body
    const lastId = consultas[consultas.length - 1]?.id_consulta || 1
    consultas.push({
        id_consulta: lastId + 1,
        nome: consulta.nome,
        procedimento: consulta.procedimento,
        horario: consulta.horario,
        valor: consulta.valor,
        createdAt: Date.now() //atribuindo data de criação da consulta
    })
})

module.exports = routes;