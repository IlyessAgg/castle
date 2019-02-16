const request = require("request-promise");
const cheerio = require('cheerio');
const fs = require('fs');
const fetch = require('node-fetch');

// Function that gets us the 150 URLS of the establishments.
async function scraping(){
	var urls = [];
	await request('https://www.relaischateaux.com/fr/site-map/etablissements', (error, response,html) => {
		const $ = cheerio.load(html);
		$('#countryF',html).find("h3:contains('France')").parent().find(".listDiamond > li").each(function(index){
			urls.push($(this).find("a").first()[0].attribs.href);
		});
		/*
		console.log(urls[0]);
		console.log(urls[1]);
		*/
	});
	return urls;
}

// Test function on 1 URL. * Pay no attention *
async function checkHotRest(){
	var hotels = [];
	//await request('https://www.relaischateaux.com/us/france/flocons-haute-savoie-megeve', (error, response,html) => {
		
		(async () => {
			//const response = await fetch("https://www.relaischateaux.com/fr/popin/availability/check?month=2019-3&idEntity="+id+"%7C%7CSTD1DG&pax=2&room=1", {"credentials":"include","headers":{"accept":"application/json, text/javascript, /; q=0.01","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.relaischateaux.com/fr/france/castelclara-morbihan-bangor","referrerPolicy":"origin-when-cross-origin","body":null,"method":"GET","mode":"cors"});
			var jsonO = await (await fetch("https://www.relaischateaux.com/fr/popin/availability/check?month=2019-3&idEntity=22734%7C%7CSTD1DG&pax=2&room=1", {"credentials":"include","headers":{"accept":"application/json, text/javascript, /; q=0.01","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.relaischateaux.com/fr/france/castelclara-morbihan-bangor","referrerPolicy":"origin-when-cross-origin","body":null,"method":"GET","mode":"cors"})).json();
			if(jsonO['2019-3'].minimumStay['3'] == undefined) console.log('success');
		})();

	 // console.log(await response.json());
		/*
		var id = $('.ajaxPages').find('#tabProperty').attr('data-gtm-datalayer');
		var index = id.indexOf("synxis_id");
		var indexComma = id.indexOf(",", index + 11 );
		id = id.substring(index + 11, indexComma);
		
		console.log(id);
		//console.log(id.match('"synxis_id":(.*),'));
		
		var name = $('picture > img',html).attr('alt');
		var star = $('title',html).first().text();
		
		if(star.includes('1 étoile')) star = '1 étoile';
		if(star.includes('2 étoiles')) star = '2 étoiles';
		if(star.includes('3 étoiles')) star = '3 étoiles';
		
		var obj = {name: name, star: star};
		hotels.push(obj);
		console.log(hotels);
		
		fs.writeFile('hotels.json', JSON.stringify(hotels, null, 4), function(err){

				console.log('File successfully written! - Check your project directory for the output.json file');

				})
		*/
		
		
	//});
	
}

//checkHotRest();

// Function that returns JSON of starred hotel restaurant.
async function check(){
	var hotels = [];
	var urls = await scraping();
	//urls = urls.slice(0,20);
	for (const url of urls){
		await request(url, (error, response,html) => {
			
			const $ = cheerio.load(html);
			
			// If Hotel is a Hotel + Restaurant.
			if($('li.active > a',html).data('id')=='isProperty' && $('.jsSecondNavMain > li:nth-child(2) > a',html).data('id').includes('isRestaurant')) {
				
				var name = $('picture > img',html).attr('alt');
				var star = $('title',html).first().text();
				var star2 = $("meta[name='description']").attr("content");
				
				var id = $('.ajaxPages').find('#tabProperty').attr('data-gtm-datalayer');
				var index = id.indexOf("synxis_id");
				
				if(index != -1){
					var indexComma = id.indexOf(",", index + 11 );
					id = id.substring(index + 11, indexComma);
				}
				else{id = 'noSynId';}
				
				
				//If starred restaurant.
				if(star.includes('étoile')){
					if(star.includes('1 étoile')) star = '1 étoile';
					if(star.includes('2 étoiles')) star = '2 étoiles';
					if(star.includes('3 étoiles')) star = '3 étoiles';
					
					var obj = {name: name, star: star, id: id, url: url};
					hotels.push(obj);
					
					fs.writeFile('hotels.json', JSON.stringify(hotels, null, 4), function(err){
						console.log('File successfully written! - Check your project directory for the output.json file');
					})
				}
				
				else if(star.includes('star')){
					if(star.includes('1')) star = '1 étoile';
					if(star.includes('2')) star = '2 étoiles';
					if(star.includes('3')) star = '3 étoiles';
					
					var obj = {name: name, star: star, id: id, url: url};
					hotels.push(obj);
					
					fs.writeFile('hotels.json', JSON.stringify(hotels, null, 4), function(err){
						console.log('File successfully written! - Check your project directory for the output.json file');
					})
				}
				
				else if(star2.includes('étoile')){
					if(star2.includes('1')) star2 = '1 étoile';
					else if(star2.includes('2')) star2 = '2 étoiles';
					else if(star2.includes('3')) star2 = '3 étoiles';
					else if(star2.includes('une étoile')) star2 = '3 étoiles';
					else if(star2.includes('deux étoiles')) star2 = '3 étoiles';
					else if(star2.includes('trois étoiles')) star2 = '3 étoiles';
					
					var obj = {name: name, star: star2, id: id, url: url};
					hotels.push(obj);
					
					fs.writeFile('hotels.json', JSON.stringify(hotels, null, 4), function(err){
						console.log('File successfully written! - Check your project directory for the output.json file');
					})
				}
				
				else if(star2.includes('star')){
					if(star2.includes('1')) star2 = '1 étoile';
					if(star2.includes('2')) star2 = '2 étoiles';
					if(star2.includes('3')) star2 = '3 étoiles';
					
					var obj = {name: name, star: star2, id: id, url: url};
					hotels.push(obj);
					
					fs.writeFile('hotels.json', JSON.stringify(hotels, null, 4), function(err){
						console.log('File successfully written! - Check your project directory for the output.json file');
					})
				}
				
			}
		
		});
		
	}
	
}

//check();

// Function that returns hotels and their prices the next 8 Saturdays;
async function finalStep(){
	console.log("\n *STARTING* \n");
	var contents = fs.readFileSync("hotels.json");
	var jsonContent = JSON.parse(contents);
	var objs = [];
	for(const jsonCont of jsonContent){
		if(jsonCont.id != 'noSynId'){
			var price = await test(jsonCont.id);
			var obj = {name: jsonCont.name, star: jsonCont.star, url: jsonCont.url, prices: price}
			objs.push(obj);
			fs.writeFile('samedis.json', JSON.stringify(objs, null, 4), function(err){
				console.log('File successfully written! - Check your project directory for the output.json file');
			})
	
		}
	}
	console.log("\n *ENDED* \n");
}

//finalStep();

//Get prices of the next 8 Saturdays.
async function test(id){
	var samedis = [];
	var obj = {};
	var today = new Date();
	var fetchMonth = today.getFullYear() + '-' + (today.getMonth() + 1);
	
	for(var i = today.getDate(); i<today.getDate()+56; i++){
		var date = new Date(today.getFullYear(), today.getMonth(), i);
		if(date.getDay() == 6){
			//samedis.push(date.getDate() + '-' + (date.getMonth() + 1));
			samedis.push(date);
		}
	}
	
	for(const date of samedis){
		var fetchMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
		var body = await (await fetch("https://www.relaischateaux.com/fr/popin/availability/check?month="+ fetchMonth +"&idEntity="+ id +"%7C%7CSTD1DG&pax=2&room=1", {"credentials":"include","headers":{"accept":"application/json, text/javascript, /; q=0.01","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},"referrer":"https://www.relaischateaux.com/fr/france/castelclara-morbihan-bangor","referrerPolicy":"origin-when-cross-origin","body":null,"method":"GET","mode":"cors"})).json();
		if(body[fetchMonth].notAvailable.indexOf(date.getDate()) == -1 && body[fetchMonth].minimumStay[date.getDate()] == undefined){
			obj[date.getDate() + '/' + (date.getMonth()+1)] = body[fetchMonth].pricesPerDay[date.getDate()];
		}
		else obj[date.getDate() + '/' + (date.getMonth()+1)] = 'unavailable';
	}
	return obj;
}

//test();

async function bestPrice(){
	var contents = fs.readFileSync("samedis.json");
	var jsonContent = JSON.parse(contents);
	for(const jsonCont of jsonContent){
		console.log(jsonCont.name)
		console.log(jsonCont.prices['2/3'] + '\n');
	}
}

bestPrice();