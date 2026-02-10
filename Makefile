all : build up

build :
	@docker-compose -f docker-compose.yml build

up :
	@docker-compose -f docker-compose.yml up -d

down :
	@docker-compose -f docker-compose.yml down -v

start :
	@docker-compose -f docker-compose.yml start

stop :
	@docker-compose -f docker-compose.yml stop

status :
	@docker ps