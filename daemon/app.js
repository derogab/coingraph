/**
 * coingraph-daemon
 * =====================
 * A daemon for coingraph
 *
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/**
 * Init
 * 
 */ 
const adapter = new FileSync(process.env.DB || 'db.json');
const db = low(adapter);

db.defaults({ status: {}, cryptocurrencies: [] }).write();

/**
 * Router
 *
 */
require(__dirname + '/routes/data')(db);
require(__dirname + '/routes/socket')(db);
