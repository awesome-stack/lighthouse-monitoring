#!/bin/bash
cd $(dirname $0)

docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'npm i && node tasks/postMySQL.js'
