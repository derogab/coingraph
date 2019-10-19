module.exports = function(db, config) {
    
    const axios = require('axios');

    /** 
     * Cryptocurrencies 
     * 
    */
    cryptocurrencies = config.cryptocurrencies;

    /** 
     * Historical Data
     * 
    */
    function init(crypto) {
        
        // ... something else ...

        realtime(crypto);

    }

    /** 
     * Real Time Data
     * 
    */
    function realtime(crypto) {
        axios.get('https://api.coinmarketcap.com/v1/ticker/' + crypto, {
            params: {
                
            }
        })
        .then(function (response) {

            var data = response.data[0];
            var handler = db.get('cryptocurrencies').find({'id': crypto});
            
            handler.assign({id: data.id}).write();
            handler.assign({name: data.name}).write();
            handler.assign({symbol: data.symbol}).write();
            handler.value().data.push({
                "price_usd": parseFloat(data.price_usd),
                "percent_change_1h": parseFloat(data.percent_change_1h),
                "percent_change_24h": parseFloat(data.percent_change_24h),
                "percent_change_7d": parseFloat(data.percent_change_7d),
                "last_updated": data.last_updated
            });
            db.write();

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            setTimeout(function(){ 
                realtime(crypto);    
            }, config.api.timeout * 1000 || 60000);
        });
    }

    /**
     * Init
     * 
    */
    cryptocurrencies.forEach(cryptocurrency => {
        
        if( db.get('cryptocurrencies').find({'id': cryptocurrency}).value() === undefined ) {

            db.get('cryptocurrencies').push({
                id: cryptocurrency,
                name: cryptocurrency,
                symbol: cryptocurrency,
                data: []
            }).write();

        }
          
        init(cryptocurrency);
    });


};