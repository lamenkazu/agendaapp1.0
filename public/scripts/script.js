class Consulta{
    constructor(nome, procedimento, horario, valor){
        this.nome = nome
        this.procedimento = procedimento
        this.horario = horario
        this.valor = valor
    }
}

let clientes = []

function agendaCliente(){
    let nome = document.getElementById('nomeCliente')
    let procedimento = document.getElementById('nomeProc')
    let horario = document.getElementById('horario')
    let valor = Number(document.getElementById('txtValor').value)

    let cliente = new Consulta(nome.value, procedimento.value, horario.value, valor)
    clientes.push(cliente)
    exibeClientes()

}

function exibeClientes(){
    let listaClientes = document.getElementById('clientes')
    for(let pos in clientes){
        listaClientes.innerHTML += `Nome: ${clientes[pos].nome}`
        listaClientes.innerHTML +=` Procedimento: ${clientes[pos].procedimento}`
        listaClientes.innerHTML += `, horario: ${clientes[pos].horario},`
        listaClientes.innerHTML += `valor: ${clientes[pos].valor}`
    }
}