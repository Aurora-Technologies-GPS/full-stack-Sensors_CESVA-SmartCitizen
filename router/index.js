const express = require('express');

const fs = require('fs');
const { consult, consult_history, count } = require('../Database/conector.js');
const { from_converter, to_converter } = require('../src/tools.js')

const index = express.Router();

const myCss = {
    style: fs.readFileSync('./views/css/style.css', 'utf8')
};

index.get('/',(req, res)=>{

    res.render("login", {
        title: 'Login'
    })
    
})


index.post('/register',(req, res)=>{

	req.session.authorization=req.body;
	res.redirect("./data")

})

const preFetch=(req, res, next)=>{
    if(req.session.authorization){
        console.log('authorization PASS')
        next()
    }else{
        console.log('authorization DENIED')
        res.redirect("./")
    }
}

index.get('/data',preFetch, (req, res) => {

    let dataOUt = []

    let hoy=new Date;
    let d_From= from_converter(hoy);
    let d_to= to_converter(hoy);

    count().then(result_count => {
        if (result_count) {

            result_count.forEach(async (elem_count, index) => {
                await consult(elem_count).then(data => {
                    dataOUt.push(data[0])

                }).finally(() => {

                    if (result_count.length == index + 1) {
                        setTimeout(() => {
                            res.render("tables", {
                                title: 'My Site',
                                myCss: myCss,
                                data: dataOUt,
                                date: {
                                    from: d_From,
                                    to: d_to
                                }
                            })
                        }, 1500);
                    }

                })
            })
        }
    })

});

index.post('/search_Panel/:sensorName', (req, res) => {
    let {   from, to } = req.body

    let hoy=new Date;
    let d_From= from_converter(hoy);
    let d_to= to_converter(hoy);

    consult_history(req.params.sensorName, from, to).then(historyData => { 

        res.render("search_Panel", {
            title: 'Searcher',
            myCss: myCss,
            data: {
                sensorName: req.params.sensorName,
                historyData: historyData
            },
            date: {
            	from: d_From,
            	to: d_to
            }
        })

    })
});

module.exports = { index }