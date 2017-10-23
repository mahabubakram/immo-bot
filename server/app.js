const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const request = require("request");
const port = process.env.PORT || 8080;
const scrapeIt = require("scrape-it");

const immoRepo = require('./immobilienscout24/immobilienscout24Repo');
const immoConfig = require('./immobilienscout24/basicConfig');
const immowelt = require('./immowelt/immoweltRepo');
const ebay = require('./ebay-kleinanzeigen/ebay-kleinanzeigenRepo');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(path.resolve('./dist/client/')));
app.use('/node_modules/', express.static(path.resolve('./node_modules/')));
app.use('/api', router);
app.use('*', express.static(path.resolve('./dist/client/')));
app.get(['/'], (req, res) => res.sendFile(path.resolve('dist/client/', `index.html`)));



router.route('/immowelt')
  .get(function (req, res) {
    const url = "https://www.immowelt.de/liste/muenchen/wohnungen/mieten?sort=createdate%2Bdesc";
    immowelt.listOfItems(url).then((data) =>{
      res.status(200).send(data);
    });

  });

router.route('/ebay')
  .get(function (req, res) {
    const url = "https://www.ebay-kleinanzeigen.de/s-wohnung-mieten/seite:2/c203";
    ebay.listOfItems(url).then((data) =>{
      res.status(200).send(data);
    });

  });


router.route('/scrape')
  .get(function (req, res) {

    const url = "https://www.immobilienscout24.de/Suche/S-2/Wohnung-Miete";//"https://www.immobilienscout24.de/Suche/S-T/Wohnung-Miete/Fahrzeitsuche/M_fcnchen/-/112315/2027382/Bhf_20Heimeranplatz/-/60/2,00-?enteredFrom=one_step_search";

    immoRepo.listOfItems(url, immoConfig.getConfiguration()).then((data) => {
      res.status(200).send(data);
      //console.log(data);
    });

/*    // Promise interface
    scrapeIt("https://www.immobilienscout24.de/Suche/S-T/Wohnung-Miete/Fahrzeitsuche/M_fcnchen/-/112315/2027382/Bhf_20Heimeranplatz/-/60/2,00-?enteredFrom=one_step_search", {

      // Fetch the blog pages
       pages: {
        listItem: ".result-list-entry__data"
        , name: "exposes"
        , data: {
           title  : "a"
           , url  : {
             selector: "a"
             , attr  : "href",
             convert: x => {
               if((x !== undefined) && isNaN(x.split('/')[2]) === false) {
                 return x.split('/')[2];
               }
             }
           }
         , details : ".grid"
         , price_size: ".font-nowrap"
         , price: {
             selector: ".font-nowrap"
             ,eq: 0
           }
         , size: {
           selector: ".font-nowrap"
           ,eq: 1
         }
         , room: {
           selector: ".font-nowrap"
           ,eq: 2
         }
         }
      }
    }).then(page => {
      //console.log(page);
      res.status(200).send(page);
    });*/


  });

app.listen(port);

console.log('server is listening on : http://localhost:' + port);
