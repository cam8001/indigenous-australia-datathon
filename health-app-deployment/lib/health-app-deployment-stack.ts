import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class HealthAppDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for hosting the React app
    const websiteBucket = new s3.Bucket(this, 'HealthAppBucket', {
      bucketName: `health-app-${this.account}-${this.region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Origin Access Control for CloudFront
    const oac = new cloudfront.S3OriginAccessControl(this, 'HealthAppOAC', {
      description: 'OAC for Health App S3 bucket',
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'HealthAppDistribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket, {
          originAccessControl: oac,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      domainNames: ['ccda.quest'],
      certificate: certificatemanager.Certificate.fromCertificateArn(
        this,
        'HealthAppCertificate',
        '***REMOVED***'
      ),
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    // Deploy the built React app to S3
    new s3deploy.BucketDeployment(this, 'HealthAppDeployment', {
      sources: [s3deploy.Source.asset('../health-team-project/dist')],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ['/*'],
      prune: true,
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'DistributionUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Health App URL',
    });
  }
}
