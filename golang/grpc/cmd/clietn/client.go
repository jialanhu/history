package main

import (
	"flag"
	"grpc/internal/grpcclient"

	"google.golang.org/grpc/codes"
)

var (
	name = flag.String("name", "world", "name to greet")
)

func main() {
	flag.Parse()
	c := grpcclient.New()

	go c.CallSayHello(*name)
	go c.CallSayHelloAgain(*name)

	go c.CallHelloDeadline(2990, "one", codes.DeadlineExceeded)
	go c.CallHelloDeadline(3000, "two", codes.DeadlineExceeded)
	go c.CallHelloDeadline(3001, "three", codes.OK)

	c.Wait()
}
