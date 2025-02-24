# Frontend Login Selector

This is a root login point that redirects users to either the civilian or defense version of the application.

## Setup

1. Install dependencies:
```bash
yarn
```

2. The `.env` file is configured to use the main domain with subdirectories:
```
VITE_CIVILIAN_URL=https://www.handreceipt.com/civilian
VITE_DEFENSE_URL=https://www.handreceipt.com/defense
```

## Development

To run the development server:
```bash
yarn dev
```

## Building for Production

To create a production build:
```bash
yarn build
```

The build output will be in the `dist` directory.

## AWS S3 Bucket Structure

Your S3 bucket (`www.handreceipt.com`) should be organized as follows:
```
www.handreceipt.com (CloudFront Distribution)
├── / (root - frontend_login project)
│   ├── index.html           # Version selector landing page
│   └── assets/              # Login selector assets
│       ├── index-*.js       # Login selector JavaScript
│       └── index-*.css      # Login selector styles
│   
├── /defense (frontend_defense project)
│   ├── index.html           # Defense app landing page
│   └── assets/              # Defense app assets
│       ├── *.js             # Defense app JavaScript modules
│       └── *.css            # Defense app styles
│
└── /civilian (future project)
    ├── index.html           # Civilian app landing page (not yet deployed)
    └── assets/              # Civilian app assets (not yet deployed)
```

## AWS S3 Setup

1. Configure your S3 bucket (`www.handreceipt.com`):
   - Enable static website hosting if not already enabled
   - Set the root index document to `index.html`
   - Ensure the bucket policy allows public access
   - Set up error document to `index.html` (for SPA routing)

2. Upload the files:
   - Upload the contents of the `dist` directory to the root of the bucket
   - Upload your civilian version to the `/civilian` directory
   - Upload your defense version to the `/defense` directory

3. CloudFront Setup (Recommended):
   - Create a CloudFront distribution pointing to your S3 bucket
   - Enable HTTPS
   - Set up custom domain if needed
   - Configure error pages to redirect to index.html (for SPA routing)

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Create production build
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build locally 

Flow:
1. User visits handreceipt.com
   └── Shows version selector (frontend_login)
       ├── "Defense" button → redirects to handreceipt.com/defense
       └── "Civilian" button → redirects to handreceipt.com/civilian

Local Development Structure:
/Users/brendantoole/projects/
├── frontend_login/          # Version selector project
│   └── dist/               # Built files that go to S3 root
│
├── frontend_defense/        # Defense version project
│   └── dist/               # Built files that go to S3 /defense/
│
└── frontend_civilian/       # Future civilian version project
    └── dist/               # Will go to S3 /civilian/ 

## Deployment Instructions

### Prerequisites
- AWS CLI installed and configured with appropriate permissions
- Access to all project repositories:
  - `frontend_login` (Version selector)
  - `frontend_defense` (Defense version)
  - `frontend_civilian` (Civilian version - future)

### Step 1: Build All Projects

1. Build the login selector (root):
```bash
cd /Users/brendantoole/projects/frontend_login
yarn build
```

2. Build the defense version:
```bash
cd /Users/brendantoole/projects/frontend_defense
yarn build
```

3. Build the civilian version (when available):
```bash
cd /Users/brendantoole/projects/frontend_civilian
yarn build
```

### Step 2: Deploy to AWS S3

#### Deploy Login Selector (Root)
```bash
cd /Users/brendantoole/projects/frontend_login

# Upload index.html with no caching
aws s3 cp dist/index.html s3://www.handreceipt.com/index.html \
  --cache-control "no-cache" \
  --content-type "text/html"

# Upload JavaScript files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "application/javascript" \
  --exclude "*" \
  --include "*.js"

# Upload CSS files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "text/css" \
  --exclude "*" \
  --include "*.css"
```

#### Deploy Defense Version
```bash
cd /Users/brendantoole/projects/frontend_defense

# Upload index.html with no caching
aws s3 cp dist/index.html s3://www.handreceipt.com/defense/index.html \
  --cache-control "no-cache" \
  --content-type "text/html"

# Upload JavaScript files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/defense/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "application/javascript" \
  --exclude "*" \
  --include "*.js"

# Upload CSS files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/defense/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "text/css" \
  --exclude "*" \
  --include "*.css"
```

#### Deploy Civilian Version (Future)
```bash
cd /Users/brendantoole/projects/frontend_civilian

# Upload index.html with no caching
aws s3 cp dist/index.html s3://www.handreceipt.com/civilian/index.html \
  --cache-control "no-cache" \
  --content-type "text/html"

# Upload JavaScript files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/civilian/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "application/javascript" \
  --exclude "*" \
  --include "*.js"

# Upload CSS files with 1-year cache
aws s3 cp dist/assets/ s3://www.handreceipt.com/civilian/assets/ \
  --recursive \
  --cache-control "max-age=31536000" \
  --content-type "text/css" \
  --exclude "*" \
  --include "*.css"
```

### Step 3: Invalidate CloudFront Cache

After deploying any changes, invalidate the CloudFront cache to ensure the latest content is served:

```bash
# Invalidate all paths (when deploying multiple projects)
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/*"

# Or invalidate specific paths (when deploying single project)
aws cloudfront create-invalidation \
  --distribution-id E3T7VX6HV95Q5O \
  --paths "/defense/*"  # for defense version
  # or "/civilian/*"    # for civilian version
  # or "/"             # for login selector
```

### Deployment Best Practices

1. **Order of Deployment**
   - Deploy the version-specific projects first (defense, civilian)
   - Deploy the login selector last
   - This ensures all destinations are available before updating the selector

2. **Testing**
   - After deployment, test each path:
     - `https://www.handreceipt.com` (login selector)
     - `https://www.handreceipt.com/defense`
     - `https://www.handreceipt.com/civilian` (when available)
   - Verify that navigation between versions works correctly
   - Check that assets load without MIME type errors
   - Test on both desktop and mobile browsers

3. **Troubleshooting**
   - If assets fail to load, check MIME types in S3
   - If old content is shown, verify CloudFront invalidation completed
   - If routing issues occur, check CloudFront's error page settings

4. **Monitoring**
   - Watch CloudFront distribution metrics
   - Monitor S3 bucket metrics
   - Check CloudWatch logs for any errors 