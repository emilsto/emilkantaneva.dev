import * as path from "path"
import { Stack, type StackProps } from "aws-cdk-lib";
import { OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import { BucketAccessControl } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";


interface IBucketProps extends StackProps {}

export class BucketStack extends Stack {
  public readonly staticBucket: s3.Bucket;
  public readonly originAccess: OriginAccessIdentity;

  constructor(scope: Construct, id: string, props: IBucketProps) {
    super(scope, id, props);

    this.staticBucket = new s3.Bucket(this, "astroDeployBucket", {
      accessControl: BucketAccessControl.PRIVATE,
    });

    new BucketDeployment(this, "BucketDeployment", {
      destinationBucket: this.staticBucket,
      sources: [Source.asset(path.resolve(__dirname, "../../../app/dist"))],
    });

    this.originAccess = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity",
    );
    this.staticBucket.grantRead(this.originAccess);

  }
}
