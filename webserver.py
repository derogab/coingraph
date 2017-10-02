from   tornado.options import define, options
import tornado.ioloop
import tornado.web
import MySQLdb
import calendar, time
import json
import os

# Main handler, simply returns index.html
class MainHandler(tornado.web.RequestHandler):

	def get(self):
		self.render("index.html")

# Return "assets" aka javascript and css files. 
# Uses Content-Type of CSS because CSS won't work
# without it and JavaScript doesn't seem affected
class ResourceHandler(tornado.web.RequestHandler):

	def get(self, source):
		resource = open(source).read()
		self.set_header("Content-Type", 'text/css; charset="utf-8"')
		self.write(resource)

# Fetch, parse and return data from database
class DataHandler(tornado.web.RequestHandler):

	def get(self, coin, change):

		sql_conf = {
			'host': options.sql_host,
			'port': options.sql_port,
			'user': options.sql_user,
			'passwd': options.sql_password,
			'db': options.sql_database
		}

		self.db = MySQLdb.connect(**sql_conf)
		c  = self.db.cursor()
		finish = True

		# "Hacky" sanitization of inputs
		if coin != "eth" and coin != "btc": # Quick dirty workaround for sanitization
			self.write('{"message":"invalid_coin"}')
			finish = False
		if change != "usd" and change != "eur":
			self.write('{"message":"invalid_change"}')
			finish = False

		if finish == True:
			# Sanitization is fine, do query
			q = "SELECT 'time', `%s` AS price FROM `%s` WHERE time > %%s ORDER BY time ASC" % (change, coin)
			c.execute(q % (calendar.timegm(time.gmtime()) - 36000))

			row_headers=[x[0] for x in c.description]
			data = c.fetchall()

			json_data = []
			for row in data: # Append rows to data array
				json_data.append(dict(zip(row_headers,row)))

			self.db.close()

			# Weird little prefix/suffix because of how main.js
			# already parses JSON from PHP
			self.write('{"'+coin+'":'+json.dumps(json_data)+"}") 

def init_config():
	define("config", default="conf.py", help="Path to config file",
       callback=lambda path: tornado.options.parse_config_file(path, final=False))
	define("sql_host", default="127.0.0.1", help="Hostname / IP of the SQL server")
	define("sql_port", default=3306, type=int, help="Port where the SQL server is listening to")
	define("sql_user", default="coingraphs", help="SQL server username")
	define("sql_password", default="CGpassword", help="SQL server password")
	define("sql_database", default="coingraphs", help="SQL database to use")

def make_app():

	settings = {
		"debug": True # Probably remove this in production, allows live code reloading
	}

	init_config()
	tornado.options.parse_command_line()
	tornado.options.parse_config_file(options.config)

	# Build our routes
	return tornado.web.Application([
		(r"/", MainHandler),
		(r"/assets/(.*)", ResourceHandler),
		(r"/getdata/(.*)/(.*)", DataHandler)
	], **settings)

def run_app():
	app = make_app()
	app.listen(8080) # Can run on port 80 but requires sudo on *nix
	print("Webserver listening on port 8080")

	tornado.ioloop.IOLoop.current().start()

run_app()