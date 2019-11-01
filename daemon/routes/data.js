module.exports = function(db, io, config) {
    
    const axios = require('axios');

    function fix_graph(data){
        
        var formatted_data = [];

        data.forEach(element => {
            formatted_data.push({
                'name': '', 
                'price': element.price_usd, 
                'time': element.last_updated
            });
        });

        return formatted_data;
    }

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
        axios.get(config.api.url + crypto, {
            params: {
                
            }
        })
        .then(function (response) {

            var data = response.data[0];           

            // save on db
            var handler = db.get('cryptocurrencies').find({'id': crypto});

            handler.assign({id: data.id}).write();
            handler.assign({name: data.name}).write();
            handler.assign({symbol: data.symbol}).write();
            handler.value().data.push({
                "price_usd": parseFloat(data.price_usd),
                "percent_change_1h": parseFloat(data.percent_change_1h),
                "percent_change_24h": parseFloat(data.percent_change_24h),
                "percent_change_7d": parseFloat(data.percent_change_7d),
                "last_updated": parseInt(data.last_updated)
            });
            db.write();

            // real time graph
            var realtime_data = {
                'id': data.id,
                'name': data.name,
                'symbol': data.symbol,
                'price_usd': parseFloat(data.price_usd),
                'percent_change_1h': parseFloat(data.percent_change_1h),
                'percent_change_24h': parseFloat(data.percent_change_24h),
                'percent_change_7d': parseFloat(data.percent_change_7d),
                'last_updated': parseInt(data.last_updated),
                'graph': { // new data
                    'name': '', 
                    'price': parseFloat(data.price_usd), 
                    'time': parseInt(data.last_updated)
                }
            };
            io.emit('realtime-data', realtime_data);

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