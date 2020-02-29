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
node app.js \
    --db db.json \
    --crypto bitcoin,ethereum \
    --timeout 180 \
    --api-port 8080 \
    --io-port 8081
```
Info: custom params overwrite default preferences in `.env`.

## Docker
###### Build image from source
```shell
docker build -t derogab/coingraph-daemon .
```
###### Start container
```shell
docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/host/data:/usr/src/app/data \
    derogab/coingraph-daemon
```
Or with custom params
```shell
docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/host/data:/usr/src/app/data \
    derogab/coingraph-daemon \
    --db db.json \
    --crypto bitcoin,ethereum \
    --timeout 180 \
    --api-port 8080 \
    --io-port 8081
```