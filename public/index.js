var request = require("request");
const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://restaurant.michelin.fr/magazine/les-restaurants-etoiles-du-guide-michelin-2018';

request(
    { uri: "https://restaurant.michelin.fr/magazine/les-restaurants-etoiles-du-guide-michelin-2018" },
    function(error, response, body) {
        var $ = cheerio.load(body);
		console.log(body);
    }
);