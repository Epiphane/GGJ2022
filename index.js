const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

import ReactDOM from "react-dom";
import { App } from "./App"

const basedir = __dirname;
var start = Date.now();

if (fs.writeFileSync) {
  fs.writeFileSync('./version.js', `var require = { urlArgs: "v=${start}" };`);
}

function serveStatResult(res, path, err) {
  if (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.write("Not Found");
      res.end();
    } else {
      res.statusCode = 500;
      res.write(err.message);
      res.end();
    }
  } else {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.write(err.message);
        res.end();
      } else {
        if (path.indexOf(".js") >= 0) {
          res.setHeader("Content-Type", "text/javascript");
        }

        res.write(data);
        res.end();
      }
    });
  }
}

const server = http
  .createServer(function (req, res) {
    if (req.url === "/time") {
      res.write(JSON.stringify({ start }));
      res.end();
      return;
    }

    // req.url = req.url.substring(0, req.url.indexOf('?'));
    if (req.url.indexOf('?') >= 0) {
      req.url = req.url.substring(0, req.url.indexOf('?'));
    }
    const path = (basedir + req.url).replace("%20", " ");
    fs.stat(path, (err, stat) => {
      if (!err && stat.isDirectory()) {
        const subpath = path + "index.html";
        fs.stat(subpath, (err) => serveStatResult(res, subpath, err));
        return;
      }
      else if (!err) {
        serveStatResult(res, path, err);
        return;
      }

      const distPath = (basedir + '/dist' + req.url).replace("%20", " ");
      fs.stat(distPath, (err, stat) => {
        if (!err && stat.isDirectory()) {
          const subpath = distPath + "index.html";
          fs.stat(subpath, (err) => serveStatResult(res, subpath, err));
        } else {
          serveStatResult(res, distPath, err);
        }
      });
    });
  });

const wss = new WebSocket.Server({
  port: 8081
});

server && server.listen(8080);

ReactDOM.render(<App />, document.getElementById('root'));

