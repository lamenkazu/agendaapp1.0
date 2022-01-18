const Database = require('../database/config')

module.exports = {
    async get(){
        const db = await Database()

        const pacientes = await db.all(`SELECT * FROM pacientes`)

        await db.close()

        return pacientes
    },
    async create(novoPaciente){
        const db = await Database()

        await db.run(`INSERT INTO pacientes (
            id_paciente,
            nome,
            telefone,
            email
        ) VALUES (
            ${novoPaciente.id_paciente},
            "${novoPaciente.nome}",
            ${novoPaciente.telefone},
            "${novoPaciente.email}"
        );`)

        await db.close()
    },
    async delete(pacienteId){
        const db = await Database()

        await db.run(`DELETE FROM pacientes WHERE id_paciente = ${pacienteId}`)

        await db.run(`DELETE FROM consultas WHERE id_paciente = ${pacienteId}`)

        await db.close()
    },
    async update(atualiza, pacienteId){
        const db = await Database()

        await db.run(`UPDATE pacientes SET
            nome = "${atualiza.nome}",
            telefone = ${atualiza.telefone} ,
            email = "${atualiza.email}"
            WHERE id_paciente = ${pacienteId}
        `)
    }
}