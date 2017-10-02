import tornado.ioloop
import tornado.web
import MySQLdb
import calendar, time
import json


# Main handler, simply returns index.html
class MainHandler(tornado.web.RequestHandler):

	def get(self):
		self.render("index.html")

# Fetch, parse and return data from database
class DataHandler(tornado.web.RequestHandler):

	def get(self, coin, change):
		# Establish connection
		self.db = MySQLdb.connect('localhost', 'coingraphs', 'CGpassword', 'coingraphs')
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


def make_app():

	settings = {
		"debug": True # Probably remove this in production, allows live code reloading
	}

	# Build our routes
	return tornado.web.Application([
		(r"/", MainHandler),
		(r"/assets/(.*)", tornado.web.StaticFileHandler, {'path': 'assets/'}),
		(r"/getdata/(.*)/(.*)", DataHandler)
	], **settings)

def run_app():
	app = make_app()
	app.listen(8080) # Can run on port 80 but requires sudo on *nix
	print("Webserver listening on port 8080")

	tornado.ioloop.IOLoop.current().start()

run_app()