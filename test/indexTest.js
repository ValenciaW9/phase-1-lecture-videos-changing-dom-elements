onst fs = require('fs');
const path = require('path');
const babel = require('babel-core');

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, '..', 'index.js'), {
    presets: ['env']
  }
);

const src = babelResult.code;

document.body.innerHTML = html;

eval(src);

describe('index.js', () => {
  describe('remove main#main', () => {
    it('no longer has DOM node \'main#main\'', () => {
      const main = document.querySelector('main#main');
      expect(main).toBeNull();
    });
  });

  describe('create newHeader variable', () => {
    it('has a \'newHeader\' variable that points to an <h1> node', () => {
      expect(newHeader).toBeDefined();
      expect(newHeader.nodeName).toBe('H1');
    });

    it('the \'newHeader\' variable has an id of \'victory\'', () => {
      expect(newHeader.id).toBe('victory');
    });

    it('the \'newHeader\' variable has the text "YOUR-NAME is the champion"', () => {
      expect(newHeader.textContent).toBe('YOUR-NAME is the champion');
    });
  });
});
