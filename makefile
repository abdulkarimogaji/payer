.PHONY: build

build:
	go build -o ./bin/payer . 

.PHONY: run

run: build
	./bin/payer