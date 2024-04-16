const buscarIndex = (statement, caracter) => {
    for (let i = 0; i < statement.length; i++) {
        if (statement[i] == caracter) {
            return i;
        }
    }
}


module.exports={ buscarIndex }