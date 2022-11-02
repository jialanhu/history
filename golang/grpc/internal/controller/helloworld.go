package controller

import (
	"context"
	"grpc/internal/grpcserver"
	"grpc/proto/helloworld"
	"log"
)

type server struct {
	helloworld.UnimplementedGreeterServer
}

func Register() {
	helloworld.RegisterGreeterServer(grpcserver.RpcServer, &server{})
}

func (s *server) SayHello(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &helloworld.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func (s *server) SayHelloAgain(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.HelloReply, error) {
	log.Printf("Received: %v again", in.GetName())
	return &helloworld.HelloReply{Message: "Hello again " + in.GetName()}, nil
}
