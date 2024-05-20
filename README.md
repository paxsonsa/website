# [andrewpaxson.com](https://andrewpaxson.com)

This is the repo for my personal website.

## Stack Notes:

- NextJS Static Build
- TailwindCSS
- React
- Hosted on Cloudflare Pages.

## Development

```bash
# Run the development server
> npm install
> npm run dev

# Build the static site
> npm run build
```


## How to Deploy on Cloudflare
- Login to your GitHub account and fork this repository
- Create a Cloudflare account and login
  - In the Cloudflare dashboard, select 'Workers and Pages' from the left menu
  - Select the tab 'Pages' beside 'Workers'
  - Select 'Connect to Git'
    - Connect your GitHub account
    - Select the newly forked repository
    - Select 'Begin setup' button
  - Set up builds and deployments: 
    - Project name: [your-project-name]
    - Production branch: main
    - Framework preset: Next.js
    - Build command: npm run build
    - Build output directory: out
    - Select the 'Save and Deploy' button
  - Select 'Continue to project' button (after the build/deploy is completed)
  - Optional: Set up a custom domain:
    - Go to the 'Custom domains' tab, and enter a custom domain
      - If using a subdomain -> select 'Begin CNAME setup' button
      - Copy the 'Target'
      - Login to your DNS provider (website host) and find your website's DNS settings
      - Add a CNAME record which points to the Cloudflare target address
      - Select 'Check DNS records"
  - Make sure the site works
    - In the Cloudflare project's dashboard, go to the 'Deployments' tab
    - Select the 'Visit site' link to ensure everything is working as expected


    
## How to Customize the RSS Feed
- Login to Cloudflare
- Select 'Workers & Pages' in the left sidebar
- Select the project application
- Go to the 'Settings' tab
  - Select the 'Environment Variables' tab on the left
  - Under the 'Production' section, select 'add variables' to add a new variable:
    - Variable name: *SITE_URL*
    - Value: *[enter the value of your site URL, e.g., https://www.michellef.dev]*
  -test