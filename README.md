# express-api

Simple api with postgres database

----

## Getting started

Use docker-compose to run app locally:

```
docker-compose up api
```

## Tests

```
docker-compose up tests
```

## api

```
GET /movies/
```

```
GET /comments/
```

```
POST /movies/
```

| Param         | Description         |
| ------------- | ---------------------- |
| title         | movie title to search  |

```
POST /comments/
```

| Param         | Description      |
| ------------- | -----------------|
| nickname      | comment author   |
| comment       | comment content  |