const Database = require('./config')


const initDb = {
    async init() {

        const db = await Database()

        await db.exec(`CREATE TABLE pacientes (
            id_paciente INTEGER PRIMARY KEY,
            nome TEXT,
            telefone NUMBER,
            email TEXT
          )`)

        await db.exec(`CREATE TABLE consultas (
            id_consulta INTEGER PRIMARY KEY,
            procedimento TEXT,
            horario DATETIME,
            valor NUMBER,
            createdAt NUMBER,
            id_paciente INTEGER,
            FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
        )`)

        await db.exec(`CREATE TABLE listaArquivos (
            id_arquivos INTEGER PRIMARY KEY,
            nome_arquivo TEXT,
            code TEXT,
            local TEXT,
            id_paciente INTEGER,
            FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
        )`)

        await db.run(`INSERT INTO pacientes (
        
            id_paciente,
            nome,
            telefone,
            email
        ) VALUES (
            1,
            "Erick Etiene",
            31992855944,
            "333.erick@gmail.com"
        );`)

        await db.run(`INSERT INTO pacientes (
            id_paciente,
            nome,
            telefone,
            email
        ) VALUES (
            2,
            "Taís Rocha",
            31994632461,
            "chatata@gmail.com"
        );`)

        await db.run(`INSERT INTO consultas (
            id_consulta,
            procedimento,
            horario,
            valor,
            createdAt,
            id_paciente
        ) VALUES (
            1,
            "Limpeza",
            "2022-01-18T14:15",
            100,
            1642433560093,
            1
        );`)

        await db.run(`INSERT INTO consultas (
            id_consulta,
            procedimento,
            horario,
            valor,
            createdAt,
            id_paciente
        ) VALUES (
            3,
            "Obturação",
            "2022-01-18T14:15",
            100,
            1642433560093,
            1
        );`)

        await db.run(`INSERT INTO consultas (
            id_consulta,
            procedimento,
            horario,
            valor,
            createdAt,
            id_paciente
        ) VALUES (
            2,
            "Limpeza",
            "2022-01-18T14:15",
            100,
            1642433560093,
            2
        );`)


        await db.close()


    }
}

initDb.init()