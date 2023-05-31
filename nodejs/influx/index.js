"use strict";
// https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/nodejs/
import { InfluxDB, Point } from "@influxdata/influxdb-client";

/** Environment variables **/
const url = "http://localhost:8086";
const token =
  "cwXmMd95WtP8q_RQWov_bUlKi8cXSRmCxrcgGV6SERLIoYv8gqa28hJ6jgukauqMhGJwNAGek9fuWlBPSU2QBw==";
const org = "my-org";
const bucket = "my-bucket";

(async () => {
  const influxDB = new InfluxDB({ url, token });
  const writeApi = influxDB.getWriteApi(org, bucket);
  const queryApi = influxDB.getQueryApi(org);

  /**
   * Apply default tags to all points.
   **/
  writeApi.useDefaultTags({ region: "west" });
  /**
   * Create a point and write it to the buffer.
   **/
  const point1 = new Point("temperature")
    .tag("sensor_id", "TLM01")
    .tag("location", "Guangzhou")
    .floatField("value", 34.0);
  writeApi.writePoint(point1);

  await writeApi.flush(true);

  /** To avoid SQL injection, use a string literal for the query. */
  const fluxQuery = `from(bucket:"${bucket}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")`;
  for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
    const o = tableMeta.toObject(values);
    console.log(JSON.stringify(o));
    console.log(
      `${o._time} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`
    );
  }
})();
