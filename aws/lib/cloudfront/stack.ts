import type * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import { Duration, Stack, type StackProps } from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import type { IBucket } from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

interface CloudFrontProps extends StackProps {
	staticBucket: IBucket;
    originAccess : cloudfront.OriginAccessIdentity
}

export class CloudFrontStack extends Stack {
	constructor(scope: Construct, id: string, props: CloudFrontProps) {
		super(scope, id, props);

		new cloudfront.Distribution(this, "Distribution", {
			defaultRootObject: "index.html",
			defaultBehavior: {
				origin: new origins.S3Origin(props.staticBucket, {
					originAccessIdentity : props.originAccess
				}),
			},
		});
	}
}
