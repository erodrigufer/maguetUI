# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOVET=$(GOCMD) vet

BINARY_NAME=maguetServer

# Builds the Go binary for the current platform.
build:
	$(GOBUILD) -o $(BINARY_NAME) -v ./cmd/$(BINARY_NAME)

# Runs tests.
test:
	$(GOTEST) -v ./...

vet:
	$(GOVET) -v ./... 

# Removes any build artifacts from previous builds.
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)

run: build
	./$(BINARY_NAME)
