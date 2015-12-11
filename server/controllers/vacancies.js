var express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio"),
    url = "https://softserve.ua/ua/vacancies/open-vacancies/?tax-direction=0&tax-country=117&tax-city=140";

router.get("/", function(req, res, next) {
    var vacancies = [];
    request(url, function(err, resp, body){
        if (err) {
            next(err); 
        } else {
            $ = cheerio.load(body);
            links = $("a.card-vacancy-link").slice(0,5);
            $(links).each(function(i, link){
                var name = $(link).find("h3").text(),
                    url = $(link).attr("href");

                vacancies.push({name: name, url: url})
            });

            return vacancies.length > 0 
                    ? res.json(vacancies) 
                    : res.status(204).json({success:false, message: "Can't parse vacancies"});
        }
        
        
    });
    
});

module.exports = router;