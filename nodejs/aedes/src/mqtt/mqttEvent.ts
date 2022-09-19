const logger = {
  log: (...args) => console.log(...args),
  error: (...args) => console.error(...args),
}
export function mqttClientError(client, error) {
  logger.error(`mqttClientError ${error.message}`);
}

export function mqttConnectionError(client, error) {
  logger.error(`mqttConnectionError ${error.message}`);
}

export function mqttClientReady(client) {
  logger.log(`mqttClientReady clientId: ${client.id}`);
}
