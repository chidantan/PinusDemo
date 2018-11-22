import { pinus } from 'pinus';
import { preload } from './preload';
import { createConnection, Connection } from "typeorm";
import * as redis from 'redis';
import * as path from 'path';
import * as fs from 'fs';
import { ClientOpts } from 'redis';
/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
var app = pinus.createApp();
app.set('name', 'test');

// var client = redis.createClient(6379, "localhost", {});
// var client = redis.createClient();

//配置数据库
app.configure('production|development', 'connector|communicate', function () {
  createConnection()
    .then(function (connection: Connection) {
      console.log("配置DB成功 " + app.curServer.id);
      app.set('dbclient', connection);
      // app.set("redis", client); // app访问接口 
    });
});


// app configuration
app.configure('production|development', 'connector', function () {
  app.set('connectorConfig',
    {
      connector: pinus.connectors.hybridconnector,
      heartbeat: 20,
      useDict: true,
      useProtobuf: true
    });
});

app.configure('production|development', 'gate', function () {


  app.set('connectorConfig',
    {
      connector: pinus.connectors.hybridconnector,
      useProtobuf: true
    });

});

app.configure('production|development', 'communicate', function () {
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});

function configRedis() {
  try {
    var cfgPath = path.resolve("config/redisconfig.json");
    var cfgContent: string = fs.readFileSync(cfgPath, { encoding: 'utf8' });
  } catch (err) {
    console.error('load config data errror, url is ' + cfgPath + ". error is " + err);
  }
  if (cfgContent) {
    var redisClient = redis.createClient(<ClientOpts>JSON.parse(cfgContent));
    app.set('redisClient', redisClient);

  }

}