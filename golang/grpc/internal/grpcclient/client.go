package grpcclient

import (
	"crypto/tls"
	"crypto/x509"
	"flag"
	"fmt"
	"grpc/data"
	"grpc/proto/helloworld"
	"log"
	"os"
	"sync"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/keepalive"
)

var (
	// addr  = flag.String("addr", "localhost:50051", "the address to connect to")
	addrs = []string{"localhost:50051", "localhost:50052", "localhost:50053"}
)

var kacp = keepalive.ClientParameters{
	Time:                10 * time.Second, // 默认无穷  如果没有活动时发送ping的间隔
	Timeout:             time.Second,      // 默认20秒  等待ping ack包的超时时间
	PermitWithoutStream: true,             // 默认false 是否允许在没有活动的RPC流时发送 ping
}

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
		//*addr,
		fmt.Sprintf("%s:///%s", helloScheme, helloServiceName),
		grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)),
		grpc.WithKeepaliveParams(kacp),
		grpc.WithUnaryInterceptor(unaryInterceptor),   // 客户端一元拦截器
		grpc.WithStreamInterceptor(streamInterceptor), // 客户端流式拦截器
		// grpc.WithDefaultCallOptions(grpc.UseCompressor(gzip.Name)), // 对客户端发送的所有rpc请求使用压缩
		grpc.WithDefaultServiceConfig(`{"loadBalancingConfig": [{"round_robin":{}}]}`), // 初始化均衡器策略
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

func (c *Client) Add(n int) {
	c.wg.Add(n)
}
