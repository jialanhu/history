package controller

import (
	"context"
	"grpc/internal/grpcserver"
	"grpc/proto/errdetail"
	"grpc/proto/helloworld"
	"log"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

func (s *server) HelloDeadline(ctx context.Context, in *helloworld.Empty) (*helloworld.Empty, error) {
	log.Printf("Received Deadline")
	time.Sleep(3 * time.Second)
	return &helloworld.Empty{}, nil
}

func (s *server) HelloError(ctx context.Context, in *helloworld.HelloRequest) (*helloworld.Empty, error) {
	log.Printf("Received HelloError")
	name := in.GetName()
	if name != "world" {
		st := status.New(codes.InvalidArgument, "The name can only be world")
		sd, err := st.WithDetails(&errdetail.BadRequest_FieldViolation{
			Field:       "name",
			Description: "The name can only be world.",
		})
		if err == nil {
			return nil, sd.Err()
		}
		return nil, st.Err()
	}
	return &helloworld.Empty{}, nil
}
