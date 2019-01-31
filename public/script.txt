const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.relaischateaux.com/fr/site-map/etablissements';

rp(url)
  .then(function(html){
	const urls = [];
	$('#countryF',html).find("h3:contains('France')").parent().find(".listDiamond > li").each(function(index){
		urls.push($(this).find("a").first()[0].attribs.href);
	});
	console.log(urls);
  })
  .catch(function(err){
    //handle error
  });
