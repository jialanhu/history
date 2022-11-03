package grpcclient

import "google.golang.org/grpc/resolver"

const (
	helloScheme      = "hello"
	helloServiceName = "localhost"
)

type helloResolverBuilder struct{}

func (*helloResolverBuilder) Build(target resolver.Target, cc resolver.ClientConn, opts resolver.BuildOptions) (resolver.Resolver, error) {
	r := &helloResolver{
		target: target,
		cc:     cc,
		addrsStore: map[string][]string{
			"localhost": addrs,
		},
	}
	r.start()
	return r, nil
}
func (*helloResolverBuilder) Scheme() string { return helloScheme }

type helloResolver struct {
	target     resolver.Target
	cc         resolver.ClientConn
	addrsStore map[string][]string
}

func (r *helloResolver) start() {
	addrStrs := r.addrsStore[r.target.Endpoint]
	addrs := make([]resolver.Address, len(addrStrs))
	for i, s := range addrStrs {
		addrs[i] = resolver.Address{Addr: s}
	}
	r.cc.UpdateState(resolver.State{Addresses: addrs})
}
func (*helloResolver) ResolveNow(o resolver.ResolveNowOptions) {}
func (*helloResolver) Close()                                  {}

func init() {
	resolver.Register(&helloResolverBuilder{})
}
