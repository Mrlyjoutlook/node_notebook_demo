# demo

> koa，typescript 服务端开发案例

## example

### json-web-token

[详解]()

```bash
yarn run jwt
#or
npm run jwt
```

### csrf

[详解]()

```bash
yarn run csrf
#or
npm run csrf
```

### http cache

[详解]()

```bash
yarn run httpCache
#or
npm run httpCache
```

## debug

```bash
# 在package.json 中 script 命令上添加 --inspect
"scripts": {
  ...
  "csrf": "tsc && DEBUG=watcher nodemon --inspect ./bin/index.js csrf"
  ...
},
```

使用`Chrome DevTools`即可愉快 debug 了
