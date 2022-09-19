//|----------------------------
//|MQTT Client Error Codes
//|----------------------------
//| Error Code | Meaning
//|------------+---------------
//|          0 | No Error
//|          1 | Connection Refused: Unacceptable protocol version
//|         10 | Timeout waiting for SUBACK
//|         11 | Timeout waiting for UNSUBACK
//|         12 | Timeout waiting for PINGRESP
//|         13 | Malformed Remaining Length
//|         14 | Problem with the underlying communication port
//|         15 | Address could not be parsed
//|         16 | Malformed received MQTT packet
//|         17 | Subscription failure
//|         18 | Payload decoding failure
//|         19 | Failed to compile a Decoder
//|          2 | Connection Refused: Identifier rejected
//|         20 | The received MQTT packet type is not supported on this client
//|          3 | Connection Refused: Server Unavailable
//|          4 | Connection Refused: Bad username or password
//|          5 | Connection Refused: Authorization error
//|          6 | Connection lost or bad
//|          7 | Timeout waiting for Length bytes
//|          8 | Timeout waiting for Payload
//|          9 | Timeout waiting for CONNACK
//
export class MqttError extends Error {
  public returnCode: number;
  constructor(defines: MqttErrorParam, ...args) {
    let message = defines.message;
    args.forEach((arg) => (message = message.replace("%s", arg)));
    super(message);
  }
}

type MqttErrorParam = {
  returnCode: number;
  message: string;
};

export const MqttErrorDefines: { [key: string]: MqttErrorParam } = {
  IP_BLACKLIST: { returnCode: 2, message: "IP %s in blacklist " },
  BAD_USERNAME_OR_PASSWORD: { returnCode: 4, message: "Bad username: %s password: %s" },
};
