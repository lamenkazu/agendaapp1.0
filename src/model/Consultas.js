const Database = require('../database/config')

module.exports = {
    async get(){
        const db = await Database()

        const consultas = await db.all(`SELECT * FROM consultas
            JOIN pacientes
            ON pacientes.id_paciente = consultas.id_paciente
        `)

        await db.close()

        return consultas
    },
    async getParcial(pacienteId){
        const db = await Database()

        const consultas = await db.all(`SELECT * FROM consultas
            JOIN pacientes
            ON pacientes.id_paciente = consultas.id_paciente
            WHERE consultas.id_paciente = ${pacienteId}
        `)

        await db.close()

        return consultas
    },
    async update(atualiza, consultaId){
        const db = await Database()

        await db.run(`UPDATE consultas SET 
            procedimento = "${atualiza.procedimento}",
            horario = "${atualiza.horario}",
            valor = ${atualiza.valor}
            WHERE id_consulta = ${consultaId}
        `)

        await db.close()
    },
    async delete(consultaId){
        const db = await Database()

        db.run(`DELETE FROM consultas WHERE id_consulta = ${consultaId}`)

        await db.close()
        
    },
    async create(novaConsulta){
        const db = await Database()

        await db.run(`INSERT INTO consultas (
            id_consulta,
            procedimento,
            horario,
            valor,
            createdAt,
            id_paciente
        ) VALUES (
            ${novaConsulta.id_consulta},
            "${novaConsulta.procedimento}",
            "${novaConsulta.horario}",
            ${novaConsulta.valor},
            ${novaConsulta.createdAt},
            ${novaConsulta.id_paciente}
        );`)

        await db.close()
    },
}