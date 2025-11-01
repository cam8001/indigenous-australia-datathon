#!/bin/bash

echo "Building React app..."
cd ../health-team-project
npm run build

echo "Deploying CDK stack..."
cd ../health-app-deployment
npx cdk bootstrap --region ap-southeast-2
npx cdk deploy --region ap-southeast-2

echo "Creating CloudFront invalidation..."
DISTRIBUTION_ID=$(aws cloudformation describe-stacks --stack-name HealthAppDeploymentStack --region ap-southeast-2 --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" --output text)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --region ap-southeast-2 --no-cli-pager

echo "Deployment complete!"
