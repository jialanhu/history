package grpcclient

import (
	"crypto/tls"
	"crypto/x509"
	"flag"
	"grpc/data"
	"grpc/proto/helloworld"
	"log"
	"os"
	"sync"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
)

type Client struct {
	client helloworld.GreeterClient
	conn   *grpc.ClientConn
	wg     sync.WaitGroup
}

func New() *Client {
	flag.Parse()
	cert, err := tls.LoadX509KeyPair(data.Path("x509/client_cert.pem"), data.Path("x509/client_key.pem"))
	if err != nil {
		log.Fatalf("failed to load client cert: %v", err)
	}

	ca := x509.NewCertPool()
	caFilePath := data.Path("x509/ca_cert.pem")
	caBytes, err := os.ReadFile(caFilePath)
	if err != nil {
		log.Fatalf("failed to read ca cert %q: %v", caFilePath, err)
	}
	if ok := ca.AppendCertsFromPEM(caBytes); !ok {
		log.Fatalf("failed to parse %q", caFilePath)
	}

	tlsConfig := &tls.Config{
		ServerName:   "localhost",
		Certificates: []tls.Certificate{cert},
		RootCAs:      ca,
	}
	conn, err := grpc.Dial(
		*addr,
		grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)),
		grpc.WithUnaryInterceptor(unaryInterceptor),   // 客户端一元拦截器
		grpc.WithStreamInterceptor(streamInterceptor), // 客户端流式拦截器
		// grpc.WithDefaultCallOptions(grpc.UseCompressor(gzip.Name)), // 对客户端发送的所有rpc请求使用压缩
	)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	greeterClient := helloworld.NewGreeterClient(conn)
	c := &Client{client: greeterClient, conn: conn}
	return c
}

func (c *Client) Wait(n int) {
	c.wg.Add(n)
	defer c.conn.Close()
	c.wg.Wait()
}
