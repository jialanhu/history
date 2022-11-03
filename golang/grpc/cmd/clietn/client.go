package main

import (
	"flag"
	"grpc/internal/grpcclient"
	"time"
)

var (
	name = flag.String("name", "world", "name to greet")
)

func main() {
	flag.Parse()
	c := grpcclient.New()
	time.Sleep(time.Second) // 用于让 balancing 多个连接都连上

	// go c.CallSayHello(*name)
	// go c.CallSayHelloAgain(*name)

	// go c.CallHelloDeadline(2990, "one", codes.DeadlineExceeded)
	// go c.CallHelloDeadline(3000, "two", codes.DeadlineExceeded)
	// go c.CallHelloDeadline(3001, "three", codes.OK)

	// go c.CallHelloError(*name)

	// go c.CallHelloStream(*name)
	// for i := 0; i < 10; i++ {
	// 	c.CallHelloBalancing()
	// }

	c.CallHelloRetry()
	select {}
}
