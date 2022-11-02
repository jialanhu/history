package grpcserver

import (
	"flag"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
)

var (
	port      = flag.Int("port", 50051, "The server port")
	RpcServer *grpc.Server
)

type Server struct {
	server *grpc.Server
	notify chan error
}

func New() *Server {
	flag.Parse()
	RpcServer = grpc.NewServer()
	s := &Server{
		server: RpcServer,
		notify: make(chan error, 1),
	}
	go s.start()
	return s
}

func (s *Server) start() {
	defer close(s.notify)
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s.notify <- s.server.Serve(lis)
}

func (s *Server) Notify() <-chan error {
	return s.notify
}
