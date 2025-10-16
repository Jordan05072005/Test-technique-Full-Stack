.PHONY: init up down sup rebuild


up:
	docker-compose up

init:
	sudo systemctl start docker

build:
	docker-compose up --build

down:
	docker-compose down

sup:
	docker-compose down -v

re: init down up

back:
	docker-compose up --build back

front:
	docker-compose up --build front

mongo:
	docker-compose up --build mongo

