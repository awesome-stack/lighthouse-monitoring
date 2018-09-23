#!/bin/sh
cd $(dirname $0)

if [ "${SLACK_INCOMING_WEBHOOK_URL}" = "" ]
then
    echo 'Please set the Environment variable "SLACK_INCOMING_WEBHOOK_URL".'
    exit 1
fi

if [ "${SLACK_CHANNEL_NAME}" = "" ]
then
    echo 'Please set the Environment variable "SLACK_CHANNEL_NAME".'
    exit 1
fi

if [ "${SLACK_USERNAME}" = "" ]
then
    SLACK_USERNAME='Lighthouse'
fi

if [ "${SLACK_ICON_EMOJI}" = "" ]
then
    SLACK_ICON_EMOJI=':rainbow:'
fi

# c.f.) https://www.npmjs.com/package/json2csv
message=''
message+='```'"\n"
message+='PF, FCP , FMP , SPDI, CPU , TTI , TTFB, EIL , Name'"\n"
message+=`docker run -v $(pwd):/app --rm lighthouse-monitoring bash -c 'npx json2csv -i reports/latest.json -f performance,first-contentful-paint,first-meaningful-paint,speed-index,first-cpu-idle,time-to-interactive,time-to-first-byte,estimated-input-latency,name -H' | sed -e 's/\"//g' -e 's/,/, /g'`
message+="\n"'```'"\n"
message+='>_PF_: Performance, _FCP_: First Contentful Paint, _FMP_: First Meaningful Paint, _SPDI_ : Speed Index,'"\n"
message+='> _FCI_ : First CPU Idle, _TTI_ : Time to Interactive, _EIL_: Estimated Input Latency, _TTFB_: Time To First Byte'"\n"
echo ${message}
curl -X POST --data-urlencode "payload={\"channel\": \"${SLACK_CHANNEL_NAME}\", \"username\": \"${SLACK_USERNAME}\", \"text\": \"${message}\", \"icon_emoji\": \"${SLACK_ICON_EMOJI}\"}" ${SLACK_INCOMING_WEBHOOK_URL}
