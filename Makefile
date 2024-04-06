# Variables
DOCKER_IMAGE_NAME = the-Galactic-Eatery
DOCKER_CONTAINER_NAME = the-Galactic-Eatery_container
HOST_DIRECTORY=./
CONTAINER_DIRECTORY=/the-Galactic-Eatery
.PHONY: build run exec stop clean


# 1) Builds a docker image for a development box
build:
	sudo docker build -t $(DOCKER_IMAGE_NAME) .

# 2) Runs the dev-box image in a container
# This will run the image in the background and map port 2022 to the ssh port on the dev box
# Feel free to add more ports as needed, (ex: docker run -d -p 2022:22 -p 9000:80 dev-box)
run:
	sudo docker run -d -p 2022:22 -p 8080:8080 -p 27017:27017 -p 3306:3306 -p 5432:5432 -p 8000:8000 -p 5000:5000  --name $(DOCKER_CONTAINER_NAME) -v ${HOST_DIRECTORY}:${CONTAINER_DIRECTORY} ${DOCKER_IMAGE_NAME}

# 3) Execute a command inside the Docker container
exec:
	docker exec -it $(DOCKER_CONTAINER_NAME) bash


# 4) Use Start to get access to an active container
start:
	sudo docker start $(DOCKER_CONTAINER_NAME) bash


# SSH into the running dev-box
ssh:
	ssh -p 2022 root@localhost

# Stop your docker container
stop:
	sudo docker stop $(DOCKER_CONTAINER_NAME)

# Remove all docker containers
clean:
	docker stop $(DOCKER_CONTAINER_NAME) || true
	docker rm $(DOCKER_CONTAINER_NAME) || true
	docker rmi $(DOCKER_IMAGE_NAME) || true

# Remove all docker images, containers, and volumes
nuke:
	docker system prune -af

# Reset known hosts on local machine for port 2022
# This may need to be run if you make a new dev-box and aren't able to ssh into it
reset-known-hosts:
	ssh-keygen -R [localhost]:2022