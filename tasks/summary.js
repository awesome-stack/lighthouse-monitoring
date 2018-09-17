const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

LighthouseHelper.summary(__dirname + '/..', targets);
