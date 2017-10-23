const immoweltConfiguration = {
  pages: {
    listItem: ".listitem"
    , data: {
      title  : "h2.ellipsis"
      , url  : {
        selector: "a"
        , attr  : "href"
      }
      , location : ".listlocation"
      , price: {
        selector: ".hardfact"
        ,eq: 0
      }
      , size: {
        selector: ".hardfact"
        ,eq: 1
      }
      , room: {
        selector: ".hardfact"
        ,eq: 2
      }
    }
  }
};

module.exports = {
  getConfiguration : function(){
    return immoweltConfiguration;
  }
}

