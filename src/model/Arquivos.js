const Database = require('../database/config')

module.exports = {
    async get(){
        const db = await Database()

        const arquivos = await db.all(`SELECT * FROM listaArquivos`)

        await db.close()

        return arquivos
    },
    async create(novoArquivo){
        const db = await Database()

        await db.run(`INSERT INTO listaArquivos (
            id_arquivos,
            nome_arquivo,
            code,
            local,
            id_paciente
        ) VALUES(
            ${novoArquivo.id_arquivos},
            "${novoArquivo.nome_arquivo}",
            "${novoArquivo.code}",
            "${novoArquivo.local}",
            ${novoArquivo.id_paciente}
        );`)

        await db.close()

    }
}