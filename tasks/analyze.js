const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

// Specify options except output-path.
const options = '--no-enable-error-reporting --chrome-flags="--headless" --output json --output html';

targets.forEach(target => {
  LighthouseHelper.mkReportDir(__dirname + '/..', target);
  LighthouseHelper.analyze(target, options);
});
