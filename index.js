const LighthouseHelper = require('./components/LighthouseHelper');

const targets = require('./configs/targets.json');

targets.forEach(target => {
  LighthouseHelper.mkReportDir(__dirname, target);
  LighthouseHelper.analyze(target);
});
