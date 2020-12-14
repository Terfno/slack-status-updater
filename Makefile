INAME:=node
TAG:=14.15.1-alpine3.10
CNAME:=slack-status-updater
CONTAINER_ENGINE:=docker

podman.%:
	@$(MAKE) $* CONTAINER_ENGINE="podman"

init:
	@${CONTAINER_ENGINE} pull ${INAME}:${TAG} &&\
	cp .env.example .env

build:
	@${CONTAINER_ENGINE} build -t '${INAME}:${TAG}' .

run:
	@${CONTAINER_ENGINE} run --rm -v ${PWD}:/work -w /work --name ${CNAME} -itd ${INAME}:${TAG} sh

exec:
	@${CONTAINER_ENGINE} exec -it ${CNAME} sh

start:
	@${CONTAINER_ENGINE} start ${CNAME}

stop:
	@${CONTAINER_ENGINE} stop ${CNAME}

# rm
rm:
	@${CONTAINER_ENGINE} rm ${CNAME}

rmi:
	@${CONTAINER_ENGINE} rmi ${INAME}:${TAG}
