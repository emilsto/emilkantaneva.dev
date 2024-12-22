import * as cdk from "aws-cdk-lib";
import { AstroStack } from "../lib/astro-stack";

const app = new cdk.App();

new AstroStack(app, "astroStaticSiteStack", {});
