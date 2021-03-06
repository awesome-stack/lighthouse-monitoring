const ReportHelper = require('./ReportHelper');
const fs = require('fs');

const summaryJsonFileName = 'summary.json';
const latestJsonFileName = 'latest.json';

module.exports = class SummaryHelper {

  static getSummaryJson(target, reportJson, datetimeText) {
    return {
      "name": target.name,
      "url": target.url,
      "datetime": datetimeText,
      "performance": Math.round(reportJson.categories.performance.score * 100),
      "pwa": Math.round(reportJson.categories.pwa.score * 100),
      "accessibility": Math.round(reportJson.categories.accessibility.score * 100),
      "best-practices": Math.round(reportJson.categories["best-practices"].score * 100),
      "seo": Math.round(reportJson.categories.seo.score * 100),
      "first-contentful-paint": Math.round(reportJson.audits["first-contentful-paint"].rawValue),
      "first-meaningful-paint": Math.round(reportJson.audits["first-meaningful-paint"].rawValue),
      "speed-index": Math.round(reportJson.audits["speed-index"].rawValue),
      "first-cpu-idle": Math.round(reportJson.audits["first-cpu-idle"].rawValue),
      "time-to-interactive": Math.round(reportJson.audits["interactive"].rawValue),
      "estimated-input-latency": Math.round(reportJson.audits["estimated-input-latency"].rawValue),
      "time-to-first-byte": Math.round(reportJson.audits["time-to-first-byte"].rawValue),
    }
  }

  static summary(rootPath, targets) {
    let latestArray = [];
    targets.forEach(target => {
      const reportDirPath = rootPath + '/' + ReportHelper.getReportDirName() + '/' + ReportHelper.getReportDirRelativePath(target);
      const fileNames = fs.readdirSync(reportDirPath).filter(fileName => {
        return fileName.match(/_lighthouse.report.json/);
      });
      let summaryArray = [];
      for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        const datetimeText = fileName.replace('_lighthouse.report.json', '');
        const reportJson = require(reportDirPath + '/' + fileName);
        const summaryJson = this.getSummaryJson(target, reportJson, datetimeText);
        summaryArray.push(summaryJson);
        if (i === fileNames.length - 1) {
          let latestJson = Object.assign({
            "path": (ReportHelper.getReportDirRelativePath(target) + '/' + summaryJsonFileName).replace('//', '/'),
          }, summaryJson);
          latestArray.push(latestJson);
        }
      }
      fs.writeFileSync(reportDirPath + '/' + summaryJsonFileName, JSON.stringify(summaryArray));
    });
    fs.writeFileSync(rootPath + '/' + ReportHelper.getReportDirName() + '/' + latestJsonFileName, JSON.stringify(latestArray));
  }

}
