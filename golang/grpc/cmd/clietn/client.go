package main

import (
	"context"
	"flag"
	"grpc/proto/helloworld"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/encoding/gzip"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
	name = flag.String("name", "world", "name to greet")
)

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
	c := helloworld.NewGreeterClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SayHello(ctx, &helloworld.HelloRequest{Name: *name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())

	r, err = c.SayHelloAgain(
		ctx, &helloworld.HelloRequest{Name: *name},
		// grpc.UseCompressor(gzip.Name), // 单个请求使用压缩
	)
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting again: %s", r.GetMessage())
}
