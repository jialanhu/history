include .env.default
export

compose-up:
	docker compose up -d --build && docker compose logs -f
.PHONY: compose-up

compose-down:
	docker compose down && docker ps -a
.PHONY: compose-down

mod-td:
	go mod tidy && go mod download
.PHONY: mod-td

swag:
	swag init -g ./internal/controller/router.go --parseDependency
.PHONY: swag

run: mod-td swag
	DISABLE_SWAGGER_HTTP_HANDLER='' \
	GIN_MODE=debug \
	go run ./cmd/main.go
.PHONY: run