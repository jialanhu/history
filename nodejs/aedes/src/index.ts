
import * as net from "net";
import { mqttAuthenticate, mqttPreConnect } from "./mqtt/mqttHandle";
import { mqttClientError, mqttClientReady, mqttConnectionError } from "./mqtt/mqttEvent";

const aedes = require("aedes")();
const mqttServer = net.createServer(aedes.handle);
mqttServer.listen(1883);

aedes.preConnect = mqttPreConnect;
aedes.authenticate = mqttAuthenticate;

aedes.on("connectionError", mqttConnectionError);
aedes.on("clientError", mqttClientError);
aedes.on("clientReady", mqttClientReady);
