package main

import (
  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
)

func Handler(event *events.LambdaFunctionURLRequest) (events.LambdaFunctionURLResponse, error) {
  response := events.LambdaFunctionURLResponse{Body: "Hello, world!", StatusCode: 200}
  return response, nil
}

func main() {
  lambda.Start(Handler)
}
