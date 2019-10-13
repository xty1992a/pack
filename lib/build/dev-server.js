const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const portfinder = require("portfinder");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const fs = require("fs");
const path = require("path");

const workspace = process.cwd();

module.exports = config => new Promise(async (resolve, reject) => {
  portfinder.basePort = config.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) return reject(err);
    try {
      config.devServer.port = port;
      config.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.devServer.host}:${port}`],
        },
      }));

      config.devServer.before = function (app) {
        app.get("*", beforeHanlder(config));
      };

      const compiler = webpack(config);

      const devServerOptions = Object.assign({}, config.devServer, {
        open: true,
        stats: {
          colors: true,
        },
      });
      const server = new webpackDevServer(compiler, devServerOptions);

      server.listen(port, "127.0.0.1", () => {
        console.log(`Starting server on http://${config.devServer.host}:${port}`);
      });

      resolve(server);
    } catch (e) {
      reject(e);
    }
  });

});

function beforeHanlder(config) {
  const entries = Object.keys(config.entry);
  const regs = entries.map(key => new RegExp(key, "i"));

  const hit = url => regs.some(reg => reg.test(url));

  return function (req, res, next) {
    if (req.originalUrl === "" || req.originalUrl === "/") {
      res.send(entries.map(key => `<a href="/${key}">${key}</a>`).join(""));
      return;
    }

    if (hit(req.originalUrl)) {
      if (!/\.js/.test(req.originalUrl)) {
        fs.readFile(path.join(workspace, "index.html"), "utf-8", function (err, data) {
          if (err) {
            return res.status(500).end("server error with code 500");
          }
          return res.send(data.replace("<!-- script inject here -->", `<script type="text/javascript" src=".${req.originalUrl.toLowerCase()}.js"></script>`));
        });
      } else {
        next();
      }
    } else {
      next();
    }
  };

}
