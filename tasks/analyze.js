const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

// Specify options except output-path.
// c.f.) https://github.com/GoogleChrome/lighthouse#cli-options
let common_options = '--no-enable-error-reporting --output json --output html';

if (process.env.SHOW_CHROME !== 'yes') {
  common_options += ' --chrome-flags="--headless"'
}

targets.forEach(target => {
  console.log('[INFO] ' + target.name);
  let options = common_options;
  // If headers exist, add option.
  if (target.headers !== undefined) {
    const headers_options = JSON.stringify(target.headers).replace(/"/g, '\\\"');
    options += ' --extra-headers ' + headers_options;
  }
  LighthouseHelper.mkReportDir(__dirname + '/..', target);
  LighthouseHelper.analyze(target, options);
});
