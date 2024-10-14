# Coingraph

[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/derogab/coingraph?include_prereleases)](https://github.com/derogab/coingraph/releases)
[![Build & Push Docker Image](https://github.com/derogab/coingraph/actions/workflows/docker-publish.yml/badge.svg?branch=master)](https://github.com/derogab/coingraph/actions/workflows/docker-publish.yml)
[![GitHub stars](https://img.shields.io/github/stars/derogab/coingraph)](https://github.com/derogab/coingraph/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/derogab/coingraph)](https://github.com/derogab/coingraph/network)
[![GitHub issues](https://img.shields.io/github/issues/derogab/coingraph)](https://github.com/derogab/coingraph/issues)
[![GitHub License](https://img.shields.io/github/license/derogab/coingraph)](https://github.com/derogab/coingraph/blob/master/LICENSE)

Coingraph is a **real-time graph for cryptocurrencies**.

![](./assets/header.png)

## Dependencies
```shell
npm install
```
And don't forget to also install the [daemon dependencies](./daemon/README.md#dependencies)!

## Configuration
If necessary, view the [daemon configurations](./daemon/README.md#configuration).

## Usage
```shell
npm run all
```
The previous command starts both the [daemon](./daemon) and the web interface.

## Docker

[![GitHub release (latest SemVer including pre-releases)](https://img.shields.io/github/v/release/derogab/coingraph?include_prereleases?label=Release)](https://github.com/derogab/coingraph/releases)
[![Build & Push Docker Image](https://github.com/derogab/coingraph/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/derogab/coingraph/actions/workflows/docker-publish.yml)
[![Docker Pulls](https://img.shields.io/docker/pulls/derogab/coingraph-client?label=Downloads&logo=docker)](https://hub.docker.com/r/derogab/coingraph-client)

#### Manual
1. [Start the `coingraph-daemon`](./daemon/README.md#start-container) and then
2. Run the container
    ```shell
    docker run -d \
      -p 3000:80 \
      --link DAEMON_CONTAINER_ID \
      ghcr.io/derogab/coingraph-client
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

### Tip
If you like this project or directly benefit from it, please consider [buying me a coffee](https://derogab.com/donate).

## License
[_Coingraph_](https://github.com/derogab/coingraph) is made with ♥  by [derogab](https://github.com/derogab) and the [amazing dev team](https://github.com/derogab/coingraph/graphs/contributors). It is released under the MIT license.
