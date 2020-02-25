/**
 * coingraph-daemon
 * =====================
 * A daemon for coingraph
 *
 */
const fs = require('fs');
const YAML = require('yaml');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const io = require('socket.io')()
const express = require('express')

/**
 * Init
 * 
 */ 
const file = fs.readFileSync('./config.yml', 'utf8');
const config = YAML.parse(file);

const adapter = new FileSync('data/' + config.db.file || 'db.json');
const db = low(adapter);
db.defaults({ status: {}, cryptocurrencies: [] }).write();

const io_port = 8081
io.listen(io_port)
console.log('IO listening on port ', io_port)

const app = express()
const api_port = config.api.port || 8080
app.listen(api_port)
console.log('API listening on port ', api_port)

/**
 * Router
 *
 */
require(__dirname + '/routes/data')(db, io, app, config);
require(__dirname + '/routes/socket')(db, io, app, config);
require(__dirname + '/routes/api')(db, io, app, config);
