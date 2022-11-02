package grpcserver

import (
	"flag"
	"fmt"
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	_ "google.golang.org/grpc/encoding/gzip" // Install the gzip compressor
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
	grpcLogVerbosityLevel := os.Getenv("GRPC_GO_LOG_VERBOSITY_LEVEL")
	grpcLogSeverityLevel := os.Getenv("GRPC_GO_LOG_SEVERITY_LEVEL")
	if grpcLogSeverityLevel == "info" && grpcLogVerbosityLevel == "99" {
		log.Println("Grpc Debugging is Started")
	}
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
