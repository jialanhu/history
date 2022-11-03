package grpcclient

import (
	"context"
	"fmt"
	_ "grpc/proto/errdetail" // install proto
	"grpc/proto/helloworld"
	"io"
	"log"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (c *Client) CallSayHello(name string) {
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
	defer c.wg.Done()
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeout)*time.Millisecond)
	defer cancel()
	_, err := c.client.HelloDeadline(ctx, &helloworld.Empty{})
	got := status.Code(err)
	log.Printf("[%v] wanted = %v, got = %v\n", name, want, got)
}

func (c *Client) CallHelloError(name string) {
	defer c.wg.Done()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	_, err := c.client.HelloError(ctx, &helloworld.HelloRequest{Name: name})
	if err != nil {
		log.Printf("hello error %s", err)
		e := status.Convert(err)
		for _, d := range e.Details() {
			log.Printf("error detail d: %s", d)
		}
	}
}

func (c *Client) CallHelloStream(name string) {
	defer c.wg.Done()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	s, err := c.client.HelloStream(ctx)
	if err != nil {
		log.Printf("hello stream error %s", err)
	}
	go func() {
		for i := 0; i < 100; i++ {
			time.Sleep(time.Duration(100) * time.Millisecond)
			if err := s.Send(&helloworld.HelloRequest{Name: fmt.Sprintf("Request name: %v count: %d", name, i+1)}); err != nil {
				log.Fatalf("failed to send request due to error: %v", err)
			}
		}
		s.CloseSend()
	}()

	for {
		resp, err := s.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatalf("failed to receive response due to error: %v", err)
		}
		log.Println("resp message: ", resp.Message)
	}
}
