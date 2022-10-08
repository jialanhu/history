import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import { ProtoGrpcType } from "./types/proto/hello-world";
import { GreeterHandlers } from "./types/proto/Greeter";
import path = require("path");

function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}

function sayHelloAgain(call, callback) {
  callback(null, { message: "Hello again, " + call.request.name });
}

const greeterServer: GreeterHandlers = {
  sayHello,
  sayHelloAgain,
};

export function main() {
  const helloProto = grpc.loadPackageDefinition(
    protoLoader.loadSync(path.join(__dirname, "../proto/hello-world.proto"))
  ) as unknown as ProtoGrpcType;

  const server = new grpc.Server();
  server.addService(helloProto.Greeter.service, greeterServer);
  server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
