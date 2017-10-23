const immobilien24Configuration = {
  pages: {
    listItem: ".result-list-entry__data"
    , name: "exposes"
    , data: {
      title  : "a"
      , exposeId  : {
        selector: "a"
        , attr  : "href",
        convert: x => {
          if((x !== undefined) && isNaN(x.split('/')[2]) === false) {
            return x;
          }
        }
      }
      , location: ".result-list-entry__address"
      , details : ".grid"
      , rent_size: ".font-nowrap"
      , rent: {
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
      , provider: {
        selector: 'a',
        convert: x => {
          return 'immobilienScout24'
        }
      }
    }
  }
};

module.exports = {
  getConfiguration : function(){
    return immobilien24Configuration;
  }
}

