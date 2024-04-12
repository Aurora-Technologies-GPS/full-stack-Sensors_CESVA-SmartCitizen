const express = require('express')
const app = express()
const fs = require('fs');

const { consult } = require('./Database/conector.js') //insert consult

app.set('view engine', 'ejs')

const myCss = {    style: fs.readFileSync('./views/css/style.css', 'utf8') };

let counter=0

setInterval(()=>{

 counter= counter+1

},1000)


app.get('/', (req, res) => {

    consult().then(data => {
        console.log(data)

        res.render("tables", {
            title: 'My Site',
            myCss: myCss,
            data: data
        })

    })
})

app.listen(3020, () => {
    console.log("server Started on Port 3020")
})