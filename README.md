# Coingraph

[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/derogab/coingraph?include_prereleases&style=flat-square)](https://github.com/derogab/coingraph/releases)
[![Travis (.org)](https://img.shields.io/travis/derogab/coingraph?style=flat-square)](https://travis-ci.com/derogab/coingraph/)
[![GitHub stars](https://img.shields.io/github/stars/derogab/coingraph?style=flat-square)](https://github.com/derogab/coingraph/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/derogab/coingraph?style=flat-square)](https://github.com/derogab/coingraph/network)
[![GitHub issues](https://img.shields.io/github/issues/derogab/coingraph?style=flat-square)](https://github.com/derogab/coingraph/issues)
[![GitHub License](https://img.shields.io/github/license/derogab/coingraph?style=flat-square)](https://github.com/derogab/coingraph/blob/master/LICENSE)

Coingraph is a **real-time graph for cryptocurrencies**.

![](./assets/header.png)

## Dependencies
```shell
yarn
```
And don't forget to also install the [daemon dependencies](./daemon/README.md#dependencies)!

## Configuration
If necessary, view the [daemon configurations](./daemon/README.md#configuration).

## Usage
```shell
yarn run all
```
The previous command starts both the [daemon](./daemon) and the web interface.

## Docker

[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/derogab/coingraph?include_prereleases&style=flat-square)](https://github.com/derogab/coingraph/releases)
[![Docker Image Size (tag)](https://img.shields.io/docker/image-size/derogab/coingraph-client/latest?style=flat-square)](https://hub.docker.com/r/derogab/coingraph-client)
[![Docker Pulls](https://img.shields.io/docker/pulls/derogab/coingraph-client?style=flat-square)](https://hub.docker.com/r/derogab/coingraph-client)

#### Manual
1. [Start the `coingraph-daemon`](./daemon/README.md#start-container) and then
2. Run the container
    ```shell
    docker run -d \
      -p 3000:3000 \
      --link DAEMON_CONTAINER_ID \
      derogab/coingraph-client
    ```

#### Using `docker-compose` 
Copy `.env.template` to `.env`. Eventually change environment variables and then start one of the following.
###### Production 
```shell
docker-compose up -d
```
###### Development
```shell
docker-compose -f docker-compose.dev.yml up -d 
```
###### Build 
```shell
docker-compose -f docker-compose.build.yml up -d --build
```

## License
[_Coingraph_](https://github.com/derogab/coingraph) is made with ♥  by [derogab](https://github.com/derogab) and the [amazing dev team](https://github.com/derogab/coingraph/graphs/contributors). It is released under the MIT license.
