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
    - Project name: *your-project-name*
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
  - Set up the blog mailing list:
    -If you DO NOT want to set up the blog mailing list:
      - Remove 'Subscribe' import statement and the 'Subscribe' component invocation (i.e. <Subscribe />) from the following files:
        - app/page.jsx
        - app/articles/page.jsx
        - app/articles/[slug]/page.jsx
    - If you DO want to set up the blog mailing list:
      - Follow the [How to Set Up the Blog Mailing List](#how-to-setup-blog) instructions below
  - Make sure the site works
    - In the Cloudflare project's dashboard, go to the 'Deployments' tab
    - Select the 'Visit site' link to ensure everything is working as expected



    
## How to Set Up the Blog Mailing List<a name="how-to-setup-blog"></a>
- Login to Cloudflare
- Select 'Workers & Pages' in the left sidebar
  - Select 'Create application'
    - In the 'Workers' tab, select 'Create worker'
      - Name: "subscribe-worker'
      - Click 'Deploy'
    - Click 'Edit code'
      - Delete the existing code
      - Paste in the code from the subscribe-worker.js file (located in the 'Scripts' folder of this repository) 
      - Click 'Deploy'
      - Copy the Cloudflare woker endpoint (e.g. 'subscribe-worker.andrewpaxson.workers.com')
      - Click 'Save and deploy'
    - On the left sidebar, click on "Workers & Pages" and then select "Workers"
      - Find the Worker you deployed (subscribe-worker) and click on it
      - Go to the "Settings" tab and select 'Triggers' from the section's left internal menu
      - Select 'Add route'
        - Route: https://andrewpaxson.com/api/subscribe
        - Zone: *select your website project/application name*
        - Select 'Add route'
- Signup/login to MailChimp
  - Create a campaign: 
    - Go to this [MailChimp URL](https://us22.admin.mailchimp.com/campaigns/#/create-campaign/explore/rss)
      - Campaign Name: Share blog updates
      - Click 'Begin' button
      - RSS feed URL: *enter your website url + /rss.xml - e.g. https://andrewpaxson.com/rss.xml*
      - When should we send?: *enter to your preference*
      - Click Next
      - Select 'Entire audience'
      - Click next
      - Modify preferences to your choosing (e.g. connect to Twitter)
      - Click next
      - Select a template and design your email - example: 
        - Add a 'Code' section to the email and insert the following code:
        - ```
          <h2>*|RSSITEM:TITLE|*</h2>
          <p>*|RSSITEM:CONTENT|*</p>
          <a href="*|RSSITEM:URL|*">Read more</a> <p><small>Published on *|RSSITEM:DATE|*</small></p>
          ```
      - Click next
      - Click 'Start campaign'
  - Find the Mailchimp API key and List ID: 
    - Login to Mailchimp
    - Get the API Key: 
      - Click the profile icon and choose Profile
      - Click the Extras drop-down and then choose API keys
      - In the Your API Keys section, click Create A Key
      - Name the key (e.g. Portfolio Blog Email List)
      - Click Generate Key
      - Copy the key and save it for the next step (you cannot access this key again, so make sure to save it somewhere you can access it for the next step)
    - Get the Audience ID:
      - In the left menu, under the 'Audience' heading, select 'All contacts'
      - Select the module's 'Settings' drop-down and select 'Audience name & defaults'
      - Under the Audience ID, copy the Audience ID value
  - Add the Mailchimp API key and List ID to the Cloudflare Worker's environment variables: 
    - Go to Cloudflare and select 'Workers & Pages' from the left side menu
    - Select the subscribe-worker
    - Go to the 'Settings' tab
    - In the Environment Variables -> Production section, select 'Add variables' or 'Edit variables'
    - Select 'Add variable'
    - Add the Mailchimp API key
      - Variable name: MAILCHIMP_API_KEY
      - Value: *enter variable from previous step*
      - Select Encrypt to protect the value
    -Add the Mailchimp List ID
      - Variable name: MAILCHIMP_AUDIENCE_ID
      - Value: *enter variable from previous step*
      - Select Encrypt to protect the value

