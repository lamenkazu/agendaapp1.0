module.exports = {
    diasRestantes(consulta) {
        const dataFim = new Date(consulta.horario)
        const tempoRestanteMs = dataFim - Date.now() // tempo restante em mili segundos
        const diaInMs = 1000 * 60 * 60 * 24

        let restante = (tempoRestanteMs / diaInMs).toFixed()


        return restante
    },
    horasRestantes(consulta){
        const dataFim = new Date(consulta.horario)
        const tempoRestanteMs = dataFim - Date.now() // tempo restante em mili segundos
        const minutosInMs = 1000 * 60 * 60

        let restante = (((tempoRestanteMs / minutosInMs) * 60) / 60).toFixed();

        return restante
    },
    minutosRestantes(consulta) {
        const dataFim = new Date(consulta.horario)
        const tempoRestanteMs = dataFim - Date.now()
        const minutosInMs = 1000 * 60 * 60

        let restante = ((tempoRestanteMs / minutosInMs) * 60).toFixed();

        return restante
    },
}