const mongoose = require('mongoose');

const username = 'username'
const password = 'password'

const uri = `mongodb://${username}:${password}@127.0.0.1:27017/edelivery_sensors`

const collectionName = mongoose.model("all_sensors", {  sensor_name: String, sensor_type:String, noise: Array, timestamp:Date});

//sensor: headjson.sensors[0].sensor, noise: headjson.sensors[0].observations
mongoose.connect(uri).then(() => {
    console.log("Base de Datos Conect")
}).catch(e => console.log(e))




async function count() {
    try {

        const salidaDB = await collectionName.distinct("sensor_name")

        return salidaDB
    } catch (err) {
        return err
    }
}



async function consult(sensor_type) {
    try {

        const salidaDB = await collectionName.find({sensor_name:sensor_type}).sort({timestamp:-1}).limit(1)

        return salidaDB
    } catch (err) {
        return err
    }
}

const buscarIndex = (statement, caracter) => {
    for (let i = 0; i < statement.length; i++) {
        if (statement[i] == caracter) {
            return i;
        }
    }
}



async function consult_history(name, from ,to) {

    try {

    console.clear()
    console.log({
            name:name,
            desde:from, 
            hasta:to
        })

        const salidaDB = await collectionName.find({sensor_name:name, timestamp: { $gt: from, $lt: to}})

        return salidaDB
    } catch (err) {
        return err
    }
}



module.exports = { consult, consult_history, count }
