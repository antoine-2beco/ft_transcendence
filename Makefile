# SHELL := /bin/sh
DC := docker compose -f docker-compose.yml

# define BAR
# 	@printf "[##########] %s\n" "$(1)"
# endef

.PHONY: all build up down clean start stop

all: build up

build:
	$(call BAR,build)
	@$(DC) build

up:
	$(call BAR,up)
	@$(DC) up -d

down:
	$(call BAR,down)
	@$(DC) down

clean:
	$(call BAR,clean)
	@$(DC) down -v

start:
	$(call BAR,start)
	@$(DC) start

stop:
	$(call BAR,stop)
	@$(DC) stop