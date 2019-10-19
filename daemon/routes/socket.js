module.exports = function(db, config) {

    const io = require('socket.io')()
    const PORT = config.server.port || 8000

    io.on('connection', (client) => {
        console.log('CONNECTED!')
    });
    io.listen(PORT)
    console.log('Listening on port ', PORT)
    
};