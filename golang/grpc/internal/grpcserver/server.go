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
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	_ "google.golang.org/grpc/encoding/gzip" // Install the gzip compressor
	"google.golang.org/grpc/keepalive"
)

var (
	port      = flag.Int("port", 50051, "The server port")
	RpcServer *grpc.Server
)

var kaep = keepalive.EnforcementPolicy{
	MinTime:             5 * time.Second, // 默认5分钟 ping允许的最短间隔时间, 若低于此间隔则结束此连接
	PermitWithoutStream: true,            // 默认false 是否允许在没有活动的RPC流时发送 ping
}

var kasp = keepalive.ServerParameters{
	MaxConnectionIdle:     15 * time.Second, // 默认无穷  任何客户端空闲时间超过此值, 则发送超时
	MaxConnectionAge:      30 * time.Second, // 默认无穷  任何活动连接超过此时间, 则发送超时
	MaxConnectionAgeGrace: 5 * time.Second,  // 默认无穷  是 MaxConnectionAge 的一个附加周期, 此事件之后连接将被关闭
	Time:                  5 * time.Second,  // 默认2小时 客户端空闲时间超过此值, 则ping客户端, 以确保连接时活动的
	Timeout:               1 * time.Second,  // 默认20秒  等待ping ack包的超时时间
}

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
		grpc.KeepaliveEnforcementPolicy(kaep),
		grpc.KeepaliveParams(kasp),
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
