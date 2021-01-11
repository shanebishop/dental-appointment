# dental-appointment

This repository holds the source code for my Honours Project at Carleton University,
under the supervision of Professor Jean-Pierre Corriveau.

This project consists of a client and a server. The client code is under the `frontend`
directory, and the server code is under the `backend` directory. The client is written in
JavaScript with React, and the server is written in Python with Django.

## Run app

This app uses Docker and docker-compose. To run the app, both Docker and docker-compose
must be installed.

To install both Docker and docker-compose, run

```
scripts/install_docker_compose.sh
```

Once Docker and docker-compose are installed, the app can be started by running

```
docker-compose up -d
```

To stop the app once it is running, run

```
docker-compose down
```

## Run tests

To run Django tests, run:

```
scripts/run_django_tests.sh
```

To run Robot Framework tests, run:

```
scripts/run_robot_tests.sh
```
