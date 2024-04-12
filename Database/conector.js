const mongoose = require('mongoose');

const username = 'username'
const password = 'password'

const uri = `mongodb://${username}:${password}@127.0.0.1:27017/edelivery_sensors`

const collectionName = mongoose.model("all_sensors", {  sensor_name: String, sensor_type:String, noise: Array, timestamp:Date});

//sensor: headjson.sensors[0].sensor, noise: headjson.sensors[0].observations
mongoose.connect(uri).then(() => {
    console.log("Base de Datos Conect")
}).catch(e => console.log(e))


async function consult() {
    try {

        //const salidaDB = await collectionName.find() //.sort({timestamp:-1}).limit(1)
        const salidaDB = await collectionName.find().sort({timestamp:-1}) //.sort({timestamp:-1}).limit(1)


        //const salidaDB = await collectionName.find({sensor_type:"CESVA"}) //.sort({timestamp:-1}).limit(1)
        //const salidaDB = await collectionName.find({sensor_type:"CESVA"}).sort({timestamp:-1}).limit(1)
        //const salidaDB = await collectionName.find({sensor_type:"CESVA"}).sort({timestamp:-1}) //.limit(1)
        return salidaDB
    } catch (err) {
        return err
    }
}


module.exports = { consult }
