const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://restaurant.michelin.fr/magazine/les-restaurants-etoiles-du-guide-michelin-2018';

rp(url)
  .then(function(html){
	const urls = [];
	$('.field--type-text-with-summary > .field__items > .field__item.even > p > br',html).parent().each(function(index){
		urls.push($(this).find("strong").first()[0].children[0].data);
	});
	console.log(urls.length);
	console.log(urls[2]);
  })
  .catch(function(err){
    //handle error
  });
