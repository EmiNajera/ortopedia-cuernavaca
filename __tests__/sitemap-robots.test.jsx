import handlerSitemap from '../pages/api/sitemap.xml.js';
import handlerRobots from '../pages/api/robots.txt.js';

function mockRes() {
  const chunks = [];
  return {
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader() {},
    write(chunk) {
      chunks.push(Buffer.from(chunk));
    },
    end(chunk) {
      if (chunk) chunks.push(Buffer.from(chunk));
      this.body = Buffer.concat(chunks).toString('utf8');
    },
  };
}

test('sitemap.xml returns XML with urls', () => {
  const req = {};
  const res = mockRes();
  handlerSitemap(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toContain('<urlset');
  expect(res.body).toContain('<loc>');
});

test('robots.txt allows and references sitemap', () => {
  const req = {};
  const res = mockRes();
  handlerRobots(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toContain('User-agent: *');
  expect(res.body).toContain('Sitemap:');
});
