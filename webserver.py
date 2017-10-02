import tornado.ioloop
import tornado.web
import MySQLdb
import calendar, time
import json

class MainHandler(tornado.web.RequestHandler):

	def get(self):
		self.render("index.html")

class ResourceHandler(tornado.web.RequestHandler):

	def get(self, source):
		resource = open(source).read()
		self.set_header("Content-Type", 'text/css; charset="utf-8"')
		self.write(resource)

class DataHandler(tornado.web.RequestHandler):

	def get(self, coin, change):
		self.db = MySQLdb.connect('localhost', 'coingraphs', 'CGpassword', 'coingraphs')
		c  = self.db.cursor()

		if coin != "eth" and coin != "btc": # Quick dirty workaround for sanitization
			self.write('{"message":"invalid_coin"}')
		c.execute("SELECT time, %s AS price FROM "+coin+" WHERE time > %s ORDER BY time ASC",
					   (change, calendar.timegm(time.gmtime()) - 36000))

		row_headers=[x[0] for x in c.description]
		data = c.fetchall()
		print(data)
		json_data = []
		for row in data:
			json_data.append(dict(zip(row_headers,row)))

		self.write(json.dumps(json_data))


def make_app():

	settings = {
		"debug": True
	}

	# Build our routes
	return tornado.web.Application([
		(r"/", MainHandler),
		(r"/assets/(.*)", ResourceHandler),
		(r"/getdata/(.*)/(.*)", DataHandler)
	], **settings)

def run_app():
	app = make_app()
	app.listen(8080)
	print("Webserver listening on port 8080")

	tornado.ioloop.IOLoop.current().start()

run_app()