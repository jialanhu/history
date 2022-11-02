package grpcclient

import (
	"flag"
	"grpc/proto/helloworld"
	"log"
	"sync"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/encoding/gzip"
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
	conn, err := grpc.Dial(
		*addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithDefaultCallOptions(grpc.UseCompressor(gzip.Name)), // 对客户端发送的所有rpc请求使用压缩
	)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	greeterClient := helloworld.NewGreeterClient(conn)
	c := &Client{client: greeterClient, conn: conn}
	return c
}

func (c *Client) Wait() {
	defer c.conn.Close()
	c.wg.Wait()
}
