import * as net from "net";
import { mqttAuthenticate, mqttPreConnect } from "./mqtt/mqttHandle";
import { mqttClientError, mqttClientReady, mqttConnectionError } from "./mqtt/mqttEvent";

const redisConfig = {
  port: 6379,
  host: "localhost",
  password: "123456",
  db: 0,
}

const aedes = require("aedes")({
  mq: require("mqemitter-redis")(redisConfig),
  persistence: require("aedes-persistence-redis")({
    ...redisConfig,
    maxSessionDelivery: 100, // maximum offline messages deliverable on client CONNECT, default is 1000
    packetTTL: function (packet) { // offline message TTL, default is disabled
      return 3600 //seconds
    }
  })
});
const mqttServer = net.createServer(aedes.handle);
mqttServer.listen(1883);

aedes.preConnect = mqttPreConnect;
aedes.authenticate = mqttAuthenticate;

aedes.on("connectionError", mqttConnectionError);
aedes.on("clientError", mqttClientError);
aedes.on("clientReady", mqttClientReady);
