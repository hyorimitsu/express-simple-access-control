yarn-run-%:
	docker-compose -f ../tools/docker-compose-tools.yaml run --rm -v "$$(pwd)/functions":/app -w /app node yarn run $*

yarn-%:
	docker-compose -f ../tools/docker-compose-tools.yaml run --rm -v "$$(pwd)/functions":/app -w /app node yarn $*
