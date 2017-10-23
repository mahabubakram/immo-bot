const configuration = {
  articles: {
    listItem: ".ad-listitem",
    data: {
      title  : "a",
      location: {
        selector: ".aditem-details"
      },
      price: {
        selector: ".aditem-details > strong"
      },
      size: {
        selector: ".simpletag"
        ,eq: 1
      },
      room: {
        selector: ".simpletag"
        ,eq: 0
      }

    }
  }
/*  pages: {
    listItem: ".aditem-main"
    , name: ".text-module-begin"
    , data: {
      title  : "a"
      , url  : {
        selector: "a"
        , attr  : "href"
      }
      , size: {
        selector: ".simpletag"
        ,eq: 1
      }
      , room: {
        selector: ".simpletag"
        ,eq: 0
      }
    }
  }*/
};

module.exports = {
  getConfiguration : function(){
    return configuration;
  }
}

