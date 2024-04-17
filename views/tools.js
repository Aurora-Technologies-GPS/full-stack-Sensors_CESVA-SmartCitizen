const buscarIndex = (statement, caracter) => {
    for (let i = 0; i < statement.length; i++) {
        if (statement[i] == caracter) {
            return i;
        }
    }
}

const from_converter = (fecha) => {

    let d_From= new Date(fecha.getTime() - 24 * 60 * 60 * 20).toISOString()
let d_From_time= new Date(d_From).toLocaleTimeString("en-US",{timeZone: 'America/Toronto', hour12: false})
d_From_time=d_From_time.substring(0,d_From_time.length-3)
d_From=d_From.substring(0,buscarIndex(d_From,"T"))
d_From=`${d_From}T${d_From_time}`

    return  d_From

}


const to_converter = (fecha) => {

let d_to= fecha.toISOString()
let d_to_time= new Date(d_to).toLocaleTimeString("en-US",{timeZone: 'America/Toronto', hour12: false})
d_to_time=d_to_time.substring(0,d_to_time.length-3)
d_to=d_to.substring(0,buscarIndex(d_to,"T"))
d_to=`${d_to}T${d_to_time}`

    return  d_to

}



module.exports={ buscarIndex , from_converter, to_converter } 