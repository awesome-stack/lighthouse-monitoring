#!/bin/sh
cd $(dirname $0)

DOCKER_IMAGE_NAME=${1:-lighthouse-monitoring}

echo "Building \"${DOCKER_IMAGE_NAME}\" Start."
rm -f lighthouse_version.txt

docker build -t ${DOCKER_IMAGE_NAME} --force-rm=true --no-cache=true --pull=true --rm=true .
docker image prune -f
docker images | grep ${DOCKER_IMAGE_NAME}

chrome_version=`docker run --rm ${DOCKER_IMAGE_NAME} bash -c "google-chrome --version" | sed -e "s/Google Chrome//g" -e "s/ //g"`
lighthouse_version=`docker run --rm ${DOCKER_IMAGE_NAME} bash -c "lighthouse --version"`

echo "Building \"${DOCKER_IMAGE_NAME}\" End."
echo "Chrome version: ${chrome_version}"
echo "Lighthouse version: ${lighthouse_version}"

echo ${lighthouse_version} > lighthouse_version.txt
