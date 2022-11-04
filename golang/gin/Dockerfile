FROM golang:1.19-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go env -w GOPROXY=https://goproxy.cn && go mod download

COPY . /app

RUN go build -o exec /app/cmd

CMD [ "/app/exec" ]