const Paciente = require('../model/Clientes')
const Consulta = require('../model/Consultas')
const consultaUtils = require('../utils/consultaUtils')
const Arquivo = require('../model/Arquivos')
const crypto = require('crypto')

module.exports = {
    async criarCliente(req, res) {
        const Pacientes = await Paciente.get()

        const lastId = Pacientes[Pacientes.length - 1]?.id_paciente || 0
        const paciente = req.body

        await Paciente.create({
            id_paciente: lastId + 1,
            nome: paciente.nome,
            telefone: paciente.tel,
            email: paciente.email
        })

        return res.redirect('/pacientes')
    },
    async pacientes(req, res) {
        const Pacientes = await Paciente.get()

        const updatedPac = Pacientes.map((paciente) => {
            return paciente
        })

        return res.render("pacientes", { pacientes: updatedPac })

    },
    async uploadArquivos(req, res) {
        const pacienteId = Number(req.params.id)

        if (req.files) {

            const Arquivos = await Arquivo.get()

            const file = req.files.file

            const lastId = Arquivos[Arquivos.length - 1]?.id_arquivos || 0


            const crip = crypto.randomBytes(8)
            const filename = `${crip.toString('hex')}${file.name}`


            await Arquivo.create({
                id_arquivos: lastId + 1,
                nome_arquivo: file.name,
                code: filename,
                local: 'public/uploads_agendaApp/',
                id_paciente: pacienteId
            })


            file.mv("public/uploads_agendaApp/" + filename, function (err) {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/pacientes/' + pacienteId)
                }
            })



        } else res.redirect('/pacientes/' + pacienteId)
    },
    async editPaciente(req, res) {
        const Pacientes = await Paciente.get()
        const PacientesFile = await Paciente.getfile()

        const pacienteId = Number(req.params.id_paciente)
        const paciente = Pacientes.find(paciente => Number(paciente.id_paciente) === pacienteId)

        const Arquivos = await Arquivo.get()

        let arquivos = []


        Arquivos.map(arquivo => {

            if (pacienteId === arquivo.id_paciente) {
                arquivos.push(arquivo)
            }

        })


        if (!paciente) {
            return res.send('Paciente n??o encontrado')
        }

        return res.render('pacientes-edit', { paciente, arquivos })


    },
    async updatePaciente(req, res) {

        const pacienteId = Number(req.params.id_paciente)

        const atualiza = {
            nome: req.body.nome,
            telefone: req.body.tel,
            email: req.body.email
        }

        await Paciente.update(atualiza, pacienteId)

        res.redirect('/pacientes/')

    },
    async deletePaciente(req, res) {
        const pacienteId = Number(req.params.id_paciente)

        await Paciente.delete(pacienteId)

        return res.redirect('/pacientes')

    },
    async consultasEspecificas(req, res) {

        const pacienteId = Number(req.params.id_paciente)


        const Consultas = await Consulta.getParcial(pacienteId)

        const consultas = Consultas.map(consulta => {

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

            dayName = new Array("Domingo", "Segunda", "Ter??a", "Quarta", "Quinta", "Sexta", "S??bado")
            monName = new Array("janeiro", "fevereiro", "mar??o", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
            const time = new Date(consulta.horario)

            let data = ` ${dayName[time.getDay()]} - ${time.getDate()} de ${monName[time.getMonth()]} de ${time.getFullYear()}`


            return {
                ...consulta,
                informe,
                status,
                data
            }
        })

        return res.render('consultas-especificas', { consultasEspecificas: consultas })
    },
    async marcarConsulta(req, res) {


        const Pacientes = await Paciente.get()

        const pacienteId = req.params.id_paciente

        const paciente = Pacientes.find(paciente => Number(paciente.id_paciente === Number(pacienteId)))

        if (!paciente) {
            return res.send('Paciente n??o encontrado')
        }

        return res.render("agendar-consulta", { paciente })
    },
    async criarConsulta(req, res) {

        const Consultas = await Consulta.get()
        const lastId = Consultas[Consultas.length - 1]?.id_consulta || 0

        const consulta = req.body


        await Consulta.create({
            id_consulta: lastId + 1,
            procedimento: consulta.nomeProc,
            horario: consulta.horario,
            valor: consulta.txtValor,
            createdAt: Date.now(),
            id_paciente: consulta.id_paciente
        })

        return res.redirect('/pacientes')
    }
}