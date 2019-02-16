var request = require("request");
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.relaischateaux.com/fr/site-map/etablissements';
const urls = [];

rp(url)
  .then(function(html){
	$('#countryF',html).find("h3:contains('France')").parent().find(".listDiamond > li").each(function(index){
		urls.push($(this).find("a").first()[0].attribs.href);
	});
	console.log(urls.length);
	
	
	var hotRest = []
	urls.forEach(function(elem){
		request(
		{ uri: elem },
		function(error, response, body) {
			var B = cheerio.load(body);
			if(B('li.active > a',html).data('id')=="isProperty" && B('.jsSecondNavMain > li:nth-child(2) > a',html).data('id')=="isRestaurant") hotRest.push(elem);
		}
	);
	console.log(hotRest.length);
	console.log(hotRest);
	
	
  })
  .catch(function(err){
    //handle error
  });
/*
var hotRest = []
urls.forEach(function(elem){
	rp(elem)
	  .then(function(html){
		  if($('li.active > a',html).data('id')=="isProperty" && $('.jsSecondNavMain > li:nth-child(2) > a',html).data('id')=="isRestaurant") hotRest.push(elem);
		//console.log($('li.active > a',html).data('id'));
		//console.log($('.jsSecondNavMain > li:nth-child(2) > a',html).data('id'));
	  })
	  .catch(function(err){
		//handle error
	  });
});
request(
    { uri: "https://www.relaischateaux.com/fr/france/bussiere-cote-d-or-la-bussiere-sur-ouche" },
    function(error, response, body) {
        var $ = cheerio.load(body);
		console.log(body);
    }
);



console.log(hotRest.length);
console.log(hotRest);
*/

