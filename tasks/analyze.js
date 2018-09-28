const fs = require('fs');
const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

// Specify options except output-path.
// c.f.) https://github.com/GoogleChrome/lighthouse#cli-options
let options = '--no-enable-error-reporting --output json --output html';

if (process.env.SHOW_CHROME !== 'yes') {
  options += ' --chrome-flags="--headless"'
}

// If headers.json exist, add option.
const headersJsonPath = __dirname + '/../configs/headers.json';
try {
  fs.accessSync(headersJsonPath, fs.constants.R_OK | fs.constants.W_OK);
  console.log('[INFO] configs/headers.json exist, so add --extra-headers option.');
  options += ' --extra-headers ' + headersJsonPath;
} catch (err) {
  console.log('[INFO] configs/headers.json does not exist.');
}

targets.forEach(target => {
  console.log('[INFO] ' + target.name);
  LighthouseHelper.mkReportDir(__dirname + '/..', target);
  LighthouseHelper.analyze(target, options);
});
