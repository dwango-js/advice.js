JASMINE_CONFIG_PATH=test/support/jasmine.json

build:
	@./node_modules/.bin/browserify -s advice index.js > advice.js

test:
ifeq ($(BROWSER),)
	@$(MAKE) test-node
else
	@$(MAKE) test-browser
endif

test-node:
	@JASMINE_CONFIG_PATH=$(JASMINE_CONFIG_PATH) ./node_modules/.bin/jasmine

test-browser: build
	@./node_modules/.bin/karma start --browsers $(BROWSER)

.PHONY: build test
