const express = require('express')
const app = express()
const fs = require('fs');

const {  consult, consult_history, count } = require('./Database/conector.js') //insert consult

app.set('view engine', 'ejs')

const myCss = {
    style: fs.readFileSync('./views/css/style.css', 'utf8')
};

app.get('/', (req, res) => {

	let dataOUt=[]

	    count().then(result_count=>{

	    	if (result_count) {



	    		result_count.forEach( async(elem_count, index)=>{

	    			await consult(elem_count).then(data => {

	    				dataOUt.push(data[0])


	    			}).finally(()=>{

	    			if(result_count.length == index+1){


	    					setTimeout(() => {
	    					res.render("tables", {
	    						title: 'My Site',
	    						myCss: myCss,
	    						data: dataOUt
	    					})

	    					}, 1500);


	    			}

	    			})

	    		})




	    	} 
    })




})

app.get('/search_Panel/:sensorName/:from/:to', (req, res) => {

	consult_history(req.params.sensorName, req.params.from , req.params.to).then(historyData => {

		res.render("search_Panel", {
			title: 'Searcher',
			myCss: myCss,
			data:{
				sensorName: req.params.sensorName,
				historyData:historyData
			}
		})
		

    })

})


app.listen(3021, () => {
    console.log("server Started on Port 3020")
})