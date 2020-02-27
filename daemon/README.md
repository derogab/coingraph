# Coingraph Daemon

A daemon for coingraph who takes care of
- collecting data from external sources
- organizing the data in the local database
- emitting historical and live data via socket
- exposing an API

## Dependencies
```shell	
yarn
```

## Configuration  
Open `.env` and eventually change default preferences.

## Usage
```shell	
node app.js
```
Or with custom params
```shell
node app.js --db db.json --timeout 180 bitcoin ethereum
```
Info: custom params overwrite default preferences in `.env`.

## Docker
###### Build image 
```shell
docker build -t coingraph-daemon .
```
###### Start container
```shell
docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/host/data:/usr/src/app/data \
    coingraph-daemon
```
Or with custom params
```shell
docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/host/data:/usr/src/app/data \
    coingraph-daemon \
    --db db.json \
    --timeout 180 \
    bitcoin ethereum
```