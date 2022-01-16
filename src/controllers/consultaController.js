const Consultas = require('../model/Consultas')
const Consulta = require('../model/Consultas')
const consultaUtils = require('../utils/consultaUtils')

module.exports = {
    consultas(req, res) {

        const Consultas = Consulta.get()

        const updatedCons = Consultas.map((consulta) => {

            

            let informe
            let restante = consultaUtils.diasRestantes(consulta)
            let status = restante <= 0 ? 'Realizado' : 'Agendado'

            //calculos de tempo restante
            //Dias
            if (restante <= 1) {
                if (restante <= 0)
                    restante = 0
                informe = 'Daqui a ' + restante.toString() + ' dia '
            } else {
                informe = 'Daqui a ' + restante.toString() + ' dias';
            }

            //horas
            if (restante < 1) {
                restante = consultaUtils.horasRestantes(consulta)
                status = restante <= 0 ? 'Realizado' : 'Agendado'

                if (restante <= 1) {
                    if (restante <= 0)
                        restante = 0
                    informe = 'Daqui a ' + restante.toString() + ' hora'
                } else {
                    informe = 'Daqui a ' + restante.toString() + ' horas';
                }
            }

            //minutos
            if (restante < 1) {
                restante = consultaUtils.minutosRestantes(consulta)
                status = restante <= 0 ? 'Realizado' : 'Agendado'

                if (restante <= 1) {
                    if (restante <= 0)
                        restante = 0
                    informe = 'Daqui a ' + restante.toString() + ' minuto'
                } else {
                    informe = 'Daqui a ' + restante.toString() + ' minutos';
                }
            }
            //fim dos calculos tempo restante

            return {
                ...consulta,
                informe,
                status
            }

        })

        

        return res.render("consultas", { consultas: updatedCons })
    },
    historico(req, res) {
        const Consultas = Consulta.get()

        const updatedHist = Consultas.map((consulta) => {
            let restante = consultaUtils.minutosRestantes(consulta)
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

        return res.render("historico", { consultas: updatedHist })
    },
    create(req, res) {
        const Consultas = Consulta.get()
        const consulta = req.body
        const lastId = Consultas[Consultas.length - 1]?.id_consulta || 0

        Consultas.push({
            id_consulta: lastId + 1,
            nome: consulta.nomeCliente,
            telefone: consulta.telCli,
            email: consulta.email,
            procedimento: consulta.nomeProc,
            horario: consulta.horario,
            valor: consulta.txtValor,
            createdAt: Date.now() //atribuindo data de criação da consulta
        })

        return res.redirect('/consultas')
    },
    show(req, res) {

        const Consultas = Consulta.get()

        const consultaId = req.params.id

        const consulta = Consultas.find(consulta => Number(consulta.id_consulta) === Number(consultaId))

        if (!consulta) {
            return res.send('Consulta não encontrada')
        }

        return res.render("consultas-edit", { consulta })
    },
    update(req, res) {

        const Consultas = Consulta.get()

        //pesquisa ID
        const consultaId = req.params.id
        const consulta = Consultas.find(consulta => Number(consulta.id_consulta) === Number(consultaId))

        if (!consulta) {
            return res.send('Consulta não encontrada')
        }

        const atualiza = {
            ...consulta,
            nome: req.body.nomeCliente,
            telefone: req.body.telCli,
            email: req.body.email,
            procedimento: req.body.nomeProc,
            horario: req.body.horario,
            valor: req.body.txtValor
        }


        const novaConsulta = Consultas.map(consulta => {

            if (Number(consulta.id_consulta) == Number(consultaId)) {
                consulta = atualiza
            }

            return consulta
        })

        Consulta.update(novaConsulta)

        res.redirect('/consultas/')

    },
    delete(req, res){
        const consultaId = req.params.id

        Consulta.delete(consultaId)

        return res.redirect('/consultas')
    }
}