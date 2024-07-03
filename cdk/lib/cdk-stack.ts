import {CfnOutput, Duration, Stack, StackProps} from 'aws-cdk-lib';
import { Code, Function, FunctionUrlAuthType, Handler, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path = require('path');

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const demoLambda = new Function(this, 'LambdaFunction', {
      functionName: 'GoFunction',
      runtime: Runtime.FROM_IMAGE,
      code: Code.fromAssetImage(path.join(__dirname, '..', '..', 'lambda'), {
        assetName: 'go-lambda',
      }),
      handler: Handler.FROM_IMAGE,
    });

    const lambdaFunctionUrl = demoLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['Authorization'],
        allowedMethods: [
          HttpMethod.ALL,
          // HttpMethod.GET,
          // HttpMethod.HEAD,
          // HttpMethod.OPTIONS,
          // HttpMethod.POST,
          // HttpMethod.DELETE,
          // HttpMethod.PUT,
          // HttpMethod.PATCH,
        ],
        maxAge: Duration.days(1),
      }
    });

    new CfnOutput(this, 'LambdaUrl', {
      value: lambdaFunctionUrl.url
    });
  }
}
