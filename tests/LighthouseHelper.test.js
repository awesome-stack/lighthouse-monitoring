const LighthouseHelper = require('../components/LighthouseHelper');
const targets = require('../configs/targets.json');

test('getOutPath', () => {
  targets.forEach(target => {
    const outPath = LighthouseHelper.getOutPath(target);
    console.log(outPath);
  });
});

// // WIP
// test('postES', () => {
//   const hostUrl = 'localhost:9200';
//   const reportJson = require(__dirname + '/../' + 'reports/https/github.com/2018-09-18T00:49:05_lighthouse.report.json');
//   const datetimeText = '2018-09-18T00:49:05';
//   LighthouseHelper.postES(hostUrl, reportJson, datetimeText);
// });
