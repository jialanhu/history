const sensor = require("node-dht-sensor").promises;

const SensorType = 11;
const SensorPin = 4;

async function main() {
  const { temperature, humidity } = await sensor.read(SensorType, SensorPin);
}