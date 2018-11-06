const path = require('path');
const {spawn} = require('child_process');
const binPath = require('wkhtmltopdf-installer').path;
const mustache = require('mustache');
const fs = require('fs');
const priceValues = require('../price/price-values');
const priceSummary = require('../price/price-summary');
const formatters = require('./formatters');

const generate = (invoice, i18n) => {
  return new Promise((resolve, reject) => {
    let index = 0;

    const data = {
      invoice,
      ...priceValues,
      ...priceSummary,
      ...formatters,
      translate: () => (text, render) => i18n.__(render(text)),
      index: function () {
        return ++index;
      }
    };

    fs.readFile(path.join(__dirname, '..', '..', 'templates', 'pdf.html'), (err, template) => {
      const rendered = mustache.render(template.toString(), data);

      const childArgs = [
        '--viewport-size',
        ' 1280x1024',
        '-',
        path.join(process.cwd(), `Faktura VAT ${invoice.number.replace(/\//g, ':')}.pdf`),
      ];

      const wk = spawn(binPath, childArgs);

      wk.stdin.write(rendered);
      wk.stdin.end();

      wk.on('close', (code) => {
        if (code > 0) {
          return reject(new Error('Could not generate pdf.'));
        }

        resolve();
      });
    });
  });
};

module.exports = {
  generate
};
