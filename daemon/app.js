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

const adapter = new FileSync(config.db.file || 'db.json');
const db = low(adapter);
db.defaults({ status: {}, cryptocurrencies: [] }).write();

const port = config.server.port || 8000
io.listen(port)
console.log('Listening on port ', port)

const app = express()
app.listen(config.api.port || 3000)

/**
 * Router
 *
 */
require(__dirname + '/routes/data')(db, io, app, config);
require(__dirname + '/routes/socket')(db, io, app, config);
require(__dirname + '/routes/api')(db, io, app, config);
