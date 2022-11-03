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
	addr  = flag.String("addr", "localhost:50051", "the address to connect to")
	addrs = []string{"localhost:50051", "localhost:50052", "localhost:50053"}

	/**
		loadBalancingConfig 负载均衡配置

		methodConfig.name [{service: 对应的prc服务}] proto文件中的service
		retryPolicy 自动重试配置
			MaxAttempts  			尝试请求次数 默认尝试为5, 最小为1
			InitialBackoff 		初始退避延迟
			MaxBackoff 				最大退避延迟
			BackoffMultiplier	退避乘数
				每次调用失败之后, 将会介于0和当前退避值之间随机延迟确定何时进行下一次重试
				每次尝试之后，退避值将会乘以 BackoffMultiplier
			RetryableStatusCodes	状态代码合计，具有匹配状态失败的gRPC调用将自动重试

	**/
	cfg = `{
		"loadBalancingConfig": [{"round_robin":{}}],
		"methodConfig": [{
		  "name": [{"service": "helloworld.Greeter"}],
		  "waitForReady": true,
		  "retryPolicy": {
			  "MaxAttempts": 4,
			  "InitialBackoff": ".01s",
			  "MaxBackoff": ".01s",
			  "BackoffMultiplier": 1.0,
			  "RetryableStatusCodes": [ "UNAVAILABLE" ]
		  }
		}]}`
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
		grpc.WithDefaultServiceConfig(cfg),
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
