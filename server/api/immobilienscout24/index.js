const express = require('express');
const router = express.Router();
const immobilienController = require('./immobilienscout24.controller');

router.get('/', (req, res) => {
  const scrapeUrl = 'https://www.immobilienscout24.de/Suche/S-2/Wohnung-Miete';
  immobilienController.getUniqueScrape(scrapeUrl).then((data) =>{
    res.status(200).send(data);
  });


});


module.exports = router;
