import * as koa from 'koa';
import * as path from 'path';
import * as fs from 'fs-extra';
const crypto = require('crypto');

class HttpCache {
  async index(ctx: koa.Context) {
    await ctx.render('httpCache', {
      title: 'http cache demo'
    });
  }
  async cache(ctx: koa.Context) {
    let stats;
    const rootPath = path.resolve(__dirname, '../../static', ctx.params.name);

    // test Last-Modified/If-Modified-Since
    if (ctx.params.name === 'li.json') {
      stats = await fs.stat(rootPath);

      ctx.set('Content-Length', String(stats.size));

      if (
        ctx.get('if-modified-since') &&
        ctx.get('if-modified-since') === stats.mtime.toUTCString()
      ) {
        ctx.status = 304;
        return;
      } else {
        ctx.set('Last-Modified', stats.mtime.toUTCString());
        ctx.body = fs.createReadStream(rootPath);
      }
    }

    // test Etag/If-None-Match
    if (ctx.params.name === 'ei.json') {
      function getHash(str: any) {
        const chash = crypto.createHash('sha1');
        return chash.update(str).digest('base64');
      }

      const file = await fs.readFile(rootPath);
      const hash = getHash(file);
      if (ctx.get('if-none-match') && ctx.get('if-none-match') === hash) {
        ctx.status = 304;
        return;
      } else {
        ctx.set('Etag', hash);
        ctx.body = fs.createReadStream(rootPath);
      }
    }
  }
}

module.exports = new HttpCache();
