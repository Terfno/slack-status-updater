INAME:=terfno/slack-status-updater
TAG:=latest
CNAME:=slack-status-updater
CONTAINER_ENGINE:=docker

podman.%:
	@$(MAKE) $* CONTAINER_ENGINE="podman"

build:
	@${CONTAINER_ENGINE} build -t '${INAME}:${TAG}' .

run:
	@${CONTAINER_ENGINE} run -v ${PWD}:/work -w /work --name ${CNAME} -itd ${INAME}:${TAG} sh

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
