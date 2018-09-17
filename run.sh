#!/bin/bash
cd $(dirname $0)

docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'node index.js'
