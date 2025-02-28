# Todo API

API to save todo tasks.

## Testing

Create new todo:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"title":"Run", "description":"Run a marathon"}' http://localhost:3000/todos
```

Get all todos

```shell
curl http://localhost:3000/todos
```

Update a todo

```shell
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' http://localhost:3000/todos/1
```

Get a todo

```shell
curl http://localhost:3000/todos/1
```

Delete a todo

```shell
curl -X DELETE http://localhost:3000/todos/1
```

Health check

```shell
curl http://localhost:3000/health
```
