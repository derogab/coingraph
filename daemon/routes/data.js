module.exports = function(db, io, app, config) {
    
    const axios = require('axios');

    /** 
     * Cryptocurrencies 
     * 
    */
    const cryptocurrencies = config.cryptocurrencies;

    /** 
     * Real Time Data
     * 
    */
    function realtime(crypto) {
        axios.get(config.url + crypto, {
            params: {
                
            }
        })
        .then(function (response) {

            var data = response.data;          

            // save on db
            var handler = db.get('cryptocurrencies').find({'id': crypto});

            handler.assign({id: data.id}).write();
            handler.assign({name: data.name}).write();
            handler.assign({symbol: data.symbol}).write();
            handler.value().data.push({
                "price_usd": parseFloat(data.market_data.current_price.usd),
                "percent_change_1h": parseFloat(data.market_data.price_change_percentage_1h_in_currency.usd),
                "percent_change_24h": parseFloat(data.market_data.price_change_percentage_24h),
                "percent_change_7d": parseFloat(data.market_data.price_change_percentage_7d),
                "last_updated": new Date(data.market_data.last_updated).getTime()
            });
            db.write();

            // real time graph
            var realtime_data = {
                'id': data.id,
                'name': data.name,
                'symbol': data.symbol,
                'price_usd': parseFloat(data.market_data.current_price.usd),
                'percent_change_1h': parseFloat(data.market_data.price_change_percentage_1h_in_currency.usd),
                'percent_change_24h': parseFloat(data.market_data.price_change_percentage_24h),
                'percent_change_7d': parseFloat(data.market_data.price_change_percentage_7d),
                'last_updated': parseInt(data.market_data.last_updated),
                'graph': { // new data
                    'name': '', 
                    'price': parseFloat(data.market_data.current_price.usd), 
                    'time': new Date(data.market_data.last_updated).getTime()
                }
            };
            io.emit('realtime-data', realtime_data);

        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
            setTimeout(function(){ 
                realtime(crypto);    
            }, config.timeout * 1000 || 60000);
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
          
        realtime(cryptocurrency);
    });

};