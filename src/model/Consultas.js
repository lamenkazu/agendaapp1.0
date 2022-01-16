

let data = [
    {
        id_consulta: 1,
        nome: 'Erick Etiene',
        telefone: '31992855944',
        email: '333.erick@gmail.com',
        procedimento: 'Limpeza',
        horario: '2022-01-17T19:14',
        valor: 100,
        createdAt: Date.now()
    },
    {
        id_consulta: 2,
        nome: 'Taís Rocha',
        telefone: '31944562315',
        email: 'chatata@gmail.com',
        procedimento: 'Aparelho',
        horario: '2022-01-17T13:50',
        valor: 80,
        createdAt: Date.now()

    },
    {
        id_consulta: 3,
        nome: 'Itamar Batista',
        telefone: '319456132',
        email: 'ItamarBT@gmail.com',
        procedimento: 'Canal',
        horario: '2022-01-14T15:50',
        valor: 900,
        createdAt: Date.now()

    },
]

module.exports = {
    get(){
        return data
    },
    update(novaConsulta){
        data = novaConsulta
    },
    delete(consultaId){
        data = data.filter(consulta => Number(consulta.id_consulta) !== Number(consultaId))
    }
}