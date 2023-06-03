#!/bin/bash
mongoimport -d shop -c products --file /docker-entrypoint-initdb.d/products.json
mongoimport -d shop -c shops --file /docker-entrypoint-initdb.d/shops.json