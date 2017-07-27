#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import requests
import _mysql
import sys
import time

# Get data value

# BTC - USD
r = requests.get(url='https://api.cryptonator.com/api/ticker/btc-usd')
data = r.json()

# BTC - EUR
success1 = data['success']
btc_usd = data['ticker']['price'];

# BTC - EUR
r = requests.get(url='https://api.cryptonator.com/api/ticker/btc-eur')
data = r.json()

success2 = data['success']
btc_eur = data['ticker']['price'];


# ETH - USD
r = requests.get(url='https://api.cryptonator.com/api/ticker/eth-usd')
data = r.json()

success3 = data['success']
eth_usd = data['ticker']['price'];

# ETH - EUR
r = requests.get(url='https://api.cryptonator.com/api/ticker/eth-eur')
data = r.json()

success4 = data['success']
eth_eur = data['ticker']['price'];

if success1 == True and success2 == True and success3 == True and success4 == True:

    now = time.time()

    try:
        con = _mysql.connect('', '', '', '')

        # Save BTC value now
        con.query("INSERT INTO btc (time, usd, eur) VALUES ("+str(now)+", "+str(btc_usd)+", "+str(btc_eur)+");")
        # Save ETH value now
        con.query("INSERT INTO eth (time, usd, eur) VALUES ("+str(now)+", "+str(eth_usd)+", "+str(eth_eur)+");")

    except _mysql.Error, e:

        print("Error %d: %s" % (e.args[0], e.args[1]))
        sys.exit(1)

    finally:

        if con:
            con.close()

    pass
