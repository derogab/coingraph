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

/**
 * Init
 * 
 */ 
const file = fs.readFileSync('./config.yml', 'utf8');
const config = YAML.parse(file);

const adapter = new FileSync(config.db.file || 'db.json');
const db = low(adapter);
db.defaults({ status: {}, cryptocurrencies: [] }).write();

/**
 * Router
 *
 */
require(__dirname + '/routes/data')(db, config);
require(__dirname + '/routes/socket')(db, config);
