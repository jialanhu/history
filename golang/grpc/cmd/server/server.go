package main

import (
	"grpc/internal/controller"
	"grpc/internal/grpcserver"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	s := grpcserver.New()
	controller.Register()

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)
	select {

	case sign := <-interrupt:
		log.Printf("app - Run - signal: " + sign.String())
	case err := <-s.Notify():
		log.Fatalf("app - Run - grpcServer.Notify: %w", err)
	}
}
