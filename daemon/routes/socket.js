module.exports = function(db, io, app, config) {

    function fix(cryptocurrency, data){

        formatted_data = {
            'id': cryptocurrency.id,
            'name': cryptocurrency.name,
            'symbol': cryptocurrency.symbol,
            'price_usd': data[data.length-1].price_usd,
            'percent_change_1h': data[data.length-1].percent_change_1h,
            'percent_change_24h': data[data.length-1].percent_change_24h,
            'percent_change_7d': data[data.length-1].percent_change_7d,
            'graph': []
        };

        data.forEach(element => {
            formatted_data.graph.push({
                'name': '', 
                'price': element.price_usd, 
                'time': element.last_updated
            });
        });

        return formatted_data;
    }

    io.on('connection', (client) => {
        console.log('Connected!')

        db.get('cryptocurrencies').value().forEach(cryptocurrency => {

            /** 
             * Historical Data
             * 
            */
            if(config.cryptocurrencies.includes(cryptocurrency.id)) {

                var historical_data = db.get('cryptocurrencies').find(cryptocurrency).value().data;

                io.emit('historical-data', fix(cryptocurrency, historical_data));

            }

        });

    });
    
};