/**
 * coingraph-daemon
 * =====================
 * A daemon for coingraph
 *
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const io = require('socket.io')()
const express = require('express')

/**
 * Environment variables
 * 
 */
require('dotenv').config();

/**
 * Args
 * 
 */
var argv = require('minimist')(process.argv.slice(2));

/**
 * Init
 * 
 */
const config = {
    url: 'https://api.coinmarketcap.com/v1/ticker/',
    timeout: argv.timeout || process.env.TIMEOUT || 180,
    db: argv.db || process.env.DATABASE || 'db.json',
    cryptocurrencies: (argv.crypto || process.env.CRYPTOCURRENCIES).split(',')
}

const adapter = new FileSync('data/' + config.db);
const db = low(adapter);
db.defaults({ status: {}, cryptocurrencies: [] }).write();

const io_port = argv['io-port'] || process.env.IO_PORT || 8081
io.listen(io_port)
console.log('IO listening on port ', io_port)

const app = express()
const api_port = argv['api-port'] || process.env.API_PORT || 8080
app.listen(api_port)
console.log('API listening on port ', api_port)

/**
 * Router
 *
 */
require(__dirname + '/routes/data')(db, io, app, config);
require(__dirname + '/routes/socket')(db, io, app, config);
require(__dirname + '/routes/api')(db, io, app, config);
