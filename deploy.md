# Deployment Instructions

## Prerequisites
- AWS CLI configured with valid credentials
- Node.js and npm installed
- CDK CLI installed (`npm install -g aws-cdk`)

## Deploy to AWS

1. **Refresh AWS credentials** (if expired)
   ```bash
   aws configure
   # or refresh your SSO session
   ```

2. **Run deployment script**
   ```bash
   cd health-app-deployment
   ./deploy.sh
   ```

3. **Access your app**
   - The CloudFront URL will be displayed after successful deployment
   - App will be available globally via CDN

## Manual Deployment Steps

If you prefer manual deployment:

```bash
# Build React app
cd health-team-project
npm run build

# Deploy CDK stack
cd ../health-app-deployment
npx cdk bootstrap --region ap-southeast-2
npx cdk deploy --region ap-southeast-2
```

## What Gets Deployed
- S3 bucket for static hosting
- CloudFront distribution with HTTPS
- Origin Access Control (OAC) for security
- Automatic cache invalidation on updates

## Cleanup
```bash
cd health-app-deployment
npx cdk destroy
```
