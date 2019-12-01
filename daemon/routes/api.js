module.exports = function(db, io, app, config) {

    app.get('/:crypto/', function (req, res) {

        if(db.get('cryptocurrencies').find({'id': req.params.crypto}).value() === undefined)
            
            res.status(200).json({
                id: req.params.crypto,
                error: true,
                code: 404,
                text: 'not found'
            });
            
        else res.status(200).json(
            db.get('cryptocurrencies').find({'id': req.params.crypto}).value()
        );
        
    });
    
};