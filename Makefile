yarn-%:
	docker-compose -f tools/docker-compose-tools.yaml run --rm -v "$$(pwd)":/pkg -w /pkg node yarn $*

yarn-run-%:
	docker-compose -f tools/docker-compose-tools.yaml run --rm -v "$$(pwd)":/pkg -w /pkg node yarn run $*
