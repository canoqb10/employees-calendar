#!/bin/bash
export DOCKER_API = employees-calendar-api
export UID = $(shell id -u)

help:
	@echo "usage: make <command>"
	@echo
	@echo "commands:"
	@grep -E '^[A-Za-z0-9_-]+:.*##' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-20s %s\n", $$1, $$2}'

run: ## Run the application 
	docker network create employees-calendar-network || true
	UID=$(UID) docker-compose up -d

down: ## Stop and remove the application containers	
	UID=$(UID) docker-compose down

restart: ## Restart the application 
	UID=$(UID) docker-compose restart

build: ## Build the application
	@echo UID=$(UID)
	UID=$(UID) docker-compose build --no-cache

prepare: ## Prepare the application
	$(MAKE) composer-install

composer-install: ## Install composer dependencies
	UID=$(UID) docker exec -it --user $(UID) $(DOCKER_API) composer install --no-scripts --no-interaction --prefer-dist --optimize-autoloader

api-logs: ## Show API logs
	UID=$(UID) docker exec -it --user $(UID) $(DOCKER_API) tail -f /var/log/dev.log

ssh-api: ## SSH into API container
	UID=$(UID) docker exec -it --user $(UID) $(DOCKER_API) bash

code-style: ## Check code style
	UID=$(UID) docker exec -it --user $(UID) $(DOCKER_API) php-cs-fixer fix src --rules=@Symfony --dry-run --diff