function chartFromJson(jsonData, dirUrl, keyId, titleText, axisY, regions) {
  var keyArray = [];
  keyArray.push(keyId);
  var regionArray = [];
  if (regions !== undefined && regions.length > 0) {
    regionArray = regionArray.concat(regions);
  }
  return c3.generate({
    title: {
      show: true,
      text: titleText,
      position: 'top-center',
      padding: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50
      }
    },
    legend: {
      show: false,
      // position: 'inset',
      // inset: {
      //   anchor: 'top-left', // top-left, top-center and top-right
      //   x: 20,
      //   y: 0,
      //   step: 1
      // },
    },
    bindto: '#' + keyId,
    data: {
      json: jsonData,
      mimeType: 'json',
      keys: {
        x: 'datetime',
        value: keyArray,
      },
      type: 'spline',
      onclick: function (d, element) {
        var relativeUrl = dirUrl + '/' + jsonData[d.index]['datetime'] + '_lighthouse.report.html';
        window.open(relativeUrl, '_blank', 'width=800,height=600');
      }
    },
    axis: {
      x: {
        type: 'category',
        multiline: true,
        height: 77,
        padding: {
          left: 0,
          right: 0
        }
      },
      y: Object.assign({
        padding: { top: 0, bottom: 0 }
      }, axisY)
    },
    regions: regionArray
  });
}

function onSelectTarget(name, jsonUrl) {
  $('#graphArea').show();
  $('#graphTitle').text(name);
  $('title').html(name + ' - Lighthouse Result');
  var dirUrl = jsonUrl.replace('/summary.json', '');
  $.getJSON(jsonUrl,
    function (jsonData) {
      // Score
      var regions4Score = [
        { axis: 'y', start: 90, end: 100, class: 'regionY-green' },
        { axis: 'y', start: 50, end: 89, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 49, class: 'regionY-red' },
      ];
      var axisY4Score = { max: 100, min: 0 };
      chartFromJson(jsonData, dirUrl, 'performance', 'Performance (score)', axisY4Score, regions4Score);
      chartFromJson(jsonData, dirUrl, 'pwa', 'Progressive Web App (score)', axisY4Score, regions4Score);
      chartFromJson(jsonData, dirUrl, 'accessibility', 'Accessibility (score)', axisY4Score, regions4Score);
      chartFromJson(jsonData, dirUrl, 'best-practices', 'Best Practices (score)', axisY4Score, regions4Score);
      chartFromJson(jsonData, dirUrl, 'seo', 'SEO (score)', axisY4Score, regions4Score);
      // Detail (TODO: Tuning threshold.)
      var axisY4Detail = { min: 0 };
      // FCP
      chartFromJson(jsonData, dirUrl, 'first-contentful-paint', 'First Contentful Paint (ms)', axisY4Detail, [
        { axis: 'y', start: 4500, class: 'regionY-red' },
        { axis: 'y', start: 2500, end: 4499, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 2499, class: 'regionY-green' },
      ]);
      // FMP
      chartFromJson(jsonData, dirUrl, 'first-meaningful-paint', 'First Meaningful Paint (ms)', axisY4Detail, [
        { axis: 'y', start: 4350, class: 'regionY-red' },
        { axis: 'y', start: 2350, end: 4349, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 2349, class: 'regionY-green' },
      ]);
      // SPDIDX
      chartFromJson(jsonData, dirUrl, 'speed-index', 'Speed Index (ms)', axisY4Detail, [
        { axis: 'y', start: 6050, class: 'regionY-red' },
        { axis: 'y', start: 3350, end: 6049, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 3349, class: 'regionY-green' },
      ]);
      // FCI
      chartFromJson(jsonData, dirUrl, 'first-cpu-idle', 'First CPU Idle (ms)', axisY4Detail, [
        { axis: 'y', start: 6550, class: 'regionY-red' },
        { axis: 'y', start: 2350, end: 6549, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 2349, class: 'regionY-green' },
      ]);
      // TTI
      chartFromJson(jsonData, dirUrl, 'time-to-interactive', 'Time to Interactive (ms)', axisY4Detail, [
        { axis: 'y', start: 7550, class: 'regionY-red' },
        { axis: 'y', start: 2350, end: 7549, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 2349, class: 'regionY-green' },
      ]);
      // EIL
      chartFromJson(jsonData, dirUrl, 'estimated-input-latency', 'Estimated Input Latency (ms)', axisY4Detail, [
        { axis: 'y', start: 105, class: 'regionY-red' },
        { axis: 'y', start: 50, end: 104, class: 'regionY-yellow' },
        { axis: 'y', start: 0, end: 49, class: 'regionY-green' },
      ]);
      // TTFB
      chartFromJson(jsonData, dirUrl, 'time-to-first-byte', 'Time To First Byte (ms)', axisY4Detail, [
        { axis: 'y', start: 600, class: 'regionY-red' },
        { axis: 'y', start: 0, end: 599, class: 'regionY-green' },
      ]);
    }
  );
}

function getParameter(key) {
  var url = window.location;
  var params = new URLSearchParams(url.search.slice(1));
  return params.get(key);
}

$(function () {
  $.extend($.fn.dataTable.defaults, {
    // language: { url: "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json" }
  });
  var latestTable = $('#latestTable').DataTable({
    lengthMenu: [[30, 50, -1], [30, 50, "All"]],
    order: [[2, "desc"]],
    fixedHeader: true,
    ajax: { url: "./latest.json", dataSrc: '' },
    columns: [
      {
        data: 'name',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="javascript:void(0);" onclick="onSelectTarget(\'' + data + '\',\'' + row.path + '\');">' + data + '</a>'
          }
          return data;
        }
      },
      {
        data: 'url',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="' + row.url + '">' + data + '</a>';
          }
          return data;
        }
      },
      { data: 'performance' },
      { data: 'pwa' },
      { data: 'accessibility' },
      { data: 'best-practices' },
      { data: 'seo' },
      { data: 'datetime' }
    ]
  });
  $('#graphArea').hide();
});
