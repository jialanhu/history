import { Client } from "aedes:client";
import { MqttError } from "./mqttError";

const logger = {
  log: (...args) => console.log(...args),
  error: (...args) => console.error(...args),
};
export function mqttClientError(client: Client, error: MqttError) {
  logger.error(`mqttClientError ${error.message}`);
}

export function mqttConnectionError(client: Client, error: MqttError) {
  logger.error(`mqttConnectionError ${error.message}`);
}

export function mqttClientReady(client: Client) {
  logger.log(`mqttClientReady clientId: ${client.id}`);
}
