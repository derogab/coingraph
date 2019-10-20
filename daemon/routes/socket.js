module.exports = function(db, config) {

    const io = require('socket.io')()
    const port = config.server.port || 8000

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
                'pv': element.price_usd, 
                'amt': element.last_updated
            });
        });

        return formatted_data;
    }

    io.on('connection', (client) => {
        console.log('Connected!')

        db.get('cryptocurrencies').value().forEach(cryptocurrency => {

            var historical_data = db.get('cryptocurrencies').find(cryptocurrency).value().data;
            
            io.emit('historical-data', fix(cryptocurrency, historical_data));
        });

    });
    io.listen(port)
    console.log('Listening on port ', port)
    
};