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