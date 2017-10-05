#!/usr/bin/python
# -*- coding: utf-8 -*-
# 
# Get values from coin tracking websites and add
# to cache database (v2)
import json
import requests
import MySQLdb
import time

# Our base URL for Cryptonator
baseurl = "https://api.cryptonator.com/api/ticker/"

# Currencies we want to track
currencies = ["usd", "eur"]
# Coins we want to track
coins = ["eth", "btc"]

values = {"eth":{},"btc":{}}

# Establish database connection
db = MySQLdb.connect('localhost', 'coingraphs', 'CGpassword', 'coingraphs')
c = db.cursor()

# Iterate through coins
for coin in coins:

    # Sub-iteration of currencies
    for currency in currencies:

        url = baseurl + coin + "-" + currency
        r = requests.get(url=url)
        data = r.json()

        if data['success'] == True:
            values[coin][currency] = data['ticker']['price']
        else:
            values[coin][currency] = 0

    # We do coins -> currency so that for each coin
    # we can do the insert query during the for
    now = time.time()
    c.execute("INSERT INTO " + coin + " (time,usd,eur) VALUES (" +
        str(now) + ", " + str(values[coin]["usd"] + ", " + str(values[coin]["eur"] + ")")))

db.commit()
db.close()