#!/bin/bash
cd $(dirname $0)

docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'npm i'

if [ "${PSI_API_KEY}" != "" ]
then
    docker run -e PSI_API_KEY=${PSI_API_KEY} -v $(pwd):/app --rm lighthouse-monitoring bash -c 'node tasks/analyzePSI.js'
fi

docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'node tasks/analyzeLH.js'
docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'node tasks/summary.js'
