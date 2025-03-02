run:
	npm start

init-db:
	docker run --rm --name todo-db \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=mypass \
		-e POSTGRES_DB=todo_db \
		-v "${PWD}/scripts/init.sql:/docker-entrypoint-initdb.d/init.sql" \
		-p 5432:5432 \
		postgres:15


