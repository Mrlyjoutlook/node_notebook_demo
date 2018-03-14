const watcher = require('./watch');
const compiler = require('./compile');

if (process.argv) {
  const path = '../app/' + process.argv[2];
  const App = require(path);

  /**
   * development
   */
  const app = new App({
    ROOT_PATH: __dirname,
    watcher,
    compiler,
    env: 'development',
    prot: 3000
  });

  app.run();
} else {
  process.exit(1);
}
