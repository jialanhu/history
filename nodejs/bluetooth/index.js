// Read the battery level of the first found peripheral exposing the Battery Level characteristic

const noble = require("@abandonware/noble");

const serviceUUID = "ff00";
const characteristicUUID = "ff01";

noble.on("stateChange", async (state) => {
  if (state === "poweredOn") {
    // advertised service uuid
    await noble.startScanningAsync([serviceUUID], false);
  }
});

noble.on("discover", async (peripheral) => {
  console.log(`${peripheral.address} (${peripheral.advertisement.localName})`);
  await noble.stopScanningAsync();
  await peripheral.connectAsync();
  const { characteristics } =
    await peripheral.discoverSomeServicesAndCharacteristicsAsync(
      [serviceUUID],
      [characteristicUUID]
    );
  await characteristics[0].subscribeAsync();
  characteristics[0].on("read", (buffer) => {
    // do something
  });
});
