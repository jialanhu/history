import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./types/proto/hello-world";
import path = require("path");

export function main() {
  const helloProto = grpc.loadPackageDefinition(
    protoLoader.loadSync(path.join(__dirname, "../proto/hello-world.proto"))
  ) as unknown as ProtoGrpcType;

  const client = new helloProto.Greeter('localhost:50051',
    grpc.credentials.createInsecure());
  client.sayHello({name: 'you'}, function(err, response) {
    console.log('Greeting sayHello:', response.message);
  });
  client.sayHelloAgain({name: 'you'}, function(err, response) {
    console.log('Greeting sayHelloAgain:', response.message);
  });
}
