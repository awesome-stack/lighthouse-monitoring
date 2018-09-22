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

### Edit header option (Optional)
If you want to add HTTP Header to send in Lighthouse's requests, create this file.
(This is "--extra-headers" option of [Lighthouse CLI Option](https://github.com/GoogleChrome/lighthouse#cli-options))
```
cp configs/headers.example.json configs/headers.json
vi configs/headers.json
```

### Run
```
sh run.sh
```
-> reports/index.html

## References
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
