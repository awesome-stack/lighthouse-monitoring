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
