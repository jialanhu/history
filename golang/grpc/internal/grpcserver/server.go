package grpcserver

import (
	"crypto/tls"
	"crypto/x509"
	"flag"
	"fmt"
	"grpc/data"
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
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

	// 使用mTSL
	cert, err := tls.LoadX509KeyPair(data.Path("x509/server_cert.pem"), data.Path("x509/server_key.pem"))
	if err != nil {
		log.Fatalf("failed to load key pair: %s", err)
	}
	ca := x509.NewCertPool()
	// 需要使用客户端 CA 证书验证
	caFilePath := data.Path("x509/client_ca_cert.pem")
	caBytes, err := os.ReadFile(caFilePath)
	if err != nil {
		log.Fatalf("failed to read ca cert %q: %v", caFilePath, err)
	}
	if ok := ca.AppendCertsFromPEM(caBytes); !ok {
		log.Fatalf("failed to parse %q", caFilePath)
	}
	tlsConfig := &tls.Config{
		ClientAuth:   tls.RequireAndVerifyClientCert,
		Certificates: []tls.Certificate{cert},
		ClientCAs:    ca,
	}
	RpcServer = grpc.NewServer(
		grpc.Creds(credentials.NewTLS(tlsConfig)),
		grpc.UnaryInterceptor(unaryInterceptor),   // 一元拦截器
		grpc.StreamInterceptor(streamInterceptor), // 流式拦截器
	)
	//RpcServer = grpc.NewServer()
	s := &Server{
		server: RpcServer,
		notify: make(chan error, 1),
	}
	go s.start()
	return s
}

func (s *Server) start() {
	defer close(s.notify)
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s.notify <- s.server.Serve(lis)
}

func (s *Server) Notify() <-chan error {
	return s.notify
}
