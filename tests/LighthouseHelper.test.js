const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

test('getOutPath', () => {
  targets.forEach(target => {
    const outPath = LighthouseHelper.getOutPath(target);
    console.log(outPath);
  });
});
