// Original file: proto/hello-world.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { HelloReply as _HelloReply, HelloReply__Output as _HelloReply__Output } from './HelloReply';
import type { HelloRequest as _HelloRequest, HelloRequest__Output as _HelloRequest__Output } from './HelloRequest';

export interface GreeterClient extends grpc.Client {
  sayHello(argument: _HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _HelloRequest, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  
  sayHelloAgain(argument: _HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHelloAgain(argument: _HelloRequest, callback: grpc.requestCallback<_HelloReply__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<_HelloRequest__Output, _HelloReply>;
  
  sayHelloAgain: grpc.handleUnaryCall<_HelloRequest__Output, _HelloReply>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  sayHello: MethodDefinition<_HelloRequest, _HelloReply, _HelloRequest__Output, _HelloReply__Output>
  sayHelloAgain: MethodDefinition<_HelloRequest, _HelloReply, _HelloRequest__Output, _HelloReply__Output>
}
