const express = require('express')
const routes = express.Router()

const Consulta = {
    data: [
        {
            id_consulta: 1,
            nome: 'Erick Etiene',
            telefone: '31992855944',
            procedimento: 'Limpeza',
            horario: '2022-01-15T10:14',
            valor: 100,
            createdAt: Date.now()
        },
        {
            id_consulta: 2,
            nome: 'Taís Rocha',
            telefone: '31944562315',
            procedimento: 'Aparelho',
            horario: '2022-01-12T20:00',
            valor: 80,
            createdAt: Date.now()

        }
    ],
    controllers: {
        consultas(req, res) {
            const updatedCons = Consulta.data.map((consulta) => {
                let informe
                let restante = Consulta.services.diasRestantes(consulta)
                let status = restante <= 0 ? 'Realizado' : 'Agendado'

                if (restante <= 1) {
                    if (restante <= 0)
                        restante = 0
                    informe = 'Daqui a ' + restante.toString() + ' dia '
                } else {
                    informe = 'Daqui a ' + restante.toString() + ' dias';
                }

                if (restante < 1) {
                    restante = Consulta.services.minutosRestantes(consulta)
                    status = restante <= 0 ? 'Realizado' : 'Agendado'

                    if (restante <= 1) {
                        if (restante <= 0)
                            restante = 0
                        informe = 'Daqui a ' + restante.toString() + ' minuto'
                    } else {
                        informe = 'Daqui a ' + restante.toString() + ' minutos';
                    }
                }

                return {
                    ...consulta,
                    informe,
                    status
                }
            })

            return res.render(__dirname + "/views/consultas", { consultas: updatedCons })
        },
        historico(req, res) {

            const updatedHist = Consulta.data.map((consulta) => {
                let restante = Consulta.services.minutosRestantes(consulta)
                let status = restante <= 0 ? 'Realizado' : 'Agendado'

                dayName = new Array("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
                monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
                const time = new Date(consulta.horario)

                let data = ` ${dayName[time.getDay()]} - ${time.getDate()} de ${monName[time.getMonth()]} de ${time.getFullYear()}`

                return {
                    ...consulta,
                    status,
                    data
                }
            })

            return res.render(__dirname + "/views/historico", { consultas: updatedHist })
        },
        create(req, res){
            const consulta = req.body
            const lastId = Consulta.data[Consulta.data.length - 1]?.id_consulta || 1
        
            Consulta.data.push({
                id_consulta: lastId + 1,
                nome: consulta.nomeCliente,
                telefone: consulta.telCli,
                procedimento: consulta.nomeProc,
                horario: consulta.horario,
                valor: consulta.txtValor,
                createdAt: Date.now() //atribuindo data de criação da consulta
            })
        }
    },
    services: {
        diasRestantes(consulta){
            const dataFim = new Date(consulta.horario)
            const tempoRestanteMs = dataFim - Date.now() // tempo restante em mili segundos
            const diaInMs = 1000 * 60 * 60 * 24
        
            let restante = (tempoRestanteMs / diaInMs).toFixed()
        
        
            return restante
        },
        minutosRestantes(consulta){
            const dataFim = new Date(consulta.horario)
            const tempoRestanteMs = dataFim - Date.now()
            const horasInMs = 1000 * 60 * 60 
        
            let restante = ((tempoRestanteMs / horasInMs) * 60).toFixed();
        
            return restante
        },
    }
}

//request, response 

//Rotas das Paginas
routes.get('/', (req, res)=> res.render(__dirname + "/views/index"))


routes.get('/consultas', Consulta.controllers.consultas)


routes.get('/historico', Consulta.controllers.historico )

//Recebimento do Questionario
routes.post('/', Consulta.controllers.create)

module.exports = routes;