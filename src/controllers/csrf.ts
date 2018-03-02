class Csrf {
  async index(ctx: any) {
    if (ctx.method === 'GET') {
      await ctx.render('csrf', {
        title: 'web safe csrf',
        csrf: ctx.csrf
      });
    }
  }

  async register(ctx: any) {
    const { body } = ctx.request;
    try {
      ctx.body = 'success!';
    } catch (error) {
      ctx.throw(500);
    }
  }
}

module.exports = new Csrf();
