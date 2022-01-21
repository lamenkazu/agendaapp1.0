const Consulta = require('../model/Consultas')
const consultaUtils = require('../utils/consultaUtils')

module.exports = {
    async consultas(req, res) {

        const Consultas = await Consulta.get()

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
    async historico(req, res) {
        const Consultas = await Consulta.get()

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
    async show(req, res) {

        const Consultas = await Consulta.get()

        const consultaId = Number(req.params.id_consulta)

        const consulta = Consultas.find(consulta => Number(consulta.id_consulta) === consultaId)

        if (!consulta) {
            return res.send('Consulta não encontrada')
        }

        return res.render("consultas-edit", { consulta })
    },
    async update(req, res) {


        //pesquisa ID
        const consultaId = req.params.id_consulta

        const atualiza = {
            nome: req.body.nomeCliente,
            telefone: req.body.telCli,
            email: req.body.email,
            procedimento: req.body.nomeProc,
            horario: req.body.horario,
            valor: req.body.txtValor
        }


       /* const novaConsulta = Consultas.map(consulta => {

            if (Number(consulta.id_consulta) == Number(consultaId)) {
                consulta = atualiza
            }

            return consulta
        }) */

        await Consulta.update(atualiza, consultaId)

        res.redirect('/consultas/')

    },
    async delete(req, res){
        const consultaId = req.params.id_consulta

        await Consulta.delete(consultaId)

        return res.redirect('/consultas')
    }
}