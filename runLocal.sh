#!/bin/bash
cd $(dirname $0)

npm i

if [ "${PSI_API_KEY}" != "" ]
then
    node tasks/analyzePSI.js
fi

node tasks/analyzeLH.js
node tasks/summary.js
