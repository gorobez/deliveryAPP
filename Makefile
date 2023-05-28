include .env
export

SHELL=/bin/bash

UID := $(shell id -u)
GID := $(shell id -g)

export UID
export GID

THIS_FILE := $(lastword $(MAKEFILE_LIST))
.PHONY: help build up start down stop restart logs logs-php-fpm ps login-nginx login-php-fpm db-shell
help:
	make -pRrq  -f $(THIS_FILE) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'
build:
	docker-compose -f docker-compose.yml build $(c)
buildnc:
	docker-compose -f docker-compose.yml build --no-cache $(c)
up:
	docker-compose -f docker-compose.yml up --build -d $(c)
start:
	docker-compose -f docker-compose.yml start $(c)
down:
	docker-compose -f docker-compose.yml down $(c)
stop:
	docker-compose -f docker-compose.yml stop $(c)

restart:
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml start $(c)
deploy:
	make login
	docker-compose -f docker-compose.yml pull $(c)
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up -d $(c)
logs:
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)
scale:
	docker-compose -f docker-compose.yml scale $(c)
ps:
	docker-compose -f docker-compose.yml ps
in:
	docker-compose -f docker-compose.yml exec $(c) /bin/bash

firststart:
#	sed -i "s/_UID_/`id -u`/g" .env
	mkdir -p grafana/grafana_data prometheus_data
	make up
	./grafapi.py

refirststart:
	make down
#	sed -i "`grep -n "TOKEN" .env | cut -d : -f 1`d" .env
#	echo "TOKEN=test" >> .env
#	sed -i '/TOKEN=/d' .env
#	cat .env
	rm -rf ./grafana/grafana_data/grafana.db ./grafana/grafana_data/plugins ./prometheus_data/*
	make firststart
