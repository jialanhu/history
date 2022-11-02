package grpcclient

import (
	"context"
	"grpc/proto/helloworld"
	"log"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (c *Client) CallSayHello(name string) {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.client.SayHello(ctx, &helloworld.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())
}

func (c *Client) CallSayHelloAgain(name string) {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.client.SayHelloAgain(
		ctx, &helloworld.HelloRequest{Name: name},
		// grpc.UseCompressor(gzip.Name), // 单个请求使用压缩
	)
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting again: %s", r.GetMessage())
}

func (c *Client) CallHelloDeadline(timeout uint16, name string, want codes.Code) {
	c.wg.Add(1)
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Millisecond)
	defer cancel()

	_, err := c.client.HelloDeadline(ctx, &helloworld.HelloRequest{Name: name})
	got := status.Code(err)
	log.Printf("[%v] wanted = %v, got = %v\n", name, want, got)
}
