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

### Run
```
sh run.sh
```
