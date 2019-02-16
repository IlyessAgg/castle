const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var URLs = []; 
var name, cuisine, price;
//var restaurants = {name : "", cuisine : "", price : ""};
var restaurants = [];

function getURLs(){
	for(var i = 1; i < 36; i++){
		URLs[i-1] = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
			}
		//console.log(URLs);
	//console.log(URLs[0]);		
	}


function scraping(){
	for (var i=0; i<URLs.length; i++){
		request(URLs[i], (error, respons,html) => {
	
			const $ = cheerio.load(html);
		
				$('ul.poi-search-result li a').each(function() {
										
										const name = $(this).find('div.poi_card-display-title').text().replace(/\s\s+/g,'');
										const cuisine = $(this).find('div.poi_card-display-cuisines').text().replace(/\s\s+/g,'');
										const price = $(this).find('div.poi_card-display-price').text().replace(/\s\s+/g,'');
										var star = $(this).find('div.guide > span').attr('class');
										if(star.includes('1etoi')) star = '1';
										if(star.includes('2etoi')) star = '2';
										if(star.includes('3etoi')) star = '3';
										var obj = {name: name, cuisine: cuisine, price : price, star: star};  

										
										//console.log(name + ' | ' + cuisine + ' | ' + price + ' | ' + star + "\n");
										restaurants.push(obj);
										
								});
								
				//console.log(restaurants);
				//console.log(restaurants.length);
				
		fs.writeFile('restaurants.json', JSON.stringify(restaurants, null, 4), function(err){

				console.log('File successfully written! - Check your project directory for the output.json file');

				})
				
		});
	}
}


getURLs();
//console.log(restaurants);
scraping();
