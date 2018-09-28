# Lighthouse Monitoring

Monitoring tool for [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/).

## Requirements
* Docker

## Usage

### Build docker image
```
sh docker/build.sh
```

### Edit target config
```
cp configs/targets.example.json configs/targets.json
vi configs/targets.json
```

### Run on Docker
```
sh run.sh
```
-> reports/index.html

### Run on Local

#### Visible mode
```
export SHOW_CHROME=yes
sh runLocal.sh
```

#### Headless mode (default)
```
export SHOW_CHROME=no
sh runLocal.sh
```

### Post to ElasticSearch (Optional)
```
cp configs/esEnv.example.json configs/esEnv.json
vi configs/esEnv.json
sh runPostEs.sh
```

### Post to Slack (Optional)
```
export SLACK_INCOMING_WEBHOOK_URL=${Your_Slack_Incoming_Webhook_URL}
export SLACK_CHANNEL_NAME='#debug'
sh runPostSlack.sh
```

## References
* Metrics
    * [First Contentful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)
    marks the time at which the first text or image is painted.

    * [First Meaningful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)
    measures when the primary content of a page is visible.

    * [Speed Index](https://developers.google.com/web/tools/lighthouse/audits/speed-index)
    shows how quickly the contents of a page are visibly populated.

    * [First CPU Idle](https://developers.google.com/web/tools/lighthouse/audits/first-interactive)
    marks the first time at which the page's main thread is quiet enough to handle input.

    * [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/consistently-interactive)
    marks the time at which the page is fully interactive. 

    * [Estimated Input Latency](https://developers.google.com/web/tools/lighthouse/audits/estimated-input-latency)
    is an estimate of how long your app takes to respond to user input, in milliseconds, during the busiest 5s window of page load. If your latency is higher than 50 ms, users may perceive your app as laggy.

    * [Time To First Byte](https://developers.google.com/web/tools/lighthouse/audits/ttfb)
    identifies the time at which your server sends a response.
* Fundamentals
    * [Performance](https://developers.google.com/web/fundamentals/performance/get-started/)
    * [RAIL Model](https://developers.google.com/web/fundamentals/performance/rail)
        * [Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
