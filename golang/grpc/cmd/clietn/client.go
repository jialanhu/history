package main

import (
	"context"
	"flag"
	"grpc/proto/helloworld"
	"log"
	"sync"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/encoding/gzip"
	"google.golang.org/grpc/status"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
	name = flag.String("name", "world", "name to greet")
)

type Client struct {
	client helloworld.GreeterClient
	wg     sync.WaitGroup
}

func main() {
	flag.Parse()

	conn, err := grpc.Dial(
		*addr,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithDefaultCallOptions(grpc.UseCompressor(gzip.Name)), // 对客户端发送的所有rpc请求使用压缩
	)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	greeterClient := helloworld.NewGreeterClient(conn)
	c := &Client{client: greeterClient}

	go c.callSayHello()
	go c.callSayHelloAgain()

	go c.onceCallHelloDeadline(2990, "one", codes.DeadlineExceeded)
	go c.onceCallHelloDeadline(3000, "two", codes.DeadlineExceeded)
	go c.onceCallHelloDeadline(3001, "three", codes.OK)

	c.wg.Wait()
}

func (c *Client) callSayHello() {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.client.SayHello(ctx, &helloworld.HelloRequest{Name: *name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())
}

func (c *Client) callSayHelloAgain() {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.client.SayHelloAgain(
		ctx, &helloworld.HelloRequest{Name: *name},
		// grpc.UseCompressor(gzip.Name), // 单个请求使用压缩
	)
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting again: %s", r.GetMessage())
}

func (c *Client) onceCallHelloDeadline(timeout uint16, name string, want codes.Code) {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Millisecond)
	defer cancel()

	_, err := c.client.HelloDeadline(ctx, &helloworld.HelloRequest{Name: name})
	got := status.Code(err)
	log.Printf("[%v] wanted = %v, got = %v\n", name, want, got)
}
