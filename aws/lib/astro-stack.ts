import { Stack } from "aws-cdk-lib";
import type { StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";

import { BucketStack } from "./bucket/stack";
import { CloudFrontStack } from "./cloudfront/stack";

export interface RemixSiteProps extends StackProps {}

export class AstroStack extends Stack {
	constructor(scope: Construct, id: string, props?: RemixSiteProps) {
		super(scope, id, props);

		const { staticBucket, originAccess } = new BucketStack(this, "astroStaticResources", {});

		new CloudFrontStack(this, "astroCloudfrontStack", {
			staticBucket,
      originAccess
		});
	}
}
